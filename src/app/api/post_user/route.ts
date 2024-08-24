import { cookies } from "next/headers";
import api from "@/services/api";
import { AxiosError } from "axios";
import { IResponse } from "../types";
import type { NextRequest } from "next/server";
import type { IPostUser } from "./types";

export async function POST(req: NextRequest) {
  const body: IPostUser = await req.json();

  try {
    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response: IResponse<IPostUser> = await api.server.post(
      "/users",
      { ...body },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return Response.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, { status: error.response?.status });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
