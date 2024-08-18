export interface IPatchIncome {
  updated_at: string;
  price: string;
  income: string;
  fund_alias: string;
}

export interface IPatchIncomeResponse extends IPatchIncome {
  id: string;
  user_id: string;
}
