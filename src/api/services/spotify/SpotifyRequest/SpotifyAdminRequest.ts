import config from '@/api/config';
import { IHttp } from '@/api/interfaces/Http';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export class SpotifyAdminRequest implements IHttp {
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
    const data = await this.refreshAccessToken(this.refreshToken);
    config.spotify.adminAccessToken = data.access_token;
    this.accessToken = data.access_token;
    return this.retry(axiosConfig);
  }

  private async refreshAccessToken(refreshToken: string): Promise<{
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    scope: string;
  }> {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', config.spotify.clientId);

    const headers = {
      Authorization: `Basic ${Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const { data } = await axios.post(`${config.spotify.url}/api/token`, params, { headers });

    return data;
  }

  private isUnauthorized = (error: any) => {
    const status = error.response ? error.response.status : 500;
    if (status === 400 || status === 401) {
      return true;
    }
    return false;
  };
}
