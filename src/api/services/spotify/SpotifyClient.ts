import { ISpotifyClient, ISpotifyClientRecommandationParams, ISpotifyClientRecommandationResponse, ISpotifyClientSearchResponse } from "@/api/interfaces/ISpotifyClient";
import { ISpotifyRequest } from "@/api/interfaces/ISpotifyRequest";
import config from "@/config";
import queryString from "query-string";

export class SpotifyClient implements ISpotifyClient {
  constructor(private readonly spotifyRequest: ISpotifyRequest) { }

  public async search(query: string, types: string[]): Promise<ISpotifyClientSearchResponse> {
    query = encodeURIComponent(query);
    const response = await this.spotifyRequest
      .request()
      .get<ISpotifyClientSearchResponse>(`${config.spotify.apiUrl}/search?q=${query}&type=${types.toString()}`);
    return response.data;
  }

  public async recommandations(params: ISpotifyClientRecommandationParams): Promise<ISpotifyClientRecommandationResponse> {
    const defaultLimit = 20;
    const maxLimit = 50;

    if (params.limit && params.limit > maxLimit) {
      params.limit = maxLimit;
    }

    const queryParams = queryString.stringify({
      seed_artists: params.seedArtists.length >= 1 ? params.seedArtists.toString() : undefined,
      seed_tracks: params.seedTracks.length >= 1 ? params.seedTracks.toString() : undefined,
      seed_genres: params.seedGenres.length >= 1 ? params.seedGenres.toString() : undefined,
      limit: params.limit || defaultLimit,
      market: params.market
    }, {
      arrayFormat: 'comma',
    });

    const response = await this.spotifyRequest
      .request()
      .get<ISpotifyClientRecommandationResponse>(`${config.spotify.apiUrl}/recommendations?${queryParams}`);
    return response.data;
  }
}
