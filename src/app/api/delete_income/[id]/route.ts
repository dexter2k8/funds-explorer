import { cookies } from "next/headers";
import api from "@/services/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    const token = cookies().get("funds-explorer-token")?.value;
    if (!token) return Response.json("Token not found", { status: 401 });

    await api.server.delete(`/incomes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Response.json("Income deleted", { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, { status: error.response?.status });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
