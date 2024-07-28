import api from "@/services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import type { ISignInProps, ISignUpProps } from "./types";

async function SignIn({ email, password }: ISignInProps) {
  try {
    await api.client.post("/api/sign_in", { email, password });
    toast.success("Login successfully");
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data);
    }
  }
  return false;
}

async function SignUp({ name, email, password, confirmPassword }: ISignUpProps) {
  try {
    await api.client.post("/api/sign_up", { name, email, password, confirmPassword });
    toast.success("Sign up successfully");
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data);
    }
  }
  return false;
}

async function SignOut() {
  try {
    const response = await api.client.get("/api/sign_out");
    console.log(response.data);
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}

export { SignIn, SignUp, SignOut };
