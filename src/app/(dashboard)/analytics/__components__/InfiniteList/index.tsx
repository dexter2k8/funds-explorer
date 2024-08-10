import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { API } from "@/app/paths";
import api from "@/services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import type { ITransactions } from "@/app/api/get_transactions/types";
import { IResponse } from "@/app/api/types";
import LayoutCharts from "@/app/(dashboard)/dashboard/__components__/Charts/layout";
import { formatCurrency, formatDate } from "@/utils/lib";

interface IInfiniteListProps {
  fund_alias: string;
}

export default function InfiniteList({ fund_alias }: IInfiniteListProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { content, left, right, tag } = styles;

  const limit = 5;

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);

      try {
        const response: IResponse<ITransactions[]> = await api.client.get(API.GET_TRANSACTIONS, {
          params: { limit, offset, fund_alias },
        });

        const newItems = response.data;

        if (newItems.length < limit) {
          setHasMore(false);
        }

        setTransactions((prev) => [...prev, ...newItems]);
        setOffset((prev) => prev + limit);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error?.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (hasMore) {
      loadItems();
    }
  }, [offset]);

  useEffect(() => {
    const handleScroll = () => {
      if (!window && !document.documentElement) return;
      const { innerHeight } = window;
      const { scrollTop, offsetHeight } = document.documentElement;

      if (innerHeight + scrollTop >= offsetHeight - 50 && !isLoading) {
        setOffset((prev) => prev + limit);
      }

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    setTransactions([]);
  }, [fund_alias]);

  return (
    <ul>
      <LayoutCharts title="Transactions" height="17rem" overflow="auto">
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
      </LayoutCharts>
    </ul>
  );
}
