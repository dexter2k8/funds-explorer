import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import api from "@/services/api";
import { toast } from "react-toastify";
import Textarea from "@/components/Textarea";
import schema from "@/schemas/validateUser";
import type { IModalDefaultProps } from "@/components/Modal/types";
import type { ISelectOptions } from "@/components/Select/types";
import type { TAction } from "@/components/TableActions/types";
import type { IUsers } from "@/app/api/get_users/types";

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
  const { modal } = styles;
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, reset } = useForm<IUsers>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IUsers> = async (data) => {
    setLoading(true);
    try {
      action === "add" && (await api.client.post("/api/post_user", data));
      action === "edit" && (await api.client.patch(`/api/patch_user/${userData?.id}`, data));
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
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("admin", userData.admin);
      setValue("avatar", userData.avatar);
    }
  }, [userData]);

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      title={userData ? "Edit Fund" : "Add Fund"}
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
        <Input.Controlled type="password" control={control} name="password" id="password" />

        <label htmlFor="admin">Admin</label>
        <Select.Controlled options={adminList} control={control} name="admin" id="type" />
      </form>
    </Modal>
  );
}
