import CountUp from "@/components/CountUp";
import styles from "./styles.module.scss";
import { MdOutlineArrowDropUp } from "react-icons/md";

interface ICardProps {
  label: string;
  value: number;
  difference: string;
}

export default function Card({ label, value, difference }: ICardProps) {
  const { card, diff } = styles;
  return (
    <div className={card}>
      <div>
        <h4>{label}</h4>
        <CountUp end={value} prefix="R$" decimals={2} locale="pt-BR" />
      </div>
      <div className={diff} style={{ color: "var(--green)" }}>
        <MdOutlineArrowDropUp size={20} />
        <small>{difference}</small>
      </div>
    </div>
  );
}
