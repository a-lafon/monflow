import { ISpotifyRequest } from '@/api/interfaces/SpotifyRequest';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// TODO: refactorer le admin request et user request en un seul
export class SpotifyUserRequest implements ISpotifyRequest {
  private requestInstance: AxiosInstance;
  private accessToken: string;
  private refreshToken!: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.requestInstance = axios.create();
    this.requestInstance.interceptors.request.use(this.onRequestFulfilled.bind(this), this.onRequestReject.bind(this))
  }

  public request(): AxiosInstance {
    return this.requestInstance;
  }

  private async onRequestFulfilled(config: InternalAxiosRequestConfig<any>) {
    console.log(this.accessToken)
    config.headers.Authorization = `Bearer ${this.accessToken}`;
    return config;
  }

  private async onRequestReject(error: any) {
    return Promise.reject(error);
  }
}