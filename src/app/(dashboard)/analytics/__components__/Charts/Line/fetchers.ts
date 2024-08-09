import { IGetFunds } from "@/app/api/get_funds/types";
import api from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { IResponse } from "@/app/api/types";
import type { ISelectOptions } from "@/components/Select/types";

export async function GetSelfFunds() {
  try {
    const response: IResponse<IGetFunds[]> = await api.client.get("/api/get_self_funds");
    const options: ISelectOptions[] = response.data.map((fund) => ({
      value: fund.alias,
      label: fund.alias,
    }));
    return options;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.message);
    }
  }
}
