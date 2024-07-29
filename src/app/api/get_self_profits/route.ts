import { cookies } from "next/headers";
import api from "@/services/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url);
    const type = searchParams.searchParams.get("type");
    const initDate = searchParams.searchParams.get("initDate");
    const endDate = searchParams.searchParams.get("endDate");

    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response = await api.server.get("/incomes/self_profits", {
      headers: { Authorization: `Bearer ${token}` },
      params: { type, initDate, endDate },
    });

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
