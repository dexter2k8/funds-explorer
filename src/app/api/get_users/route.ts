import { AxiosError } from "axios";
import { cookies } from "next/headers";
import api from "@/services/api";
import type { IResponse } from "../types";
import type { IUsersResponse } from "./types";

export async function GET() {
  try {
    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response: IResponse<IUsersResponse> = await api.server.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Response.json(response.data.data, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, { status: error.response?.status });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
