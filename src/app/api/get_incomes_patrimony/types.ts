import type { IDonutData } from "@/app/(dashboard)/dashboard/__components__/Charts/Donut/types";

export interface IGetIncomesPatrimony {
  type: string;
  total_patrimony: number;
  total_income: number;
}

export interface IGetIncomesResponse {
  patrimony: IDonutData[];
  profit: IDonutData[];
}
