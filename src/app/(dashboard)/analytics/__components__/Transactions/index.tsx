"use client";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import LayoutCharts from "@/app/(dashboard)/dashboard/__components__/Charts/layout";
import { API } from "@/app/paths";
import Skeleton from "@/components/Skeleton";
import api from "@/services/api";
import TransactionCard from "./__components__/TransactionCard";
import TransactionModal from "./__components__/TransactionModal";
import type { ITransactions } from "@/app/api/get_transactions/types";

interface IInfiniteListProps {
  fund_alias: string;
  fundValue?: number;
}

export default function Transactions({ fund_alias, fundValue }: IInfiniteListProps) {
  const limit = 5;
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(limit);
  const [idModal, setIdModal] = useState<string>();

  const loadInitialData = () => {
    if (fund_alias) {
      api.client
        .get(API.GET_TRANSACTIONS, {
          params: { limit, offset: 0, fund_alias },
        })
        .then((res) => {
          setTransactions(res.data);
          setHasMore(res.data.length === limit);
        })
        .catch((err) => toast.error(err?.message));
      setOffset(limit);
    }
  };

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fund_alias]);

  const fetchMoreData = () => {
    api.client
      .get(API.GET_TRANSACTIONS, {
        params: { limit, offset, fund_alias },
      })
      .then((res) => {
        setTransactions([...transactions, ...res.data]);
        if (res.data.length > 0) setHasMore(true);
        else setHasMore(false);
      })
      .catch((err) => toast.error(err?.message));
    setOffset((prev) => prev + limit);
  };

  const skeletons = Array.from({ length: 3 }, (_, index) => <Skeleton key={index} height={60} />);

  return (
    <LayoutCharts
      title="Transactions"
      sideControls={
        <CiSquarePlus size="2rem" onClick={() => setIdModal("")} style={{ cursor: "pointer" }} />
      }
    >
      <InfiniteScroll
        dataLength={transactions.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={skeletons}
        height="12rem"
      >
        <TransactionCard onCardClick={setIdModal} transactions={transactions} />
      </InfiniteScroll>

      <TransactionModal
        open={idModal !== undefined}
        transaction={transactions.find((t) => t.id === idModal)}
        onClose={() => setIdModal(undefined)}
        onHandleTransaction={() => loadInitialData()}
        fund_alias={fund_alias}
        fundValue={fundValue}
      />
    </LayoutCharts>
  );
}
