import { AxiosError } from "axios";
import { cookies } from "next/headers";
import api from "@/services/api";
import type { IDonutData } from "@/app/(dashboard)/dashboard/__components__/Charts/Donut/types";
import type { IResponse } from "../types";
import type { IGetIncomesPatrimony } from "./types";

export async function GET() {
  try {
    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response: IResponse<IGetIncomesPatrimony[]> = await api.server.get("/incomes/patrimony", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const patrimony: IDonutData[] = response?.data.map((income) => {
      return {
        name: income.type,
        value: income.total_patrimony,
      };
    });

    const profit: IDonutData[] = response?.data.map((income) => {
      return {
        name: income.type,
        value: income.total_income,
      };
    });

    return Response.json({ patrimony, profit }, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, { status: error.response?.status });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
