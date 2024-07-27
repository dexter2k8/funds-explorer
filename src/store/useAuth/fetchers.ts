import api from "@/services/api";
import { ISignInProps } from "./types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

async function SignIn({ email, password }: ISignInProps) {
  try {
    await api.client.post("/api/sign_in", { email, password });
    toast.success("Login successfully");
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data);
    }
  }
}

export { SignIn };
