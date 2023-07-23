import { ISpotifyRequest } from "@/api/interfaces/SpotifyRequest";
import { RequestType } from "@/domain/models/requestType";
import { spotifyAdminRequest } from "./SpotifyAdminRequest";
import { SpotifyUserRequest } from "./SpotifyUserRequest";

export class SpotifyRequestFactory {
  constructor(private requestType: RequestType) { }

  createRequest(accessToken?: string): ISpotifyRequest {
    switch (this.requestType) {
      case RequestType.Admin:
        return spotifyAdminRequest;
      case RequestType.User:
        return new SpotifyUserRequest(accessToken || '');
      default:
        throw Error('Request type not implemented');
    }
  }
}