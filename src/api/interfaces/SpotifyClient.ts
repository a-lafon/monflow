import { Artist } from "@/domain/models/artist";
import { Track } from "@/domain/models/track";

export interface ISpotifyClient {
  search(query: string, types: string[]): Promise<ISpotifyClientSearchResponse>;
  recommandations(params: ISpotifyClientRecommandationParams): Promise<ISpotifyClientRecommandationResponse>;
  createPlaylist(userId: string, data: ISpotifyClientCreatePlaylist): Promise<string>;
  addItemsToPlaylist(playlistId: string, uris: string[]): Promise<void>;
  me(): Promise<ISpotifyClientMeResponse>;
}

export interface ISpotifyApiResponse<T> {
  href: string;
  items: T
  limit: number;
  offset: number;
  next?: string;
  previous?: number;
  total: number;
}

export interface ISpotifyClientSearchResponse {
  artists: ISpotifyApiResponse<Artist[]>;
  tracks: ISpotifyApiResponse<Track[]>;
}

export interface ISpotifyClientRecommandationParams {
  limit?: number;
  market?: string;
  seedArtists: string[];
  seedGenres: string[];
  seedTracks: string[];
}

export interface ISpotifyClientRecommandationResponse {
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

export interface ISpotifyClientCreatePlaylist {
  name: string;
  description?: string;
  public?: boolean;
}

export interface ISpotifyClientMeResponse {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images:
  {
    url: string;
    height: number;
    width: number;
  }[];
  type: string;
  uri: string;
  country: string;
  product: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  email: string;
}