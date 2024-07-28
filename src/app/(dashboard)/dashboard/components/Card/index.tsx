import CountUp from "@/components/CountUp";
import styles from "./styles.module.scss";
import { MdOutlineArrowDropUp } from "react-icons/md";

export default function Card() {
  const { card, diff } = styles;
  return (
    <div className={card}>
      <div>
        <h4>Patrimony</h4>
        <CountUp end={258789} prefix="R$" decimals={2} locale="pt-BR" />
      </div>
      <div className={diff}>
        <MdOutlineArrowDropUp size={20} />
        <small>+10%</small>
      </div>
    </div>
  );
}
