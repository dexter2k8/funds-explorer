import { AxiosError } from "axios";
import { cookies } from "next/headers";
import api from "@/services/api";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const fund = request.nextUrl.pathname.split("/").pop();

    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response = await api.server.get(`/funds/${fund}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Response.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, { status: error.response?.status });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
