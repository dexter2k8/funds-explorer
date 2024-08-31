"use client";
import { Suspense, useState } from "react";
import styles from "./styles.module.scss";
import PatrimonialEvolution from "./__components__/PatrimonialEvolution";
import Transactions from "./__components__/Transactions";
import IncomesTable from "./__components__/IncomesTable";
import { useSWR } from "@/hook/useSWR";
import { IGetIncomesFundResponse } from "@/app/api/get_incomes_fund/[fund]/types";
import { API } from "@/app/paths";
import type { ISelectOptions } from "@/components/Select/types";
import type { IFunds } from "@/app/api/get_funds/types";
import Skeleton from "@/components/Skeleton";
import Card from "../dashboard/__components__/Card";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaArrowTrendUp, FaArrowUpRightDots } from "react-icons/fa6";
import { RiExchangeFundsFill } from "react-icons/ri";

export default function Analytics() {
  const { analytics, charts, table, cards } = styles;
  const [fund, setFund] = useState("");

  const { response: fundList } = useSWR<IFunds[]>(
    API.GET_SELF_FUNDS,
    {},
    { revalidateOnFocus: false }
  );

  const funds: ISelectOptions[] = fundList?.map((fund) => ({
    value: fund.alias,
    label: fund.alias,
  }));

  const {
    response: profits,
    isLoading: isLoadingProfits,
    mutate,
  } = useSWR<IGetIncomesFundResponse[]>(
    fund && API.GET_INCOMES_FUND + fund,
    {},
    { revalidateOnFocus: false }
  );

  const reverseProfits = profits?.slice().reverse();

  return (
    <Suspense fallback={<Skeleton />}>
      <div className={analytics}>
        <main>
          <section className={cards}>
            <Card
              label="Value"
              icon={<AiFillDollarCircle style={{ color: "var(--blue)", fontSize: "1.5rem" }} />}
              value={0}
              difference={0}
              isLoading={false}
            />
            <Card
              label="P/VP"
              icon={<RiExchangeFundsFill style={{ color: "var(--blue)", fontSize: "1.5rem" }} />}
              value={0}
              difference={0}
              isLoading={false}
            />
            <Card
              label="DY"
              icon={<FaArrowUpRightDots style={{ color: "var(--blue)", fontSize: "1.25rem" }} />}
              value={0}
              difference={0}
              isLoading={false}
            />
            <Card
              label="Valuing (12M)"
              icon={<FaArrowTrendUp style={{ color: "var(--blue)", fontSize: "1.25rem" }} />}
              value={0}
              difference={0}
              isLoading={false}
            />
          </section>

          <section className={charts}>
            <PatrimonialEvolution
              fundList={funds || []}
              onChangeFund={setFund}
              profits={reverseProfits}
              isLoading={isLoadingProfits}
            />
            <Transactions fundList={funds || []} fund_alias={fund} />
          </section>

          <section className={table}>
            <IncomesTable
              fundList={funds || []}
              profits={profits}
              isLoadingProfits={isLoadingProfits}
              onMutate={mutate}
            />
          </section>
        </main>
      </div>
    </Suspense>
  );
}
