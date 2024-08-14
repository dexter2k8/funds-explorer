export interface IPostTransaction {
  bought_at: string;
  price: string;
  quantity: number;
  fund_alias: string;
}

export interface IPostTransactionResponse extends IPostTransaction {
  id: string;
  user_id: string;
}
