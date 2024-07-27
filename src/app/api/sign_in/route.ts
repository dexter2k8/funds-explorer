import { AxiosError } from "axios";
import { NextRequest } from "next/server";
import api from "@/services/api";

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

    return Response.json(response.data.token, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, { status: error.response?.status });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
