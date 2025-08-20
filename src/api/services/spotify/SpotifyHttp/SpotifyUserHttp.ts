import { IHttp } from '@/api/interfaces/Http';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export class SpotifyUserHttp implements IHttp {
  private requestInstance: AxiosInstance;
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.requestInstance = axios.create();
    this.requestInstance.interceptors.request.use(this.onRequestFulfilled.bind(this), this.onRequestReject.bind(this))
  }

  public request(): AxiosInstance {
    return this.requestInstance;
  }

  private async onRequestFulfilled(config: InternalAxiosRequestConfig<any>) {
    config.headers.Authorization = `Bearer ${this.accessToken}`;
    return config;
  }

  private async onRequestReject(error: any) {
    return Promise.reject(error);
  }
}