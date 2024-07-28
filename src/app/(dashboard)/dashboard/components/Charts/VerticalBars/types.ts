export interface IVerticalChartData {
  transaction_date: string;
  total_accepted: number | string;
  total_rejected: number | string;
  total_pending: number | string;
}

export interface IVerticalBarsProps {
  data: IVerticalChartData[];
}
