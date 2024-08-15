export interface IPostIncome {
  updated_at: string;
  price: string;
  income: string;
  fund_alias: string;
}

export interface IPostIncomeResponse extends IPostIncome {
  id: string;
  user_id: string;
}
