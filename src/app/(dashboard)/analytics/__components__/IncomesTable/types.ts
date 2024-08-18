import type { IGetIncomesFundResponse } from "@/app/api/get_incomes_fund/[fund]/types";
import type { ISelectOptions } from "@/components/Select/types";

export interface IIncomesTableProps {
  fundList: ISelectOptions[];
  isLoadingProfits: boolean;
  profits: IGetIncomesFundResponse[];
}

type TAction = "add" | "edit" | "delete";
export interface IActionsProps {
  action: TAction;
  id?: string | number;
}

export interface IActions {
  onAction: ({ action, id }: IActionsProps) => void;
}
