import { RequestType } from "@/domain/models/requestType";
import { SpotifyUserRequest } from "./SpotifyUserRequest";
import { SpotifyAdminRequest } from "./SpotifyAdminRequest";
import config from "@/api/config";
import { IHttp } from "@/api/interfaces/Http";

export class SpotifyRequestFactory {
  constructor(private requestType: RequestType) { }

  createRequest(accessToken?: string): IHttp {
    switch (this.requestType) {
      case RequestType.Admin:
        return new SpotifyAdminRequest(config.spotify.adminAccessToken, config.spotify.adminRefreshToken);
      case RequestType.User:
        return new SpotifyUserRequest(accessToken || '');
      default:
        throw Error('Request type not implemented');
    }
  }
}