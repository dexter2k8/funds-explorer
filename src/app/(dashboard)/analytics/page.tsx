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
import { IScrapeResponse } from "@/app/api/get_scrape/types";
import { useQueryState } from "nuqs";

export default function Analytics() {
  const { analytics, charts, table, cards } = styles;
  const { response: fundList } = useSWR<IFunds[]>(API.GET_SELF_FUNDS, {});
  const [fund] = useQueryState("fund", { defaultValue: fundList?.[0]?.alias });

  const fundType = fundList?.find((f) => f.alias === fund)?.type;

  const { response: indicators, isLoading: isLoadingIndicators } = useSWR<IScrapeResponse>(
    fundType && API.GET_SCRAPE,
    { fund_alias: fund, type: fundType }
  );

  const funds: ISelectOptions[] = fundList?.map((fund) => ({
    value: fund.alias,
    label: fund.alias,
  }));

  const {
    response: profits,
    isLoading: isLoadingProfits,
    mutate,
  } = useSWR<IGetIncomesFundResponse[]>(fund && API.GET_INCOMES_FUND + fund);

  const reverseProfits = profits?.slice().reverse();

  return (
    <Suspense fallback={<Skeleton />}>
      <div className={analytics}>
        <main>
          <section className={cards}>
            <Card
              label="Value"
              icon={<AiFillDollarCircle style={{ color: "var(--blue)", fontSize: "1.5rem" }} />}
              value={indicators?.value}
              currency
              difference={indicators?.valueGrowth}
              isLoading={isLoadingIndicators}
            />
            {indicators?.pvp && (
              <Card
                label="P/VP"
                icon={<RiExchangeFundsFill style={{ color: "var(--blue)", fontSize: "1.5rem" }} />}
                value={indicators?.pvp}
                isLoading={isLoadingIndicators}
              />
            )}
            <Card
              label="DY"
              icon={<FaArrowUpRightDots style={{ color: "var(--blue)", fontSize: "1.25rem" }} />}
              value={indicators?.dy}
              suffix="%"
              isLoading={isLoadingIndicators}
            />
            <Card
              label="Valuing (12M)"
              icon={<FaArrowTrendUp style={{ color: "var(--blue)", fontSize: "1.25rem" }} />}
              value={indicators?.growth}
              suffix="%"
              isLoading={isLoadingIndicators}
            />
          </section>

          <section className={charts}>
            <PatrimonialEvolution
              fundList={funds || []}
              profits={reverseProfits}
              isLoading={isLoadingProfits}
            />
            <Transactions fund_alias={fund} fundValue={indicators?.value} />
          </section>

          <section className={table}>
            <IncomesTable
              fundList={funds || []}
              profits={profits}
              isLoadingProfits={isLoadingProfits}
              onMutate={mutate}
              fund_alias={fund}
              fundValue={indicators?.value}
            />
          </section>
        </main>
      </div>
    </Suspense>
  );
}
