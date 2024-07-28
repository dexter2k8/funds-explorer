import { IVerticalChartData } from "./types";

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
        data: data.map((el) => el.year_month),
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
        name: "Pending",
        type: "bar",
        stack: "Claims",
        emphasis: {
          focus: "series",
        },
        data: data.map((el) => el.total_patrimony),
        color: "#29B6F5",
      },
      {
        name: "Accepted",
        type: "bar",
        stack: "Claims",
        emphasis: {
          focus: "series",
        },
        data: data.map((el) => el.total_income),
        color: "#8AD562",
      },
    ],
  };

  return options;
}
