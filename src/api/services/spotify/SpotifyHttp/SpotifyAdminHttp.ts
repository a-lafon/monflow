import config from '@/api/config';
import { IHttp } from '@/api/interfaces/Http';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { SpotifyClient } from '../SpotifyClient';
import { HttpService } from '../../HttpService';

export class SpotifyAdminHttp implements IHttp {
  private requestInstance: AxiosInstance;

  constructor(private accessToken: string, private refreshToken: string) {
    this.requestInstance = axios.create();
    this.requestInstance.interceptors.request.use(this.onRequestFulfilled.bind(this), this.onRequestReject.bind(this))
    this.requestInstance.interceptors.response.use(this.onResponseFulfilled.bind(this), this.onResponseReject.bind(this));
  }

  public request(): AxiosInstance {
    return this.requestInstance;
  }

  private async onRequestFulfilled(config: InternalAxiosRequestConfig<any>) {
    if (this.accessToken === '') {
      await this.setAccessToken();
    }
    console.log('accessToken admin =', this.accessToken)
    config.headers.Authorization = `Bearer ${this.accessToken}`;
    return config;
  }

  private async onRequestReject(error: any) {
    return Promise.reject(error);
  }

  private async onResponseFulfilled(value: AxiosResponse<any, any>) {
    return value;
  }

  private async onResponseReject(error: any) {
    if (this.isUnauthorized(error)) {
      return await this.retryWithNewAccessToken(error.config);
    }

    return Promise.reject(error);
  }

  private async retry(config: AxiosRequestConfig<any>) {
    return this.requestInstance(config);
  }

  private async retryWithNewAccessToken(axiosConfig: AxiosRequestConfig<any>) {
    await this.setAccessToken();
    return this.retry(axiosConfig);
  }

  private async setAccessToken() {
    const spotifyClient = new SpotifyClient(new HttpService());
    const data = await spotifyClient.refreshAccessToken(this.refreshToken);
    config.spotify.adminAccessToken = data.access_token;
    this.accessToken = data.access_token;
  }

  private isUnauthorized = (error: any) => {
    const status = error.response ? error.response.status : 500;
    if (status === 400 || status === 401) {
      return true;
    }
    return false;
  };
}
