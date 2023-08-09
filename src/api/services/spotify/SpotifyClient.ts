import { ISpotifyClient, ISpotifyClientCreatePlaylist, ISpotifyClientRecommandationParams } from "@/api/interfaces/SpotifyClient";
import config from "@/api/config";
import queryString from "query-string";
import { User } from "@/domain/models/user";
import { IHttp } from "@/api/interfaces/Http";
import { Artist } from "@/domain/models/artist";
import { Track } from "@/domain/models/track";

const apiUrl = config.spotify.apiUrl;

interface ISpotifyApiResponse<T> {
  href: string;
  items: T
  limit: number;
  offset: number;
  next?: string;
  previous?: number;
  total: number;
}

interface ISpotifyClientSearchResponse {
  artists: ISpotifyApiResponse<Artist[]>;
  tracks: ISpotifyApiResponse<Track[]>;
}

interface ISpotifyClientRecommandationResponse {
  seeds: {
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: string;
  }[];
  tracks: Track[];
}

export class SpotifyClient implements ISpotifyClient {
  constructor(private readonly http: IHttp) { }

  public async search(query: string, types: string[]): Promise<{
    artists: Artist[],
    tracks: Track[]
  }> {
    query = encodeURIComponent(query);
    const response = await this.http
      .request()
      .get<ISpotifyClientSearchResponse>(`${apiUrl}/search?q=${query}&type=${types.toString()}`);
    return {
      artists: response.data.artists.items,
      tracks: response.data.tracks.items
    }
  }

  public async recommandations(params: ISpotifyClientRecommandationParams): Promise<{tracks: Track[]}> {
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

    const response = await this.http
      .request()
      .get<ISpotifyClientRecommandationResponse>(`${apiUrl}/recommendations?${queryParams}`);
    return {
      tracks: response.data.tracks,
    };
  }

  public async createPlaylist(userId: string, data: ISpotifyClientCreatePlaylist): Promise<string> {
    const response = await this.http.request().post(`${apiUrl}/users/${userId}/playlists`, data);
    return response.data.id;
  }

  public async addItemsToPlaylist(playlistId: string, uris: string[]): Promise<void> {
    await this.http.request().post(`${apiUrl}/playlists/${playlistId}/tracks`, {
      uris,
    });
  }

  public async me(): Promise<User> {
    const response = await this.http
      .request()
      .get<User>(`${apiUrl}/me`);
    return response.data;
  }
}
