import styles from "./styles.module.scss";
import CountUp from "@/components/CountUp";
import Skeleton from "@/components/Skeleton";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

interface ICardProps {
  label: string;
  value: number;
  difference: number;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export default function Card({ label, value, difference, icon, isLoading }: ICardProps) {
  const { card, title, diff } = styles;
  return (
    <div className={card}>
      <div>
        <div className={title}>
          {icon}
          <h4>{label}</h4>
        </div>
        {isLoading ? (
          <Skeleton height={40} width={150} />
        ) : (
          <CountUp duration={1} end={value} prefix="R$" decimals={2} locale="pt-BR" />
        )}
      </div>
      <div className={diff} style={{ color: difference >= 0 ? "var(--green)" : "var(--red)" }}>
        {isLoading ? (
          <>
            <div> </div>
            <Skeleton height={20} width={30} />
          </>
        ) : (
          <>
            {difference >= 0 ? (
              <MdOutlineArrowDropUp size={20} />
            ) : (
              <MdOutlineArrowDropDown size={20} />
            )}
            <small>{difference}%</small>
          </>
        )}
      </div>
    </div>
  );
}
