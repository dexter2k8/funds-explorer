import styles from "./styles.module.scss";
import CountUp from "@/components/CountUp";
import { MdOutlineArrowDropUp } from "react-icons/md";

interface ICardProps {
  label: string;
  value: number;
  difference: string;
  icon?: React.ReactNode;
}

export default function Card({ label, value, difference, icon }: ICardProps) {
  const { card, title, diff } = styles;
  return (
    <div className={card}>
      <div>
        <div className={title}>
          {icon}
          <h4>{label}</h4>
        </div>
        <CountUp duration={1} end={value} prefix="R$" decimals={2} locale="pt-BR" />
      </div>
      <div className={diff} style={{ color: "var(--green)" }}>
        <MdOutlineArrowDropUp size={20} />
        <small>{difference}</small>
      </div>
    </div>
  );
}
