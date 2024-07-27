import api from "@/services/api";
import { ISignInProps } from "./types";
import { setCookie } from "nookies";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

async function SignIn({ email, password }: ISignInProps) {
  try {
    const response = await api.client.post("/api/sign_in", { email, password });
    const token = response?.data;

    setCookie(null, "token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    toast.success("Login successfully");
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data);
    }
  }
}

export { SignIn };
