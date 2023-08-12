import axios, { AxiosInstance } from "axios";
import { IHttp } from "../interfaces/Http";

export class HttpService implements IHttp {
  private requestInstance: AxiosInstance;

  constructor() {
    this.requestInstance = axios.create();
  }

  request(): AxiosInstance {
    return this.requestInstance;
  }
}