"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [fund, setFund] = useState<string>();

  const handleChangeFund = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("fund", value);
    replace(`/analytics?${params.toString()}`);
    setFund(value);
    onChangeFund(value);
  }, []);

  useEffect(() => {
    const selectedFund = searchParams.get("fund");
    if (selectedFund) {
      setFund(selectedFund);
      onChangeFund(selectedFund);
    } else if (fundList.length) {
      const params = new URLSearchParams(searchParams);
      params.set("fund", fundList[0].value);
      replace(`/analytics?${params.toString()}`);
    }
  }, [searchParams, fundList]);

  return (
    <div>
      <LayoutCharts
        title="Patrimonial Evolution"
        sideControls={
          <div style={{ width: "12rem" }}>
            <Select type="search" value={fund} options={fundList} onChange={handleChangeFund} />
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
