import { RequestType } from "@/domain/models/requestType";
import { SpotifyUserHttp } from "./SpotifyUserHttp";
import { SpotifyAdminHttp } from "./SpotifyAdminHttp";
import config from "@/api/config";
import { IHttp } from "@/api/interfaces/Http";

export class SpotifyHttpFactory {
  constructor(private requestType: RequestType) { }

  createRequest(accessToken?: string): IHttp {
    switch (this.requestType) {
      case RequestType.Admin:
        return new SpotifyAdminHttp(config.spotify.adminAccessToken, config.spotify.adminRefreshToken);
      case RequestType.User:
        return new SpotifyUserHttp(accessToken || '');
      default:
        throw Error('Request type not implemented');
    }
  }
}