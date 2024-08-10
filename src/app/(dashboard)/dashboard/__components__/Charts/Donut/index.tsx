"use client";
import Skeleton from "@/components/Skeleton";
import LayoutCharts from "../layout";
import chartOptions from "./options";
import { IDonutProps } from "./types";
import dynamic from "next/dynamic";
const Charts = dynamic(() => import("echarts-for-react"));

export default function Donut({ title, data, colors, isLoading }: IDonutProps) {
  const options = chartOptions({ data, colors });

  return (
    <LayoutCharts title={title}>
      {isLoading ? <Skeleton height="18rem" /> : <Charts option={options} />}
    </LayoutCharts>
  );
}
