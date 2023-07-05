import { Artist } from '@/domain/models/artist';
import { Track } from '@/domain/models/track';
import { ISpotifyClient } from '../interfaces/SpotifyClient';
import { EntityType } from '@/domain/enums';
import { SearchResult } from '@/domain/models/search';

export class SearchUsecase {
  constructor(private readonly spotifyClient: ISpotifyClient) { }

  public async exec(query: string): Promise<SearchResult[]> {
    const data = await this.spotifyClient.search(query, ['track,artist']);
    const mergedResults = this.mergeTracksWithArtists(data.tracks.items, data.artists.items);
    return mergedResults.filter((r) => r.images.length >= 1);
  }

  private mergeTracksWithArtists(tracks: Track[], artists: Artist[]): SearchResult[] {
    const results = [...tracks, ...artists];
    return results
    .map((r) => {
      if (r.type === EntityType.Artist) {
        return this.getResultFromArtist(r as Artist);
      }
      return this.getResultFromTrack(r as Track);
    })
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
}