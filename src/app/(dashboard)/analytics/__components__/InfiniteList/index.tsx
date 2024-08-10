import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { API } from "@/app/paths";
import api from "@/services/api";
import { toast } from "react-toastify";
import LayoutCharts from "@/app/(dashboard)/dashboard/__components__/Charts/layout";
import { formatCurrency, formatDate } from "@/utils/lib";
import type { ITransactions } from "@/app/api/get_transactions/types";
import InfiniteScroll from "react-infinite-scroll-component";

interface IInfiniteListProps {
  fund_alias: string;
}

export default function InfiniteList({ fund_alias }: IInfiniteListProps) {
  const limit = 5;
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(limit);
  const { content, left, right, tag } = styles;

  useEffect(() => {
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

  return (
    <LayoutCharts title="Transactions">
      <InfiniteScroll
        dataLength={transactions.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height="12.375rem"
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
    </LayoutCharts>
  );
}
