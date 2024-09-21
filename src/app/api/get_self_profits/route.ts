import { AxiosError } from "axios";
import { cookies } from "next/headers";
import api from "@/services/api";
import { getGain } from "./types";
import type { NextRequest } from "next/server";
import type { IResponse } from "../types";
import type { IGetSelfProfits, IGetSelfProfitsResponse } from "./types";

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url);
    const type = searchParams.searchParams.get("type");
    const init_date = searchParams.searchParams.get("init_date");
    const end_date = searchParams.searchParams.get("end_date");

    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response: IResponse<IGetSelfProfits[]> = await api.server.get("/incomes/self-profits", {
      headers: { Authorization: `Bearer ${token}` },
      params: { type, init_date, end_date },
    });

    const profits = response?.data;
    const patrimony = profits[profits.length - 1]?.total_patrimony;
    const profit = profits[profits.length - 1]?.total_income;
    const percentPatrimony = getGain(
      profits[profits.length - 1]?.total_patrimony,
      profits[profits.length - 2]?.total_patrimony
    );
    const percentProfit = getGain(
      profits[profits.length - 1]?.total_income,
      profits[profits.length - 2]?.total_income
    );

    const data: IGetSelfProfitsResponse = {
      data: profits,
      patrimony: {
        value: patrimony,
        difference: percentPatrimony,
      },
      profit: {
        value: profit,
        difference: percentProfit,
      },
    };

    return Response.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, {
        status: error.response?.status,
      });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
