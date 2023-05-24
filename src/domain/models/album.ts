import { Artist } from "./artist";
import { Image } from "./image";

export interface Album {
  album_group: string;
  album_type: string;
  artists: Artist[];
  available_markets?: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}