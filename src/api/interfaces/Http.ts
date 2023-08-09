import { AxiosInstance } from "axios";

export interface IHttp {
  request(): AxiosInstance;
}