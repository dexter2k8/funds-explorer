export type TFundType = "Ação" | "FII" | "BDR";

export interface IFunds {
  alias: string;
  name: string;
  description?: string;
  sector?: string;
  type: TFundType;
}

export interface IFundsResponse {
  data: IFunds[];
  count: number;
}
