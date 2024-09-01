import { MouseEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import SelectDate from "@/components/SelectDate";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import schema from "@/schemas/validateAddTransaction";
import { AxiosError } from "axios";
import { currencyToNumber, formatBRL, parseDate } from "@/utils/lib";
import api from "@/services/api";
import { toast } from "react-toastify";
import type { IModalDefaultProps } from "@/components/Modal/types";
import type { ISelectOptions } from "@/components/Select/types";
import type { IPostTransaction } from "@/app/api/post_transaction/types";
import type { ITransactions } from "@/app/api/get_transactions/types";
import type { IFunds } from "@/app/api/get_funds/types";
import { useSWR } from "@/hook/useSWR";
import { API } from "@/app/paths";

interface IAddTransactionModalProps extends IModalDefaultProps {
  onHandleTransaction: () => void;
  transaction?: ITransactions;
  fund_alias?: string;
  fundValue?: number;
}

export default function TransactionModal({
  open,
  transaction,
  onClose,
  onHandleTransaction,
  fund_alias,
  fundValue,
}: IAddTransactionModalProps) {
  const { modal, action } = styles;
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, reset } = useForm<IPostTransaction>({
    resolver: yupResolver(schema),
  });

  const { response } = useSWR<IFunds[]>(API.GET_FUNDS, {}, { revalidateOnFocus: false });

  const fundList: ISelectOptions[] = response?.map((fund) => ({
    value: fund.alias,
    label: fund.alias,
  }));

  const onSubmit: SubmitHandler<IPostTransaction> = async (data) => {
    const { price, ...rest } = data;
    const parsedPrice = currencyToNumber(price);
    const parsedData = { ...rest, price: parsedPrice };

    setLoading(true);
    try {
      transaction
        ? await api.client.patch(`/api/patch_transaction/${transaction?.id}`, parsedData)
        : await api.client.post("/api/post_transaction", parsedData);
      toast.success(`Transaction ${transaction ? "updated" : "added"} successfully`);
      onHandleTransaction();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      }
    }
    setLoading(false);
    reset({
      fund_alias: fund_alias || "",
      price: "R$ " + String(fundValue).replace(".", ",") || "",
    });
    onClose();
  };

  useEffect(() => {
    setValue("bought_at", parseDate(new Date()) as string);
    setValue("fund_alias", fund_alias || "");
    setValue("price", "R$ " + String(fundValue).replace(".", ","));

    if (transaction) {
      const price = String(transaction.price).replace(".", ",");
      setValue("bought_at", parseDate(transaction.bought_at) as string);
      setValue("fund_alias", transaction.fund_alias);
      setValue("price", "R$ " + formatBRL(price).value);
      setValue("quantity", transaction.quantity);
    }
  }, [transaction, fund_alias, fundValue]);

  const handleCloseModal = () => {
    onClose();
    reset({
      fund_alias: fund_alias || "",
      price: "R$ " + String(fundValue).replace(".", ",") || "",
    });
  };

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      await api.client.delete(`/api/delete_transaction/${transaction?.id}`);
      toast.success("Transaction deleted successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      }
    }
    onHandleTransaction();
    handleCloseModal();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      title={transaction ? "Edit Transaction" : "Add Transaction"}
      onOk={handleSubmit(onSubmit)}
      okLoading={loading}
      hideCross
      width="17rem"
    >
      <form className={modal}>
        {transaction && (
          <div className={action}>
            <button onClick={handleDelete}>DELETE</button>
          </div>
        )}
        <label htmlFor="price">Price</label>
        <Input.Currency name="price" control={control} />

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
