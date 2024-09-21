import { AxiosError } from "axios";
import { cookies } from "next/headers";
import api from "@/services/api";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const response = await api.server.post("/login", {
      email,
      password,
    });

    const token = response.data.token;

    cookies().set({
      name: "funds-explorer-token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return Response.json(response.data.token, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, { status: error.response?.status });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
