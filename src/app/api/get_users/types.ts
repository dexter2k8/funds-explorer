export type TFundType = "Ação" | "FII" | "BDR";

export interface IUsers {
  id: string;
  name: string;
  email?: string;
  admin?: boolean;
  avatar?: string;
}

export interface IUsersResponse {
  data: IUsers[];
  count: number;
}
