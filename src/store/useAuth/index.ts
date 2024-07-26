import { create, StoreApi, UseBoundStore } from "zustand";
import type { TActions, TState } from "./types";

export const useAuth: UseBoundStore<StoreApi<TState & TActions>> = create<TState & TActions>(
  (set) => ({
    loading: false,
    setValue<T extends keyof TState>(state: T, value: TState[T]): void {
      set({ [state]: value });
    },
  })
);
