import { cookies } from "next/headers";
import api from "@/services/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";
import type { IGetIncomesFund, IGetIncomesFundResponse } from "./types";
import type { IResponse } from "../../types";

export async function GET(request: NextRequest) {
  try {
    const fund = request.nextUrl.pathname.split("/").pop();

    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response: IResponse<IGetIncomesFund> = await api.server.get(`/incomes/${fund}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const incomes: IGetIncomesFundResponse[] = response.data.data.map((income) => {
      return {
        ...income,
        pvp: (income.income / income.patrimony) * 100,
      };
    });

    return Response.json(incomes, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, { status: error.response?.status });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
