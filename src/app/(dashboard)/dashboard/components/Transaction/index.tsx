import styles from "./styles.module.scss";
import { formatCurrency, formatDate } from "@/utils/lib";
import type { ITransactionProps } from "./types";

export default function Transaction(props: ITransactionProps) {
  const { transaction, content, left, right, alias, tag, stats } = styles;

  return (
    <div className={transaction}>
      <h4>{props.name}</h4>
      <div className={content}>
        <div className={left}>
          <small className={alias}>{props.alias}</small>
          <div className={stats}>
            <p>
              {props.quantity} <small>shares</small>
            </p>
            <small
              className={tag}
              style={{ backgroundColor: props.type === "buy" ? "var(--green)" : "var(--red)" }}
            >
              {props.type}
            </small>
          </div>
        </div>
        <div className={right}>
          <b>{formatCurrency(props.price)}</b>
          <small>{formatDate(props.date)}</small>
        </div>
      </div>
    </div>
  );
}
