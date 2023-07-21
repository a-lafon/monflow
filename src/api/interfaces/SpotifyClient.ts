import { Artist } from "@/domain/models/artist";
import { Track } from "@/domain/models/track";
import { User } from "@/domain/models/user";

export interface ISpotifyClient {
  search(query: string, types: string[]): Promise<ISpotifyClientSearchResponse>;
  recommandations(params: ISpotifyClientRecommandationParams): Promise<ISpotifyClientRecommandationResponse>;
  createPlaylist(userId: string, data: ISpotifyClientCreatePlaylist): Promise<string>;
  addItemsToPlaylist(playlistId: string, uris: string[]): Promise<void>;
  me(): Promise<User>;
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