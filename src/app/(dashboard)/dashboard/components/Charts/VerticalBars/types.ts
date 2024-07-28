export interface IVerticalChartData {
  year_month: string;
  total_patrimony: number | string;
  total_income: number | string;
}

export interface IVerticalBarsProps {
  data: IVerticalChartData[];
}
