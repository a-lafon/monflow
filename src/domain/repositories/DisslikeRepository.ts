export interface IDisslikeRepository {
  add(trackId: string): Promise<void>;
  getAll(): Promise<string[]>;
  delete(trackId: string): Promise<void>;
}