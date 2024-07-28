"use client";
import LayoutCharts from "../layout";
import dynamic from "next/dynamic";
import chartOptions from "./options";
import { IVerticalBarsProps } from "./types";
const Charts = dynamic(() => import("echarts-for-react"));

export default function VerticalBars({ data }: IVerticalBarsProps) {
  const options = chartOptions(data);

  return (
    <div>
      <LayoutCharts title="Portfolio over time" sideControls={<div>Month Selector</div>}>
        <Charts option={options} />
      </LayoutCharts>
    </div>
  );
}
