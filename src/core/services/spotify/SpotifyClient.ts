import config from "@/config";
import { SearchResponse, RecommandationParams, RecommandationResponse } from "@/core/models/spotify";
import { AxiosInstance } from "axios";
import queryString from "query-string";
import SpotifyAdminRequest from "./SpotifyAdminRequest";

class SpotifyClient {
  constructor(private request: AxiosInstance) {
    this.request = request;
  }

  public async search(query: string, types: string[]): Promise<SearchResponse> {
    query = encodeURIComponent(query);
    const response = await this.request.get(`${config.spotify.apiUrl}/search?q=${query}&type=${types.toString()}`);
    const data: SearchResponse = response.data;
    return data;
  }

  public async recommandations(params: RecommandationParams): Promise<RecommandationResponse> {
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

    const response = await this.request.get(`${config.spotify.apiUrl}/recommendations?${queryParams}`);
    const data: RecommandationResponse = response.data;
    return data;
  }

}

const spotifyClientAdmin = new SpotifyClient(SpotifyAdminRequest);

export {
  spotifyClientAdmin,
}