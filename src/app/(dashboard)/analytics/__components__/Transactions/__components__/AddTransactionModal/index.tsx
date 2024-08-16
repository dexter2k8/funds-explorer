import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import SelectDate from "@/components/SelectDate";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import schema from "@/schemas/validateAddTransaction";
import { AxiosError } from "axios";
import type { IModalDefaultProps } from "@/components/Modal/types";
import type { ISelectOptions } from "@/components/Select/types";
import type { IPostTransaction } from "@/app/api/post_transaction/types";
import { currencyMask, currencyToNumber, parseDate } from "@/utils/lib";
import api from "@/services/api";
import { toast } from "react-toastify";

interface IAddTransactionModalProps extends IModalDefaultProps {
  fundList: ISelectOptions[];
  onAddTransaction: () => void;
}

export default function AddTransactionModal({
  fundList,
  open,
  onClose,
  onAddTransaction,
}: IAddTransactionModalProps) {
  const { modal } = styles;
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, reset } = useForm<IPostTransaction>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IPostTransaction> = async (data) => {
    const { price, ...rest } = data;
    const parsedPrice = currencyToNumber(price);
    const parsedData = { ...rest, price: parsedPrice };

    setLoading(true);
    try {
      await api.client.post("/api/post_transaction", parsedData);
      toast.success("Transaction added successfully");
      onAddTransaction();
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
    setValue("bought_at", parseDate(new Date()) as string);
  }, []);

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      title="Add Transaction"
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
        <label htmlFor="bought_at">Bought at</label>
        <SelectDate.Controlled control={control} name="bought_at" id="bought_at" />
        <label htmlFor="quantity">Quantity</label>
        <Input.Controlled
          type="search"
          control={control}
          name="quantity"
          id="quantity"
          mask="0000"
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
