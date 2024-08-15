"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { API } from "@/app/paths";
import api from "@/services/api";
import { toast } from "react-toastify";
import LayoutCharts from "@/app/(dashboard)/dashboard/__components__/Charts/layout";
import { currencyToNumber, formatCurrency, formatDate, parseDate } from "@/utils/lib";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@/components/Skeleton";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@/schemas/validateAddTransaction";
import { AxiosError } from "axios";
import SelectDate from "@/components/SelectDate";
import { FactoryArg } from "imask";
import Select from "@/components/Select";
import type { SubmitHandler } from "react-hook-form";
import type { ITransactions } from "@/app/api/get_transactions/types";
import type { IPostTransaction } from "@/app/api/post_transaction/types";
import type { ISelectOptions } from "@/components/Select/types";

interface IInfiniteListProps {
  fundList: ISelectOptions[];
  fund_alias: string;
}

export default function InfiniteList({ fundList, fund_alias }: IInfiniteListProps) {
  const limit = 5;
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(limit);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { content, left, right, tag, modal } = styles;

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
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      }
    }
    setLoading(false);
    setOpenModal(false);
  };

  useEffect(() => {
    setValue("bought_at", parseDate(new Date()) as string);
  }, []);

  useEffect(() => {
    fund_alias &&
      api.client
        .get(API.GET_TRANSACTIONS, {
          params: { limit, offset: 0, fund_alias },
        })
        .then((res) => setTransactions(res.data))
        .catch((err) => toast.error(err?.message));
    setOffset(limit);
    setHasMore(true);
  }, [fund_alias]);

  const fetchMoreData = () => {
    api.client
      .get(API.GET_TRANSACTIONS, {
        params: { limit, offset, fund_alias },
      })
      .then((res) => {
        setTransactions([...transactions, ...res.data]);
        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => toast.error(err?.message));
    setOffset((prev) => prev + limit);
  };

  const skeletons = Array.from({ length: 3 }, (_, index) => <Skeleton key={index} height={60} />);

  const currencyMask: FactoryArg = {
    mask: "R$num.00",
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: " ",
      },
    },
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };

  return (
    <LayoutCharts
      title="Transactions"
      sideControls={
        <CiSquarePlus
          size="2rem"
          onClick={() => setOpenModal(true)}
          style={{ cursor: "pointer" }}
        />
      }
    >
      <InfiniteScroll
        dataLength={transactions.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={skeletons}
        height="12rem"
      >
        {transactions.map((transaction, i) => {
          const type = transaction.quantity < 0 ? "sell" : "buy";
          const total = formatCurrency(Math.abs(transaction.quantity) * transaction.price);
          return (
            <li key={i} className={content}>
              <div className={left}>
                <p>
                  {Math.abs(transaction.quantity)} x {formatCurrency(transaction.price)}
                </p>
                <small
                  className={tag}
                  style={{ backgroundColor: type === "buy" ? "var(--green)" : "var(--red)" }}
                >
                  {type}
                </small>
              </div>
              <div className={right}>
                <b>{total}</b>
                <small>{formatDate(transaction.bought_at)}</small>
              </div>
            </li>
          );
        })}
      </InfiniteScroll>

      <Modal
        open={openModal}
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
    </LayoutCharts>
  );
}
