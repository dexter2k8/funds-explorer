import { AxiosError } from "axios";
import { cookies } from "next/headers";
import api from "@/services/api";
import type { IFunds } from "../get_funds/types";
import type { IResponse } from "../types";

export async function GET() {
  try {
    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response: IResponse<IFunds> = await api.server.get("/funds/self-funds", {
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
