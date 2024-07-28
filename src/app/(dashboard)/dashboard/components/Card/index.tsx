import CountUp from "@/components/CountUp";
import styles from "./styles.module.scss";

export default function Card() {
  const { card } = styles;
  return (
    <div className={card}>
      <h4>Patrimony</h4>
      <CountUp end={258789} prefix="R$" decimals={2} locale="pt-BR" />
    </div>
  );
}
