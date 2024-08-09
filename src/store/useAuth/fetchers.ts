import api from "@/services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import type { ISignInProps, ISignUpProps } from "./types";

async function SignIn({ email, password }: ISignInProps) {
  try {
    const response = await api.client.post("/api/sign_in", { email, password });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.message);
    }
  }
  return "";
}

async function SignUp({ name, email, password, confirmPassword }: ISignUpProps) {
  try {
    await api.client.post("/api/sign_up", { name, email, password, confirmPassword });
    toast.success("Sign up successfully");
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.message);
    }
  }
  return false;
}

async function SignOut() {
  try {
    await api.client.get("/api/sign_out");
    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
}

export { SignIn, SignUp, SignOut };
