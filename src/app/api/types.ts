export interface IResponse<T> {
  data: {
    data: T[];
    count: number;
  };
}
