"use client";
import LayoutCharts from "../layout";
import chartOptions from "./options";
import { IDonutProps } from "./types";
import dynamic from "next/dynamic";
const Charts = dynamic(() => import("echarts-for-react"));

export default function Donut({ title, data, colors }: IDonutProps) {
  const options = chartOptions({ data, colors });

  return (
    <LayoutCharts title={title}>
      <Charts option={options} />
    </LayoutCharts>
  );
}
