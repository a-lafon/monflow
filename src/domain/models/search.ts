import { Image } from './image';

export interface SearchResult {
  genres: string[];
  images: Image[];
  name: string;
  type: string;
  popularity: number;
  id: string;
  artist?: string;
}