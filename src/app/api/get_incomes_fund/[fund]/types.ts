import { IDonutData } from "@/app/(dashboard)/dashboard/__components__/Charts/Donut/types";

export interface IGetIncomes {
  id: string;
  price: number;
  updated_at: string;
  income: number;
  fund_alias: string;
  quantity: number;
  patrimony: number;
  variation: number;
}

export interface IGetIncomesFund {
  data: IGetIncomes[];
  totals: {
    count: number;
  };
}

export interface IGetIncomesFundResponse extends IGetIncomes {
  pvp: number;
}
