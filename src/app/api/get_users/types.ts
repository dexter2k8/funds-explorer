export interface IUsers {
  id?: string;
  name: string;
  email: string;
  password?: string;
  admin: string;
  avatar?: string;
}

export interface IUsersResponse {
  data: IUsers[];
  count: number;
}
