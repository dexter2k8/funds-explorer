"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { CiSquarePlus } from "react-icons/ci";
import { columns } from "./columns";
import Table from "@/components/Table";
import { IGetIncomesFundResponse } from "@/app/api/get_incomes_fund/[fund]/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@/schemas/validateAddIncome";
import Modal from "@/components/Modal";
import { currencyMask, currencyToNumber, parseDate } from "@/utils/lib";
import { AxiosError } from "axios";
import api from "@/services/api";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import SelectDate from "@/components/SelectDate";
import Select from "@/components/Select";
import type { IPostIncome } from "@/app/api/post_income/types";
import type { ISelectOptions } from "@/components/Select/types";

interface IIncomesTableProps {
  fundList: ISelectOptions[];
  isLoadingProfits: boolean;
  profits: IGetIncomesFundResponse[];
}

export default function IncomesTable({ fundList, profits, isLoadingProfits }: IIncomesTableProps) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { table_content, head, modal } = styles;
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
      await api.client.post("/api/post_income", parsedData);
      toast.success("Income added successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      }
    }
    setLoading(false);
    setOpenModal(false);
  };

  useEffect(() => {
    setValue("updated_at", parseDate(new Date()) as string);
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };

  return (
    <div className={table_content}>
      <div style={{ minWidth: "600px" }}>
        <div className={head}>
          <h4>Incomes Table</h4>
          <CiSquarePlus
            size="2rem"
            onClick={() => setOpenModal(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <Table isLoading={isLoadingProfits} columns={columns} rows={profits || []} pageSize={5} />
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        title="Add Income"
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
    </div>
  );
}
