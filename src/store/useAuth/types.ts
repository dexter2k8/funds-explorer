export type TActions = {
  setValue<T extends keyof TState>(state: T, value: TState[T]): void;
  signIn: (data: ISignInProps) => Promise<boolean>;
  signUp: (data: ISignUpProps) => Promise<boolean>;
};

export type TState = {
  loading: boolean;
};

export interface ISignInProps {
  email: string;
  password: string;
}

export interface ISignUpProps extends ISignInProps {
  name: string;
  confirmPassword: string;
}
