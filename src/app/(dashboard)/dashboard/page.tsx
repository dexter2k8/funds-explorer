import Card from "./components/Card";
import styles from "./styles.module.scss";

export default function Dashboard() {
  const { dashboard, cards } = styles;
  return (
    <div className={dashboard}>
      <main>
        <section className={cards}>
          <Card />
          <Card />
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
