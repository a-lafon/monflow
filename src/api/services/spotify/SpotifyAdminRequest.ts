import { ISpotifyRequest } from '@/api/interfaces/SpotifyRequest';
import config from '@/config';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

// TODO: get token from bdd
const oldToken = process.env.OLD_TOKEN || '';
const oldRefresh = process.env.OLD_REFRESH_TOKEN || '';

export class SpotifyAdminRequest implements ISpotifyRequest {
  private requestInstance: AxiosInstance;
  private accessToken!: string;
  private refreshToken!: string;

  constructor() {
    this.requestInstance = axios.create();
    this.requestInstance.interceptors.request.use(this.onRequestFulfilled.bind(this), this.onRequestReject.bind(this))
    this.requestInstance.interceptors.response.use(this.onResponseFulfilled.bind(this), this.onResponseReject.bind(this));
  }

  public request(): AxiosInstance {
    return this.requestInstance;
  }

  private async onRequestFulfilled(config: InternalAxiosRequestConfig<any>) {
    if (!this.accessToken) {
      // TODO: get token data from database
      this.accessToken = oldToken;
      this.refreshToken = oldRefresh;
    }

    console.log(this.accessToken)
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
    const status = error.response ? error.response.status : null;

    if (this.isUnauthorized(status)) {
      return await this.retryWithNewAccessToken(error.config);
    }

    return Promise.reject(error);
  }

  private async retry(config: AxiosRequestConfig<any>) {
    return this.requestInstance(config);
  }

  private async retryWithNewAccessToken(config: AxiosRequestConfig<any>) {
    const data = await this.refreshAccessToken(this.refreshToken);
    this.accessToken = data.access_token;
    return this.retry(config);
  }

  private async refreshAccessToken(refreshToken: string): Promise<AccessToken> {
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

  private isUnauthorized = (status: number) => status === 401;
}

export const spotifyAdminRequest = new SpotifyAdminRequest();