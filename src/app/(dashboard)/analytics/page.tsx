"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import LineChart from "./__components__/Charts/LineChart";
import InfiniteList from "./__components__/InfiniteList";
import { useSWR } from "@/hook/useSWR";
import { IGetIncomesFundResponse } from "@/app/api/get_incomes_fund/[fund]/types";
import { API } from "@/app/paths";
import type { ISelectOptions } from "@/components/Select/types";
import type { IGetFunds } from "@/app/api/get_funds/types";
import IncomesTable from "./__components__/IncomesTable";

export default function Analytics() {
  const { analytics, charts, table, head, table_content } = styles;
  const [fund, setFund] = useState("");

  const { response: fundList, isLoading: isLoadingFunds } = useSWR<IGetFunds[]>(API.GET_SELF_FUNDS);

  const funds: ISelectOptions[] = fundList?.map((fund) => ({
    value: fund.alias,
    label: fund.alias,
  }));

  const { response: profits, isLoading: isLoadingProfits } = useSWR<IGetIncomesFundResponse[]>(
    fund && API.GET_INCOMES_FUND + fund
  );

  const reverseProfits = profits?.slice().reverse();

  return (
    <div className={analytics}>
      <main>
        <section className={charts}>
          <LineChart
            loadingFunds={isLoadingFunds}
            fundList={funds || []}
            onChangeFund={setFund}
            profits={reverseProfits}
            isLoading={isLoadingProfits}
          />
          <InfiniteList fundList={funds || []} fund_alias={fund} />
        </section>

        <section className={table}>
          <IncomesTable
            fundList={funds || []}
            profits={reverseProfits}
            isLoadingProfits={isLoadingProfits}
          />
        </section>
      </main>
    </div>
  );
}
