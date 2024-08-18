export interface IPatchTransaction {
  bought_at: string;
  price: string;
  quantity: number;
  fund_alias: string;
}

export interface IPatchTransactionResponse extends IPatchTransaction {
  id: string;
  user_id: string;
}
