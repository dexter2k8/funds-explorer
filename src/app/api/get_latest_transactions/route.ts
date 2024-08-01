import { cookies } from "next/headers";
import api from "@/services/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { IResponse } from "../types";
import { IGetLatestTransactions } from "./types";

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url);
    const fund_alias = searchParams.searchParams.get("fund_alias");
    const limit = searchParams.searchParams.get("limit");
    const offset = searchParams.searchParams.get("offset");

    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response: IResponse<IGetLatestTransactions> = await api.server.get(
      "/transactions/latest",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { fund_alias, limit, offset },
      }
    );

    return Response.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, {
        status: error.response?.status,
      });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
