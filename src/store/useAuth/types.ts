export type TActions = {
  setValue<T extends keyof TState>(state: T, value: TState[T]): void;
  signIn: (data: ISignInProps) => Promise<string>;
  signUp: (data: ISignUpProps) => Promise<boolean>;
  signOut: () => Promise<void>;
};

export type TState = {
  isAdmin: boolean;
};

export interface ISignInProps {
  email: string;
  password: string;
}

export interface ISignUpProps extends ISignInProps {
  name: string;
  confirmPassword: string;
  avatar?: string;
}
