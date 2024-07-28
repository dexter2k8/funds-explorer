import { IDonutOptions } from "./types";

export default function chartOptions({ data, colors }: IDonutOptions) {
  const options: echarts.EChartsOption = {
    tooltip: {
      trigger: "item",
      align: "center",
    },
    legend: {
      top: "0",
      left: "center",
    },
    series: [
      {
        top: 0,
        bottom: "-10%",
        type: "pie",
        radius: ["37%", "60%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        color: colors,
        data: data,
      },
    ],
  };

  return options;
}
