"use client";
import styles from "./styles.module.scss";
import Card from "./components/Card";
import VerticalBars from "./components/Charts/VerticalBars";
import Donut from "./components/Charts/Donut";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaHandHoldingDollar } from "react-icons/fa6";
import Transaction from "./components/Transaction";
import { useSWR } from "@/hook/useSWR";
import SegmentedControl from "@/components/SegmentedControl";
import { useState } from "react";
import { endDate, getDate, getGain, patrimonyColors, profitColors, segmentedTypes } from "./types";
import Skeleton from "@/components/Skeleton";
import type { IGetSelfProfits } from "@/app/api/get_self_profits/types";
import type { IGetTransactions } from "@/app/api/get_transactions/types";
import { IGetIncomesPatrimony } from "@/app/api/get_incomes_patrimony/types";

export default function Dashboard() {
  const { dashboard, cards, segmented } = styles;
  const [range, setRange] = useState(3);
  const [type, setType] = useState(1);

  const { response: profits, isLoading: isLoadingProfits } = useSWR<IGetSelfProfits[]>(
    "/api/get_self_profits",
    {
      init_date: getDate(range),
      end_date: endDate,
      type: type === 1 ? "" : segmentedTypes[type - 1].label,
    }
  );

  const { response: latest, isLoading: isLoadingLatest } = useSWR<IGetTransactions[]>(
    "/api/get_transactions",
    {
      limit: 5,
      offset: 0,
    }
  );

  const { response: incomes, isLoading: isLoadingIncomes } = useSWR<IGetIncomesPatrimony[]>(
    "/api/get_incomes_patrimony"
  );

  const donutPatrimony = incomes?.map((income) => {
    return {
      name: income.type,
      value: income.total_patrimony,
    };
  });

  const donutProfit = incomes?.map((income) => {
    return {
      name: income.type,
      value: income.total_income,
    };
  });

  const patrimony = profits ? profits[profits.length - 1]?.total_patrimony : 0;
  const percentPatrimony = profits
    ? getGain(
        profits[profits.length - 1]?.total_patrimony,
        profits[profits.length - 2]?.total_patrimony
      )
    : 0;

  const profit = profits ? profits[profits.length - 1]?.total_income : 0;
  const percentProfit = profits
    ? getGain(profits[profits.length - 1]?.total_income, profits[profits.length - 2]?.total_income)
    : 0;

  const skeletons = Array.from({ length: 5 }, (_, index) => <Skeleton key={index} height={90} />);

  return (
    <div className={dashboard}>
      <main>
        <div className={segmented}>
          <SegmentedControl
            defaultSelected={1}
            onSelect={setType}
            variant="secondary"
            items={segmentedTypes}
          />
        </div>
        <section className={cards}>
          <Card
            label="Patrimony"
            icon={<AiFillDollarCircle style={{ color: "var(--blue)", fontSize: "1.5rem" }} />}
            value={patrimony}
            difference={percentPatrimony}
            isLoading={isLoadingProfits}
          />
          <Card
            label="Profit"
            icon={
              <FaHandHoldingDollar
                style={{ color: "var(--green)", fontSize: "1.25rem", marginBottom: "0.25rem" }}
              />
            }
            value={profit}
            difference={percentProfit}
            isLoading={isLoadingProfits}
          />
        </section>
        <section>
          <VerticalBars selectedRange={setRange} data={profits} isLoading={isLoadingProfits} />
        </section>
        <section className={cards}>
          <Donut
            title="Patrimony"
            data={donutPatrimony}
            isLoading={isLoadingIncomes}
            colors={patrimonyColors}
          />
          <Donut
            title="Profits"
            data={donutProfit}
            isLoading={isLoadingIncomes}
            colors={profitColors}
          />
        </section>
      </main>

      <aside>
        <div>
          <h3>Last transactions</h3>
          <p>List of the latest 5 company shares traded.</p>
        </div>
        {isLoadingLatest
          ? skeletons
          : latest.map((transaction) => <Transaction key={transaction.id} {...transaction} />)}
      </aside>
    </div>
  );
}
