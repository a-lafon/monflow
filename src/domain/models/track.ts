import { Album } from "./album";
import { Artist } from "./artist";

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: false;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: false;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_playable: boolean;
}