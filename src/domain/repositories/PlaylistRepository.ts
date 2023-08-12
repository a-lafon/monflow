import { Track } from "../models/track";

export interface IPlaylistRepository {
  add(track: Track): Promise<void>;
  getAll(): Promise<Track[]>;
  remove(id: string): Promise<void>;
  removeAll(): Promise<void>;
}