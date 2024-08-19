"use client";
import { useEffect, useMemo, useState } from "react";
import LayoutCharts from "@/app/(dashboard)/dashboard/__components__/Charts/layout";
import dynamic from "next/dynamic";
import chartOptions from "./options";
const Charts = dynamic(() => import("echarts-for-react"));
import Select from "@/components/Select";
import Skeleton from "@/components/Skeleton";
import type { ILineChartProps } from "./types";

export default function PatrimonialEvolution({
  fundList,
  profits,
  selectedFund,
  onChangeFund,
  isLoading,
  loadingFunds,
}: ILineChartProps) {
  const options = chartOptions(profits || []);

  useEffect(() => {
    onChangeFund(selectedFund);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFunds]);

  return (
    <div>
      <LayoutCharts
        title="Patrimonial Evolution"
        sideControls={
          <div style={{ width: "12rem" }}>
            <Select
              type="search"
              value={fundList?.[0]?.value || ""}
              options={fundList}
              onChange={onChangeFund}
            />
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
