"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import PatrimonialEvolution from "./__components__/PatrimonialEvolution";
import Transactions from "./__components__/Transactions";
import IncomesTable from "./__components__/IncomesTable";
import { useSWR } from "@/hook/useSWR";
import { IGetIncomesFundResponse } from "@/app/api/get_incomes_fund/[fund]/types";
import { API } from "@/app/paths";
import type { ISelectOptions } from "@/components/Select/types";
import type { IFunds } from "@/app/api/get_funds/types";

export default function Analytics() {
  const { analytics, charts, table } = styles;
  const [fund, setFund] = useState("");

  const { response: fundList } = useSWR<IFunds[]>(API.GET_SELF_FUNDS);

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
    <div className={analytics}>
      <main>
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
  );
}
