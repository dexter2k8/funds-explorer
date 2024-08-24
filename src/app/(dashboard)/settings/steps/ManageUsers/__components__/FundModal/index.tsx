import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import schema from "@/schemas/validateFund";
import { AxiosError } from "axios";
import api from "@/services/api";
import { toast } from "react-toastify";
import Textarea from "@/components/Textarea";
import type { IModalDefaultProps } from "@/components/Modal/types";
import type { ISelectOptions } from "@/components/Select/types";
import type { IFunds } from "@/app/api/get_funds/types";
import type { TAction } from "@/components/TableActions/types";

const typeList: ISelectOptions[] = [
  { value: "Ação", label: "Ação" },
  { value: "FII", label: "FII" },
  { value: "BDR", label: "BDR" },
];

interface IFundModalProps extends IModalDefaultProps {
  onMutate: () => void;
  fundData?: IFunds;
  action?: TAction;
}

export default function FundModal({ open, fundData, onClose, action, onMutate }: IFundModalProps) {
  const { modal } = styles;
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, reset } = useForm<IFunds>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFunds> = async (data) => {
    setLoading(true);
    try {
      action === "add" && (await api.client.post("/api/post_fund", data));
      action === "edit" && (await api.client.patch(`/api/patch_fund/${fundData?.alias}`, data));
      onMutate();
      toast.success(`Fund ${action === "add" ? "added" : "updated"} successfully`);
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
    setValue("description", "");
    setValue("type", "Ação");
    if (fundData) {
      setValue("alias", fundData.alias);
      setValue("name", fundData.name);
      setValue("description", fundData.description);
      setValue("type", fundData.type);
      setValue("sector", fundData.sector);
    }
  }, [fundData]);

  const handleCloseModal = () => {
    setValue("description", "");
    onClose();
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      title={fundData ? "Edit Fund" : "Add Fund"}
      onOk={handleSubmit(onSubmit)}
      okLoading={loading}
      hideCross
      width="17rem"
    >
      <form className={modal}>
        <label htmlFor="alias">Alias</label>
        <Input.Controlled type="search" control={control} name="alias" id="alias" />

        <label htmlFor="name">Name</label>
        <Input.Controlled type="search" control={control} name="name" id="name" />

        <label htmlFor="description">Description (optional)</label>
        <Textarea.Controlled
          control={control}
          name="description"
          id="description"
          resize="none"
          rows={3}
        />

        <label htmlFor="sector">Sector (optional)</label>
        <Input.Controlled type="search" control={control} name="sector" id="sector" />

        <label htmlFor="type">Type</label>
        <Select.Controlled options={typeList} control={control} name="type" id="type" />
      </form>
    </Modal>
  );
}
