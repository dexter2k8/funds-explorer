export interface IUsers {
  id?: string;
  name: string;
  email: string;
  password?: string;
  admin: boolean;
  avatar?: string;
}

export interface IUsersResponse {
  data: IUsers[];
  count: number;
}
