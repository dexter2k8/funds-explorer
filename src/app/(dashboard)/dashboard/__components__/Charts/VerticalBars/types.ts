import { IGetSelfProfits } from "@/app/api/get_self_profits/types";

export interface IVerticalBarsProps {
  data: IGetSelfProfits[];
  selectedRange: (key: number) => void;
  isLoading: boolean;
}
