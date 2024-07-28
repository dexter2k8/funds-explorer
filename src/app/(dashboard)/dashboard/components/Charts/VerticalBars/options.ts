import { IVerticalBarsProps, IVerticalChartData } from "./types";

export default function chartOptions(data: IVerticalChartData[]) {
  const options: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: [
      {
        type: "category",
        data: data.map((el) => el.transaction_date),
        axisLabel: { rotate: 45 },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Accepted",
        type: "bar",
        stack: "Claims",
        emphasis: {
          focus: "series",
        },
        data: data.map((el) => el.total_accepted),
        color: "#8AD562",
      },
      {
        name: "Rejected",
        type: "bar",
        stack: "Claims",
        emphasis: {
          focus: "series",
        },
        data: data.map((el) => el.total_rejected),
        color: "#E3595A",
      },
      {
        name: "Pending",
        type: "bar",
        stack: "Claims",
        emphasis: {
          focus: "series",
        },
        data: data.map((el) => el.total_pending),
        color: "#29B6F5",
      },
    ],
  };

  return options;
}
