import { Track } from "../models/track";

export interface ILikeRepository {
  add(track: Track): Promise<void>;
  getAll(): Promise<Track[]>;
  delete(id: string): Promise<void>;
}