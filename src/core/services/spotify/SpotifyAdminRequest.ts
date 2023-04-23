import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import spotifyAuthClient from './SpotifyAuthClient';

const oldToken = 'token'
const oldRefresh = 'token'

class SpotifyAdminRequest {
  public request: AxiosInstance;
  private accessToken!: string;
  private refreshToken!: string;

  constructor() {
    this.request = axios.create();
    this.request.interceptors.request.use(this.onRequestFulfilled.bind(this), this.onRequestReject.bind(this))
    this.request.interceptors.response.use(this.onResponseFulfilled.bind(this), this.onResponseReject.bind(this));
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

  private isUnauthorized = (status: number) => status === 401;

  private async retry(config: AxiosRequestConfig<any>) {
    return this.request(config);
  }

  private async retryWithNewAccessToken(config: AxiosRequestConfig<any>) {
    const data = await spotifyAuthClient.refreshAccessToken(this.refreshToken);
    this.accessToken = data.access_token;
    return this.retry(config);
  }
}

const spotifyAdminRequest = new SpotifyAdminRequest();

export default spotifyAdminRequest.request;