"use client";
import LayoutCharts from "@/app/(dashboard)/dashboard/__components__/Charts/layout";
import dynamic from "next/dynamic";
import chartOptions from "./options";
const Charts = dynamic(() => import("echarts-for-react"));
import Select from "@/components/Select";
import Skeleton from "@/components/Skeleton";
import type { ILineChartProps } from "./types";
import { useQueryState } from "nuqs";

export default function PatrimonialEvolution({ fundList, profits, isLoading }: ILineChartProps) {
  const options = chartOptions(profits || []);
  const [fund, setFund] = useQueryState("fund", { defaultValue: fundList[0]?.value });

  return (
    <div>
      <LayoutCharts
        title="Patrimonial Evolution"
        sideControls={
          <div style={{ width: "12rem" }}>
            <Select type="search" value={fund} options={fundList} onChange={setFund} />
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
