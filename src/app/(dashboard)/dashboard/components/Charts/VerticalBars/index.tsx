"use client";
import LayoutCharts from "../layout";
import dynamic from "next/dynamic";
import chartOptions from "./options";
import { IVerticalBarsProps } from "./types";
import SegmentedControl, { ISegmentedControlItem } from "@/components/SegmentedControl";
const Charts = dynamic(() => import("echarts-for-react"));

const segmentedItems: ISegmentedControlItem[] = [
  { key: 1, label: "6M" },
  { key: 2, label: "12M" },
  { key: 3, label: "YTD" },
];

export default function VerticalBars({ data }: IVerticalBarsProps) {
  const options = chartOptions(data);

  return (
    <div>
      <LayoutCharts
        title="Portfolio over time"
        sideControls={<SegmentedControl defaultSelected={3} items={segmentedItems} />}
      >
        <Charts option={options} />
      </LayoutCharts>
    </div>
  );
}
