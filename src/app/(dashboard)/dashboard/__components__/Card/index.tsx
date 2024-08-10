import styles from "./styles.module.scss";
import Skeleton from "@/components/Skeleton";
import { formatCurrency } from "@/utils/lib";
import CountUp from "react-countup";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

interface ICardProps {
  label: string;
  value: number;
  difference: number;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export default function Card({ label, value = 0, difference = 0, icon, isLoading }: ICardProps) {
  const { card, title, diff } = styles;
  return (
    <div className={card}>
      <div>
        <div className={title}>
          {icon}
          <h4>{label}</h4>
        </div>
        {isLoading ? (
          <Skeleton height="2rem" width="9rem" />
        ) : (
          <CountUp duration={1} end={value} formattingFn={formatCurrency} />
        )}
      </div>
      <div className={diff} style={{ color: difference >= 0 ? "var(--green)" : "var(--red)" }}>
        {isLoading ? (
          <>
            <div> </div>
            <Skeleton height="1.25rem" width="2rem" />
          </>
        ) : (
          <>
            {difference >= 0 ? (
              <MdOutlineArrowDropUp size="1.25rem" />
            ) : (
              <MdOutlineArrowDropDown size="1.25rem" />
            )}
            <small>{difference}%</small>
          </>
        )}
      </div>
    </div>
  );
}
