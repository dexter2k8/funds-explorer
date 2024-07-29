import { IDonutOptions } from "./types";

export default function chartOptions({ data, colors }: IDonutOptions) {
  const options: echarts.EChartsOption = {
    tooltip: {
      trigger: "item",
      align: "center",
    },
    legend: {
      top: 8,
      left: "center",
    },
    series: [
      {
        top: "-10%",
        bottom: "-20%",
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
