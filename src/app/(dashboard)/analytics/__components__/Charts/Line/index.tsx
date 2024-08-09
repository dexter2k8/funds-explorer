"use client";
import { useEffect, useState } from "react";
import LayoutCharts from "@/app/(dashboard)/dashboard/__components__/Charts/layout";
import dynamic from "next/dynamic";
import chartOptions from "./options";
const Charts = dynamic(() => import("echarts-for-react"));
import Select from "@/components/Select";
import { GetSelfFunds } from "./fetchers";
import type { ISelectOptions } from "@/components/Select/types";
import type { ILineChartProps } from "./types";

const mockFunds: ISelectOptions[] = [
  { value: "6", label: "6M" },
  { value: "12", label: "12M" },
  { value: "YTD", label: "YTD" },
];

export default function Line({ selectedFund }: ILineChartProps) {
  const options = chartOptions();
  const [funds, setFunds] = useState<ISelectOptions[]>();

  useEffect(() => {
    const selfFunds = async () => setFunds(await GetSelfFunds());
    selfFunds();
  }, []);

  const fund = funds?.length ? funds[0].value : "";

  return (
    <div>
      <LayoutCharts
        title="Patrimonial Evolution"
        sideControls={
          <div style={{ width: "12rem" }}>
            <Select value={fund} options={funds || []} onChange={selectedFund} />
          </div>
        }
      >
        <Charts option={options} style={{ height: "12rem" }} />
      </LayoutCharts>
    </div>
  );
}
