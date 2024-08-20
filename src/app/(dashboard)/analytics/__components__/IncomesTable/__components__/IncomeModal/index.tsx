"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import SelectDate from "@/components/SelectDate";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import schema from "@/schemas/validateAddIncome";
import { currencyMask, currencyToNumber, parseDate } from "@/utils/lib";
import { AxiosError } from "axios";
import api from "@/services/api";
import { toast } from "react-toastify";
import type { IModalDefaultProps } from "@/components/Modal/types";
import type { IPostIncome } from "@/app/api/post_income/types";
import type { ISelectOptions } from "@/components/Select/types";
import type { IGetIncomesFundResponse } from "@/app/api/get_incomes_fund/[fund]/types";
import type { TAction } from "../../types";

interface IIncomeModalProps extends IModalDefaultProps {
  fundList: ISelectOptions[];
  incomeData?: IGetIncomesFundResponse;
  action?: TAction;
  onMutate: () => void;
}

export default function IncomeModal({
  open,
  onClose,
  fundList,
  incomeData,
  action,
  onMutate,
}: IIncomeModalProps) {
  const { modal } = styles;
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, reset } = useForm<IPostIncome>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IPostIncome> = async (data) => {
    const { price, income, ...rest } = data;
    const parsedPrice = currencyToNumber(price);
    const parsedIncome = currencyToNumber(income);
    const parsedData = { ...rest, price: parsedPrice, income: parsedIncome };

    setLoading(true);
    try {
      action === "add" && (await api.client.post("/api/post_income", parsedData));
      action === "edit" &&
        (await api.client.patch(`/api/patch_income/${incomeData?.id}`, parsedData));
      onMutate();
      toast.success(`Income ${action === "add" ? "added" : "updated"} successfully`);
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
    setValue("updated_at", parseDate(new Date()) as string);
    if (incomeData) {
      setValue("updated_at", parseDate(incomeData.updated_at) as string);
      setValue("price", "R$" + incomeData.price);
      setValue("income", "R$" + incomeData.income.toString());
      setValue("fund_alias", incomeData.fund_alias);
    }
  }, [incomeData]);
  const handleCloseModal = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      title={`${action === "add" ? "Add" : "Edit"} Income`}
      onOk={handleSubmit(onSubmit)}
      okLoading={loading}
      hideCross
      width="17rem"
    >
      <form className={modal}>
        <label htmlFor="price">Price</label>
        <Input.Controlled
          type="search"
          control={control}
          name="price"
          id="price"
          mask={currencyMask}
        />
        <label htmlFor="updated_at">Updated at</label>
        <SelectDate.Controlled control={control} name="updated_at" id="updated_at" />
        <label htmlFor="income">Income</label>
        <Input.Controlled
          type="search"
          control={control}
          name="income"
          id="income"
          mask={currencyMask}
        />
        <label htmlFor="fund_alias">Fund</label>
        <Select.Controlled
          type="search"
          options={fundList || []}
          control={control}
          name="fund_alias"
          id="fund_alias"
        />
      </form>
    </Modal>
  );
}
