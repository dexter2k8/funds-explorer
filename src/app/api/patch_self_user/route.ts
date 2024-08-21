import { cookies } from "next/headers";
import api from "@/services/api";
import { AxiosError } from "axios";
import { IResponse } from "../types";
import type { NextRequest } from "next/server";
import type { IPatchSelfUser } from "./types";
import type { IGetSelfUser } from "../get_self_user/types";

export async function PATCH(req: NextRequest) {
  const body: IPatchSelfUser = await req.json();

  try {
    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response: IResponse<IGetSelfUser> = await api.server.patch(
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
