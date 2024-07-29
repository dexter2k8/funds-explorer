import styles from "./styles.module.scss";
import Card from "./components/Card";
import VerticalBars from "./components/Charts/VerticalBars";
import Donut from "./components/Charts/Donut";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaHandHoldingDollar } from "react-icons/fa6";
import Transaction from "./components/Transaction";
import type { IVerticalChartData } from "./components/Charts/VerticalBars/types";
import type { ITransactionProps } from "./components/Transaction/types";

const patrimonyColors = ["#00579A", "#029BE4", "#4FC3F6"];
const profitColors = ["#006400", "#32CD32", "#7CFC00"];

export default function Dashboard() {
  const { dashboard, cards } = styles;
  return (
    <div className={dashboard}>
      <main>
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
          <VerticalBars data={mockVerticalBarsData} />
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

const mockVerticalBarsData: IVerticalChartData[] = [
  {
    year_month: "2022-01",
    total_patrimony: 300,
    total_income: 100,
  },
  {
    year_month: "2022-02",
    total_patrimony: 310,
    total_income: 170,
  },
  {
    year_month: "2022-03",
    total_patrimony: 330,
    total_income: 110,
  },
  {
    year_month: "2022-04",
    total_patrimony: 340,
    total_income: 120,
  },
  {
    year_month: "2022-05",
    total_patrimony: 350,
    total_income: 130,
  },
  {
    year_month: "2022-06",
    total_patrimony: 360,
    total_income: 140,
  },
  {
    year_month: "2022-07",
    total_patrimony: 370,
    total_income: 150,
  },
  {
    year_month: "2022-08",
    total_patrimony: 380,
    total_income: 160,
  },
  {
    year_month: "2022-09",
    total_patrimony: 390,
    total_income: 170,
  },
  {
    year_month: "2022-10",
    total_patrimony: 400,
    total_income: 180,
  },
  {
    year_month: "2022-11",
    total_patrimony: 410,
    total_income: 190,
  },
  {
    year_month: "2022-12",
    total_patrimony: 420,
    total_income: 200,
  },
];

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
