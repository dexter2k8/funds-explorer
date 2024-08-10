import { IGetIncomesFundResponse } from "@/app/api/get_incomes_fund/[fund]/types";

export interface ILineChartProps {
  onChangeFund: (value: string) => void;
  profits: IGetIncomesFundResponse[];
  isLoading: boolean;
}
