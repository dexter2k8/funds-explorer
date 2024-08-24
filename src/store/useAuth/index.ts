import { create, StoreApi, UseBoundStore } from "zustand";
import { SignIn, SignOut, SignUp } from "./fetchers";
import type { TActions, TState } from "./types";

export const useAuth: UseBoundStore<StoreApi<TState & TActions>> = create<TState & TActions>(
  (set) => ({
    isAdmin: false,
    setValue<T extends keyof TState>(state: T, value: TState[T]): void {
      set({ [state]: value });
    },

    signIn: async (props) => await SignIn(props),
    signUp: async (props) => await SignUp(props),
    signOut: async () => await SignOut(),
  })
);
