export interface ITransactionProps {
  id: string;
  date: string;
  type: "buy" | "sell";
  alias: string;
  name: string;
  quantity: number;
  price: number;
}
