import { Artist } from "./artist";
import { Track } from "./track";

export interface SpotifyApiResponse<T> {
  href: string;
  items: T[]
  limit: number;
  offset: number;
  next?: string;
  previous?: number;
  total: number;
}

export interface SearchResponse {
  artists: SpotifyApiResponse<Artist[]>;
  tracks: SpotifyApiResponse<Track[]>;
}

export interface RecommandationParams {
  limit?: number;
  market?: string;
  seedArtists: string[];
  seedGenres: string[];
  seedTracks: string[];
}

export interface RecommandationResponse {
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