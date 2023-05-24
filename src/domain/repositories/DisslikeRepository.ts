import { Track } from "../models/track";

export interface IDisslikeRepository {
  add(track: Track): Promise<void>;
  getAll(): Promise<Track[]>;
  delete(id: string): Promise<void>;
}