import config from "@/config";
import { ISpotifyClient, ISpotifyClientRecommandationParams } from "../interfaces/ISpotifyClient";
import { Track } from "@/shared/models/track";

const MAX_SEEDS = config.spotify.maxSeeds;

export class GetRecommendationsUsecase {
  constructor(private readonly spotifyClient: ISpotifyClient) { }

  public async exec(params: ISpotifyClientRecommandationParams): Promise<Track[]> {
    // count only artists and tracks as viable seeds
    let seedsCount = params.seedArtists.concat(params.seedTracks).length;
    let genres: string[] = [];

    if (seedsCount > MAX_SEEDS) {
      throw new Error(`Seeds are limited to ${MAX_SEEDS}`);
    }

    if (seedsCount < MAX_SEEDS && params.seedGenres.length >= 1) {
      genres = this.enricheSeedsByGenre(seedsCount, params.seedGenres)
    }

    const recommandations = await this.spotifyClient.recommandations({
      ...params,
      seedGenres: genres,
    });

    const tracks = recommandations.tracks;

    return tracks
      .filter((track) => track.preview_url)
      .map((track) => {
        delete track.available_markets;
        delete track.album.available_markets;
        return track;
      })
  }

  private enricheSeedsByGenre(seedsCount: number, seedsGenre: string[]): string[] {
    let index = 0;
    const genres: string[] = [];

    while (seedsCount < MAX_SEEDS) {
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