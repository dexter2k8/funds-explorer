import { create, StoreApi, UseBoundStore } from "zustand";
import type { TActions, TState } from "./types";
import api from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useAuth: UseBoundStore<StoreApi<TState & TActions>> = create<TState & TActions>(
  (set) => ({
    loading: false,
    setValue<T extends keyof TState>(state: T, value: TState[T]): void {
      set({ [state]: value });
    },

    signIn: async ({ email, password }) => {
      try {
        const response = await api.client.post("/api/sign_in", { email, password });
        console.log(response.data);
        toast.success("Login successfully");
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data);
        }
      }
    },
  })
);
