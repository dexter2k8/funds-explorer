"use client";
import { useEffect, useMemo, useState } from "react";
import LayoutCharts from "@/app/(dashboard)/dashboard/__components__/Charts/layout";
import dynamic from "next/dynamic";
import chartOptions from "./options";
const Charts = dynamic(() => import("echarts-for-react"));
import Select from "@/components/Select";
import { GetSelfFunds } from "./fetchers";
import type { ISelectOptions } from "@/components/Select/types";
import type { ILineChartProps } from "./types";
import Skeleton from "@/components/Skeleton";

export default function Line({ profits, onChangeFund, isLoading }: ILineChartProps) {
  const options = chartOptions(profits || []);
  const [funds, setFunds] = useState<ISelectOptions[]>();

  useEffect(() => {
    const selfFunds = async () => setFunds(await GetSelfFunds());
    selfFunds();
  }, []);

  const fund = useMemo(() => (funds?.length ? funds[0].value : ""), [funds]);

  useEffect(() => {
    onChangeFund(fund);
  }, [fund]);

  return (
    <div>
      <LayoutCharts
        title="Patrimonial Evolution"
        sideControls={
          <div style={{ width: "12rem" }}>
            <Select value={fund} options={funds || []} onChange={onChangeFund} />
          </div>
        }
      >
        {isLoading ? (
          <Skeleton height="11.5rem" />
        ) : (
          <div style={{ height: "12rem" }}>
            <Charts option={options} style={{ height: "12rem" }} />
          </div>
        )}
      </LayoutCharts>
    </div>
  );
}
