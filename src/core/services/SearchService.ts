import config from "@/config";
import { Artist } from "../models/artist";
import { Track } from "../models/track";
import SpotifyAdminRequest from "./spotify/SpotifyAdminRequest";
import Fuse from 'fuse.js';
import { spotifyClientAdmin } from "./spotify/SpotifyClient";

class SearchService {
  public async getResults(query: string) {
    const data = await spotifyClientAdmin.search(query, ['track,artist']);
    const results = this.fuse(query, [...data.artists.items, ...data.tracks.items])
    return this.sortByPopularity(results);
  }

  private fuse(query: string, results: (Artist[] | Track[])[]) {
    const keys = ['name'];
    const fuse = new Fuse(results, { includeScore: true, keys });
    const data = fuse.search(query).map((i) => i.item);
    return data;
  }

  private sortByPopularity = (items: (Artist[] | Track[])[]) => {
    return items.sort((a: any, b: any) => {
      return b.popularity - a.popularity;
    });
  }
}

const searchService = new SearchService();

export default searchService;
