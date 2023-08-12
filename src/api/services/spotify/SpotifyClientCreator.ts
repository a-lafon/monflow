import { ISpotifyClient } from "@/api/interfaces/SpotifyClient";
import { RequestType } from "@/domain/models/requestType";
import { SpotifyClient } from "./SpotifyClient";
import { SpotifyHttpFactory } from "./SpotifyHttp/SpotifyHttpFactory";

export class SpotifyClientCreator {
  createClient(accessToken?: string): ISpotifyClient {
    const requestType = accessToken ? RequestType.User : RequestType.Admin;
    const spotifyRequest = new SpotifyHttpFactory(requestType);
    return new SpotifyClient(spotifyRequest.createRequest(accessToken));
  }
}