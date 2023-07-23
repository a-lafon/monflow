import { ISpotifyClient } from "@/api/interfaces/SpotifyClient";
import { RequestType } from "@/domain/models/requestType";
import { SpotifyRequestFactory } from "./SpotifyRequest/SpotifyRequestFactory";
import { SpotifyClient } from "./SpotifyClient";

export class SpotifyClientCreator {
  createClient(accessToken?: string): ISpotifyClient {
    const requestType = accessToken ? RequestType.User : RequestType.Admin;
    const spotifyRequest = new SpotifyRequestFactory(requestType);
    return new SpotifyClient(spotifyRequest.createRequest(accessToken));
  }
}