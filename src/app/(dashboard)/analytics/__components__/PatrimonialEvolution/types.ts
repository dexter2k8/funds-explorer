import { IGetIncomesFundResponse } from "@/app/api/get_incomes_fund/[fund]/types";
import { ISelectOptions } from "@/components/Select/types";

export interface ILineChartProps {
  fundList: ISelectOptions[];
  profits: IGetIncomesFundResponse[];
  isLoading: boolean;
}
