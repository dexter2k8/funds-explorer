import { IGetLatestTransactions } from "@/app/api/get_latest_transactions/types";
import styles from "./styles.module.scss";
import { formatCurrency, formatDate } from "@/utils/lib";

export default function Transaction(props: IGetLatestTransactions) {
  const { transaction, head, content, left, right, alias, tag, stats } = styles;

  const type = props.quantity < 0 ? "sell" : "buy";

  return (
    <div className={transaction}>
      <p className={head}>{props.name}</p>
      <div className={content}>
        <div className={left}>
          <small className={alias}>{props.fund_alias}</small>
          <div className={stats}>
            <p>{Math.abs(props.quantity)}x</p>
            <small
              className={tag}
              style={{ backgroundColor: type === "buy" ? "var(--green)" : "var(--red)" }}
            >
              {type}
            </small>
          </div>
        </div>
        <div className={right}>
          <b>{formatCurrency(props.price)}</b>
          <small>{formatDate(props.bought_at)}</small>
        </div>
      </div>
    </div>
  );
}
