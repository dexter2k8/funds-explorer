export default function chartOptions() {
  const options: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
    },
    grid: { top: "10%", left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "line",
        showSymbol: false,
      },
    ],
  };

  return options;
}
