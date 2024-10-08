import { AxiosError } from "axios";
import { cookies } from "next/headers";
import api from "@/services/api";
import type { NextRequest } from "next/server";
import type { IResponse } from "../types";
import type { IGetTransactions } from "./types";

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url);
    const fund_alias = searchParams.searchParams.get("fund_alias");
    const limit = searchParams.searchParams.get("limit");
    const offset = searchParams.searchParams.get("offset");

    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response: IResponse<IGetTransactions> = await api.server.get("/transactions", {
      headers: { Authorization: `Bearer ${token}` },
      params: { fund_alias, limit, offset },
    });

    return Response.json(response.data.data, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, {
        status: error.response?.status,
      });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
