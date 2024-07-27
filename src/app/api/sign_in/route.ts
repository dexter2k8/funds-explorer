import { AxiosError } from "axios";
import { NextRequest } from "next/server";
import api from "@/services/api";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return new Response("Missing email or password", { status: 400 });
    }

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
