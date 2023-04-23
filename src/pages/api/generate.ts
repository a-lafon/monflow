import generateService from '@/api/services/GenerateService';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { artists, genres, tracks } = req.query;

  if (!artists && !tracks) {
    throw new Error('Seeds should not be empty');
  }

  const seedArtists = artists ? artists.toString().split(',') : [];
  const seedTracks = tracks ? tracks.toString().split(',') : [];
  const seedGenres = genres ? genres.toString().split(',') : [];

  const data = await generateService.getResults({
    seedArtists,
    seedGenres,
    seedTracks
  });

  res.status(200).json(data)
}
