import { Artist } from "@/domain/models/artist";
import { Track } from "@/domain/models/track";
import { User } from "@/domain/models/user";

export interface ISpotifyClient {
  search(query: string, types: string[]): Promise<{artists: Artist[], tracks: Track[]}>;
  recommandations(params: ISpotifyClientRecommandationParams): Promise<{tracks: Track[]}>;
  createPlaylist(userId: string, data: ISpotifyClientCreatePlaylist): Promise<string>;
  addItemsToPlaylist(playlistId: string, uris: string[]): Promise<void>;
  me(): Promise<User>;
}

export interface ISpotifyClientRecommandationParams {
  limit?: number;
  market?: string;
  seedArtists: string[];
  seedGenres: string[];
  seedTracks: string[];
}

export interface ISpotifyClientCreatePlaylist {
  name: string;
  description?: string;
  public?: boolean;
}