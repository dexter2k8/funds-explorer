import styles from "./styles.module.scss";
import Card from "./components/Card";
import VerticalBars from "./components/Charts/VerticalBars";
import type { IVerticalChartData } from "./components/Charts/VerticalBars/types";
import Donut from "./components/Charts/Donut";

const patrimonyColors = ["#00579A", "#029BE4", "#4FC3F6"];
const profitColors = ["#006400", "#32CD32", "#7CFC00"];

export default function Dashboard() {
  const { dashboard, cards } = styles;
  return (
    <div className={dashboard}>
      <main>
        <section className={cards}>
          <Card label="Patrimony" value={258789} difference="+7%" />
          <Card label="Profit" value={59348} difference="+2.5%" />
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
        <h4>Product</h4>
        <p>
          Choose your produce,for which Build your investment portfolio. Monitor How Your Investment
          are Working
        </p>
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
    name: "BDI",
    value: 163342,
  },
];
