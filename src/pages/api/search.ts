import type { NextApiRequest, NextApiResponse } from 'next';
import searchService from '@/api/services/SearchService';
import { Artist } from '@/api/models/artist';
import { Track } from '@/api/models/track';
import { Image } from '@/api/models/image';

export interface SearchApiResponse {
  genres: string[];
  images: Image[];
  name: string;
  type: string;
  popularity: number;
  id: string;
  artist?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchApiResponse[]>
) {
  const query = req.query.q?.toString();

  if (!query || query.length <= 0) {
    throw new Error('Query should not be empty');
  }

  const results = await searchService.getResults(query);

  const data = results.map((result) => {
    if (result.type === 'artist') {
      return getResultFromArtist(result as Artist);
    }
    return getResultFromTrack(result as Track);
  });

  res.status(200).json(data)
}

const getResultFromArtist = (artist: Artist): SearchApiResponse => ({
  id: artist.id,
  genres: artist.genres || [],
  images: artist.images || [],
  name: artist.name,
  popularity: artist.popularity,
  type: artist.type,
})

const getResultFromTrack = (track: Track): SearchResponse => ({
  id: track.id,
  genres: track.artists[0].genres || [],
  images: track.album.images || [],
  name: track.name,
  popularity: track.popularity,
  type: track.type,
  artist: track.artists[0].name,
})