"use client";
import LayoutCharts from "@/app/(dashboard)/dashboard/__components__/Charts/layout";
import dynamic from "next/dynamic";
import chartOptions from "./options";
const Charts = dynamic(() => import("echarts-for-react"));

export default function Line() {
  const options = chartOptions();
  return (
    <div>
      <LayoutCharts title="Patrimonial Evolution">
        <Charts option={options} style={{ height: 200 }} />
      </LayoutCharts>
    </div>
  );
}
