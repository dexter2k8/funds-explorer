export interface IGetSelfProfits {
  year_month: string;
  total_patrimony: number;
  total_income: number;
}

export interface IGetSelfProfitsResponse {
  data: IGetSelfProfits[];
  patrimony: {
    value: number;
    difference: number;
  };
  profit: {
    value: number;
    difference: number;
  };
}

export function getGain(final: number, initial: number) {
  if (!initial || !final) return 0;
  return Number((((final - initial) / initial) * 100).toFixed(1));
}
