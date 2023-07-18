import { ISpotifyClient, ISpotifyClientCreatePlaylist, ISpotifyClientMeResponse, ISpotifyClientRecommandationParams, ISpotifyClientRecommandationResponse, ISpotifyClientSearchResponse } from "@/api/interfaces/SpotifyClient";
import { ISpotifyRequest } from "@/api/interfaces/SpotifyRequest";
import config from "@/api/config";
import queryString from "query-string";

const apiUrl = config.spotify.apiUrl;

export class SpotifyClient implements ISpotifyClient {
  constructor(private readonly spotifyRequest: ISpotifyRequest) { }

  public async search(query: string, types: string[]): Promise<ISpotifyClientSearchResponse> {
    query = encodeURIComponent(query);
    const response = await this.spotifyRequest
      .request()
      .get<ISpotifyClientSearchResponse>(`${apiUrl}/search?q=${query}&type=${types.toString()}`);
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
      .get<ISpotifyClientRecommandationResponse>(`${apiUrl}/recommendations?${queryParams}`);
    return response.data;
  }

  public async createPlaylist(userId: string, data: ISpotifyClientCreatePlaylist): Promise<string> {
    const response = await this.spotifyRequest.request().post(`${apiUrl}/users/${userId}/playlists`, data);
    return response.data.id;
  }

  public async addItemsToPlaylist(playlistId: string, uris: string[]): Promise<void> {
    await this.spotifyRequest.request().post(`${apiUrl}/playlists/${playlistId}/tracks`, {
      uris,
    });
  }

  public async me(): Promise<ISpotifyClientMeResponse> {
    const response = await this.spotifyRequest
      .request()
      .get<ISpotifyClientMeResponse>(`${apiUrl}/me`);
    return response.data;
  }
}
