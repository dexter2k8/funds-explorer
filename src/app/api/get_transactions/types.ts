export interface ITransactions {
  id: string;
  bought_at: string;
  price: number;
  fund_alias: string;
  quantity: number;
  name: string;
  description: string;
}

export interface IGetTransactions {
  data: ITransactions[];
  count: number;
}
