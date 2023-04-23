import config from "@/config";
import { Artist } from "@/core/models/artist";
import { Track } from "@/core/models/track";
import { AxiosInstance } from "axios";
import SpotifyAdminRequest from "./SpotifyAdminRequest";

interface SpotifyApiResponse<T> {
  href: string;
  items: T[]
  limit: number;
  offset: number;
  next?: string;
  previous?: number;
  total: number;
}

interface Search {
  artists: SpotifyApiResponse<Artist[]>;
  tracks: SpotifyApiResponse<Track[]>;
}

class SpotifyClient {
  constructor(private request: AxiosInstance) {
    this.request = request;
  }

  public async search(query: string, types: string[]): Promise<Search> {
    query = encodeURIComponent(query);
    const response = await this.request.get(`${config.spotify.apiUrl}/search?q=${query}&type=${types.toString()}`);
    const data: Search = response.data;
    return data;
  }

}

const spotifyClientAdmin = new SpotifyClient(SpotifyAdminRequest);

export {
  spotifyClientAdmin,
}