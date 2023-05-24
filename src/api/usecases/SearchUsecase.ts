import { Artist } from '@/domain/models/artist';
import { Track } from '@/domain/models/track';
import Fuse from 'fuse.js';
import { ISpotifyClient } from '../interfaces/SpotifyClient';
import { EntityType } from '@/domain/enums';
import { ISearchResponse } from '../interfaces/Search';

export class SearchUsecase {
  constructor(private readonly spotifyClient: ISpotifyClient) { }

  public async exec(query: string) {
    const data = await this.spotifyClient.search(query, ['track,artist']);
    const mergedResults = this.mergeResults(data.tracks.items, data.artists.items);
    const results = mergedResults.filter((r) => r.images.length >= 1);
    return this.fuse(query, results);
  }

  private mergeResults(tracks: Track[], artists: Artist[]): ISearchResponse[] {
    const results = [...tracks, ...artists];
    return results
    .map((r) => {
      if (r.type === EntityType.Artist) {
        return this.getResultFromArtist(r as Artist);
      }
      return this.getResultFromTrack(r as Track);
    })
  }

  private getResultFromArtist(artist: Artist): ISearchResponse {
    return {
      id: artist.id,
      genres: artist.genres || [],
      images: artist.images || [],
      name: artist.name,
      popularity: artist.popularity,
      type: artist.type,
    }
  }

  private getResultFromTrack(track: Track): ISearchResponse {
    return {
      id: track.id,
      genres: track.artists[0].genres || [],
      images: track.album.images || [],
      name: track.name,
      popularity: track.popularity,
      type: track.type,
      artist: track.artists[0].name,
    }
  }

  private fuse(query: string, results: ISearchResponse[]) {
    const keys = ['name'];
    const fuse = new Fuse(results, { includeScore: true, keys });
    return fuse.search(query).map((i) => i.item);
  }
}