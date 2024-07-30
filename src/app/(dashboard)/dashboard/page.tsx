"use client";
import styles from "./styles.module.scss";
import Card from "./components/Card";
import VerticalBars from "./components/Charts/VerticalBars";
import Donut from "./components/Charts/Donut";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaHandHoldingDollar } from "react-icons/fa6";
import Transaction from "./components/Transaction";
import type { ITransactionProps } from "./components/Transaction/types";
import { useSWR } from "@/hook/useSWR";
import SegmentedControl from "@/components/SegmentedControl";
import { useState } from "react";
import { endDate, getDate, patrimonyColors, profitColors, segmentedTypes } from "./types";
import { IGetSelfProfits } from "@/app/api/get_self_profits/types";

export default function Dashboard() {
  const { dashboard, cards, segmented } = styles;
  const [range, setRange] = useState(3);
  const [type, setType] = useState(1);

  const { response: profits } = useSWR<IGetSelfProfits[]>("/api/get_self_profits", {
    init_date: getDate(range),
    end_date: endDate,
    type: type === 1 ? "" : segmentedTypes[type - 1].label,
  });

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
            value={258789}
            difference="+7%"
          />
          <Card
            label="Profit"
            icon={
              <FaHandHoldingDollar
                style={{ color: "var(--green)", fontSize: "1.25rem", marginBottom: "0.25rem" }}
              />
            }
            value={59348}
            difference="+2.5%"
          />
        </section>
        <section>
          {/* TODO: implement skeleton to loading and no data instead of ?? [] */}
          <VerticalBars selectedRange={setRange} data={profits ?? []} />
        </section>
        <section className={cards}>
          <Donut title="Patrimony" data={mockDonutData} colors={patrimonyColors} />
          <Donut title="Profits" data={mockDonutData} colors={profitColors} />
        </section>
      </main>

      <aside>
        <div>
          <h3>Last transactions</h3>
          <p>List of the latest 5 company shares traded.</p>
        </div>
        {mockTransactions.map((transaction) => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
      </aside>
    </div>
  );
}

const mockDonutData = [
  {
    name: "Ação",
    value: 185095,
  },
  {
    name: "FII",
    value: 174144,
  },
  {
    name: "BDR",
    value: 163342,
  },
];

const mockTransactions: ITransactionProps[] = [
  {
    id: "1",
    date: "2022-01-01",
    type: "buy",
    alias: "AAPL",
    name: "Apple Inc.",
    quantity: 100,
    price: 100,
  },
  {
    id: "2",
    date: "2022-01-01",
    type: "sell",
    alias: "ACCO",
    name: "Acco Brands Inc.",
    quantity: 10,
    price: 120,
  },
  {
    id: "3",
    date: "2022-01-01",
    type: "buy",
    alias: "HGLG11",
    name: "Banco do Brasil S.A.",
    quantity: 11,
    price: 90,
  },
  {
    id: "4",
    date: "2022-01-01",
    type: "sell",
    alias: "CSCO",
    name: "Cisco Systems Inc.",
    quantity: 15,
    price: 50,
  },
  {
    id: "5",
    date: "2022-01-01",
    type: "buy",
    alias: "GOOG",
    name: "Google Inc.",
    quantity: 20,
    price: 80,
  },
];
