"use client";
import { useCallback, useMemo, useState } from "react";
import LayoutCharts from "@/app/(dashboard)/dashboard/__components__/Charts/layout";
import dynamic from "next/dynamic";
import chartOptions from "./options";
const Charts = dynamic(() => import("echarts-for-react"));
import Select from "@/components/Select";
import Skeleton from "@/components/Skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import type { ILineChartProps } from "./types";

export default function PatrimonialEvolution({
  fundList,
  profits,
  onChangeFund,
  isLoading,
}: ILineChartProps) {
  const options = chartOptions(profits || []);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleChangeFund = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("fund", value);
    replace(`/analytics?${params.toString()}`);
    onChangeFund(value);
  }, []);

  const fundToSet = useMemo(() => {
    const selectedFund = searchParams.get("fund") || "";
    const defaultFund = fundList.find((t) => t.value === selectedFund);
    const fund = defaultFund?.value || fundList?.[0]?.value || "";
    onChangeFund(fund);
    return fund;
  }, [searchParams, fundList]);

  return (
    <div>
      <LayoutCharts
        title="Patrimonial Evolution"
        sideControls={
          <div style={{ width: "12rem" }}>
            <Select
              type="search"
              value={fundToSet}
              options={fundList}
              onChange={handleChangeFund}
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
