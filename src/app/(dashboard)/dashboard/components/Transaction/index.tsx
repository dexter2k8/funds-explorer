import styles from "./styles.module.scss";
import { formatCurrency, formatDate } from "@/utils/lib";
import type { ITransactionProps } from "./types";

export default function Transaction(props: ITransactionProps) {
  const { transaction, head, content, left, right, alias, tag, stats } = styles;

  return (
    <div className={transaction}>
      <p className={head}>{props.name}</p>
      <div className={content}>
        <div className={left}>
          <small className={alias}>{props.alias}</small>
          <div className={stats}>
            <p>{props.quantity}x</p>
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
