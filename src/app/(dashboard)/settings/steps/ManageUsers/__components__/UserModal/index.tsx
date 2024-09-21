import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import { schemaEdit, schemaPost } from "@/schemas/validateUser";
import api from "@/services/api";
import styles from "./styles.module.scss";
import type { SubmitHandler } from "react-hook-form";
import type { IUsers } from "@/app/api/get_users/types";
import type { IModalDefaultProps } from "@/components/Modal/types";
import type { ISelectOptions } from "@/components/Select/types";
import type { TAction } from "@/components/TableActions/types";

const adminList: ISelectOptions[] = [
  { value: "false", label: "False" },
  { value: "true", label: "True" },
];

interface IUserModalProps extends IModalDefaultProps {
  onMutate: () => void;
  userData?: IUsers;
  action?: TAction;
}

export default function UserModal({ open, userData, onClose, action, onMutate }: IUserModalProps) {
  const { modal, check } = styles;
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, reset } = useForm<IUsers>({
    resolver: yupResolver(action === "add" ? schemaPost : schemaEdit),
  });

  const onSubmit: SubmitHandler<IUsers> = async (data) => {
    setLoading(true);
    try {
      if (action === "add") await api.client.post("/api/post_user", data);
      if (action === "edit") await api.client.patch(`/api/patch_user/${userData?.id}`, data);
      onMutate();
      toast.success(`User ${action === "add" ? "added" : "updated"} successfully`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      }
    }
    setLoading(false);
    reset();
    onClose();
  };

  useEffect(() => {
    setValue("admin", "false");
    setChecked(false);
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("admin", userData.admin ? "true" : "false");
      if (userData.avatar) setValue("avatar", userData.avatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      title={userData ? "Edit User" : "Add User"}
      onOk={handleSubmit(onSubmit)}
      okLoading={loading}
      hideCross
      width="17rem"
    >
      <form className={modal}>
        <label htmlFor="name">Name</label>
        <Input.Controlled type="search" control={control} name="name" id="name" />

        <label htmlFor="email">Email</label>
        <Input.Controlled type="search" control={control} name="email" id="email" />

        <label htmlFor="password">Password</label>
        <div className={check}>
          {action === "edit" && (
            <Checkbox
              data-tooltip-id="checkbox-password"
              data-tooltip-content="Check this if you want to set a new password"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          )}
          <Input.Controlled
            disabled={action === "edit" && !checked}
            type="password"
            control={control}
            name="password"
            id="password"
            autoComplete="new-password"
          />
          <Tooltip id="checkbox-password" style={{ maxWidth: "12rem" }} />
        </div>

        <label htmlFor="admin">Admin</label>
        <Select.Controlled options={adminList} control={control} name="admin" id="type" />

        <label htmlFor="avatar">Avatar URL</label>
        <Input.Controlled type="search" control={control} name="avatar" id="avatar" />
      </form>
    </Modal>
  );
}
