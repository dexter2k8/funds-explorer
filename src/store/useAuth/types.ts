export type TActions = {
  setValue<T extends keyof TState>(state: T, value: TState[T]): void;
};

export type TState = {
  loading: boolean;
};
