import { cookies } from "next/headers";
import api from "@/services/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";
import type { IResponse } from "../../types";
import { IPatchTransaction, IPatchTransactionResponse } from "./types";

export async function PATCH(req: NextRequest) {
  const body: IPatchTransaction = await req.json();

  try {
    const id = req.nextUrl.pathname.split("/").pop();

    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    const response: IResponse<IPatchTransaction> = await api.server.patch(
      `/transactions/${id}`,
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
