import { RecommandationParams } from "../models/spotify";
import { spotifyClientAdmin } from "./spotify/SpotifyClient";

// seeds are limited to 5 by spotify
const maxSeeds = 5;

class GenerateService {
  public async getResults(params: RecommandationParams) {
    // count only artists and tracks as viable seeds
    let seedsCount = params.seedArtists.concat(params.seedTracks).length;
    let genres: string[] = [];

    if (seedsCount > maxSeeds) {
      throw new Error(`Seeds are limited to ${maxSeeds}`);
    }

    if (seedsCount < maxSeeds && params.seedGenres.length >= 1) {
      genres = this.enricheSeedsByGenre(seedsCount, params.seedGenres)
    }

    const recommandations = await spotifyClientAdmin.recommandations({
      ...params,
      seedGenres: genres,
    });
    return recommandations.tracks;
  }

  private enricheSeedsByGenre(seedsCount: number, seedsGenre: string[]): string[] {
    let index = 0;
    const genres: string[] = [];

    while (seedsCount < maxSeeds) {
      if (!seedsGenre[index]) {
        break;
      }
      genres.push(seedsGenre[index]);
      seedsCount += 1;
      index += 1;
    }

    return genres;
  }
}

const generateService = new GenerateService();

export default generateService;
