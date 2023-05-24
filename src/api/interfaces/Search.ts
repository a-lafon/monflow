import { Image } from '@/domain/models/image';

export interface ISearchResponse {
  genres: string[];
  images: Image[];
  name: string;
  type: string;
  popularity: number;
  id: string;
  artist?: string;
}