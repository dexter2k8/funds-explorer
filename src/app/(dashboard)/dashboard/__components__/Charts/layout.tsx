import styles from "./styles.module.scss";
import type { CSSProperties, PropsWithChildren } from "react";

interface IChartCardProps {
  title: string;
  sideControls?: React.ReactNode;
  height?: CSSProperties["height"];
  overflow?: CSSProperties["overflow"];
}

export default function LayoutCharts({
  title,
  children,
  sideControls,
  height,
  overflow,
}: PropsWithChildren<IChartCardProps>) {
  const { charts, head } = styles;

  return (
    <div className={charts} style={{ height, overflow }}>
      <div className={head}>
        <h4>{title}</h4>
        {sideControls}
      </div>
      {children}
    </div>
  );
}
