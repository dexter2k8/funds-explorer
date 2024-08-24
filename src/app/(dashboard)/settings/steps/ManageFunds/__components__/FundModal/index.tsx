import { MouseEvent, useEffect, useState } from "react";
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
  mutateFund: () => void;
  fundData?: IFunds;
  action?: TAction;
}

export default function FundModal({ open, fundData, onClose, mutateFund }: IFundModalProps) {
  const { modal, action } = styles;
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, reset } = useForm<IFunds>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFunds> = async (data) => {
    setLoading(true);
    try {
      fundData
        ? await api.client.patch(`/api/patch_fund/${fundData?.alias}`, data)
        : await api.client.post("/api/post_fund", data);
      toast.success(`Fund ${fundData ? "updated" : "added"} successfully`);
      mutateFund();
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
    if (fundData) {
      setValue("alias", fundData.alias);
      setValue("name", fundData.name);
      setValue("description", fundData.description);
      setValue("type", fundData.type);
      setValue("sector", fundData.sector);
    }
  }, [fundData]);

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      await api.client.delete(`/api/delete_fund/${fundData?.alias}`);
      toast.success("Fund deleted successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      }
    }
    mutateFund();
    handleCloseModal();
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
        {fundData && (
          <div className={action}>
            <button onClick={handleDelete}>DELETE</button>
          </div>
        )}
        <label htmlFor="alias">Alias</label>
        <Input.Controlled type="search" control={control} name="alias" id="alias" />

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
