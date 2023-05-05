import { Artist } from '@/models/artist';
import { Track } from '@/models/track';
import Fuse from 'fuse.js';
import { spotifyClientAdmin } from "./spotify/SpotifyClient";

class SearchApiService {
  public async getResults(query: string): Promise<(Artist | Track)[]> {
    const data = await spotifyClientAdmin.search(query, ['track,artist']);
    const mergedArray = [...data.artists.items, ...data.tracks.items] as unknown as (Track | Artist)[];
    const results = this.fuse(query, mergedArray);
    return results;
  }

  private fuse(query: string, results: (Track | Artist)[]) {
    const keys = ['name'];
    const fuse = new Fuse(results, { includeScore: true, keys });
    const data = fuse.search(query).map((i) => i.item);
    return data;
  }

  private sortByPopularity = (items: (Track | Artist)[]) => {
    return items.sort((a, b) => {
      return b.popularity - a.popularity;
    });
  }
}

const searchApiService = new SearchApiService();

export default searchApiService;
