"use client";
import styles from "./styles.module.scss";
import LayoutCharts from "../layout";
import dynamic from "next/dynamic";
import chartOptions from "./options";
import { IVerticalBarsProps } from "./types";
import SegmentedControl, { ISegmentedControlItem } from "@/components/SegmentedControl";
import { CSSProperties } from "react";
const Charts = dynamic(() => import("echarts-for-react"));

const segmentedItems: ISegmentedControlItem[] = [
  { key: 1, label: "6M" },
  { key: 2, label: "12M" },
  { key: 3, label: "YTD" },
];

export default function VerticalBars({ data }: IVerticalBarsProps) {
  const { container, content } = styles;
  const options = chartOptions(data);
  const calcWidth = data.length * 2.5;
  const widthStyle = { "--min-width": `${calcWidth}rem` };

  return (
    <div>
      <LayoutCharts
        title="Portfolio over time"
        sideControls={<SegmentedControl defaultSelected={3} items={segmentedItems} />}
      >
        <div className={container}>
          <div className={content} style={widthStyle as CSSProperties}>
            <Charts option={options} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </LayoutCharts>
    </div>
  );
}
