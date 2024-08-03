import { useRef } from "react";
import styles from "./styles.module.scss";
import { formatCurrency, formatDate } from "@/utils/lib";
import Tooltip from "@/components/Tooltip";
import { ITransactions } from "@/app/api/get_transactions/types";

export default function Transaction(props: ITransactions) {
  const { transaction, head, content, left, right, alias, tag, stats } = styles;
  const fund = useRef<HTMLParagraphElement>(null);

  const type = props.quantity < 0 ? "sell" : "buy";

  return (
    <div className={transaction}>
      <p ref={fund} className={head}>
        {props.name}
      </p>
      <Tooltip targetRef={fund} message={props.description} maxWidth={280} />
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
