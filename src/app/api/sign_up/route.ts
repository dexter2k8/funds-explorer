import { AxiosError } from "axios";
import { NextRequest } from "next/server";
import api from "@/services/api";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    const response = await api.server.post("/users", {
      name,
      email,
      password,
      confirmPassword,
    });

    return Response.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data.message, { status: error.response?.status });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
}
