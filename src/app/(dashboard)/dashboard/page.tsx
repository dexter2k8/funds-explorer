import styles from "./styles.module.scss";
import Card from "./components/Card";
import VerticalBars from "./components/Charts/VerticalBars";
import type { IVerticalChartData } from "./components/Charts/VerticalBars/types";

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
    transaction_date: "2022-01-01",
    total_accepted: 100,
    total_rejected: 200,
    total_pending: 300,
  },
  {
    transaction_date: "2022-02-01",
    total_accepted: 170,
    total_rejected: 190,
    total_pending: 310,
  },
  {
    transaction_date: "2022-03-01",
    total_accepted: 110,
    total_rejected: 220,
    total_pending: 330,
  },
  {
    transaction_date: "2022-04-01",
    total_accepted: 120,
    total_rejected: 230,
    total_pending: 340,
  },
  {
    transaction_date: "2022-05-01",
    total_accepted: 130,
    total_rejected: 240,
    total_pending: 350,
  },
  {
    transaction_date: "2022-06-01",
    total_accepted: 140,
    total_rejected: 250,
    total_pending: 360,
  },
  {
    transaction_date: "2022-07-01",
    total_accepted: 150,
    total_rejected: 260,
    total_pending: 370,
  },
  {
    transaction_date: "2022-08-01",
    total_accepted: 160,
    total_rejected: 270,
    total_pending: 380,
  },
  {
    transaction_date: "2022-09-01",
    total_accepted: 170,
    total_rejected: 280,
    total_pending: 390,
  },
  {
    transaction_date: "2022-10-01",
    total_accepted: 180,
    total_rejected: 290,
    total_pending: 400,
  },
  {
    transaction_date: "2022-11-01",
    total_accepted: 190,
    total_rejected: 300,
    total_pending: 410,
  },
  {
    transaction_date: "2022-12-01",
    total_accepted: 200,
    total_rejected: 310,
    total_pending: 420,
  },
];
