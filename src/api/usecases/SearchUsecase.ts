import { Artist } from '@/shared/models/artist';
import { Track } from '@/shared/models/track';
import Fuse from 'fuse.js';
import { ISpotifyClient } from '../interfaces/ISpotifyClient';
import { Image } from '@/shared/models/image';
import { Type } from '@/shared/enums';

export interface SearchResult {
  genres: string[];
  images: Image[];
  name: string;
  type: string;
  popularity: number;
  id: string;
  artist?: string;
}

export class SearchUsecase {
  constructor(private readonly spotifyClient: ISpotifyClient) { }

  public async exec(query: string) {
    const data = await this.spotifyClient.search(query, ['track,artist']);
    const mergedResults = this.mergeResults(data.tracks.items, data.artists.items);
    return this.fuse(query, mergedResults);
  }

  private mergeResults(tracks: Track[], artists: Artist[]): SearchResult[] {
    const results = [...tracks, ...artists];
    return results
    .map((r) => {
      if (r.type === Type.Artist) {
        return this.getResultFromArtist(r as Artist);
      }
      return this.getResultFromTrack(r as Track);
    })
    .filter((r) => r.images.length >= 1)
  }

  private getResultFromArtist(artist: Artist): SearchResult {
    return {
      id: artist.id,
      genres: artist.genres || [],
      images: artist.images || [],
      name: artist.name,
      popularity: artist.popularity,
      type: artist.type,
    }
  }

  private getResultFromTrack(track: Track): SearchResult {
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

  private fuse(query: string, results: SearchResult[]) {
    const keys = ['name'];
    const fuse = new Fuse(results, { includeScore: true, keys });
    return fuse.search(query).map((i) => i.item);
  }
}