import type { NextApiRequest, NextApiResponse } from 'next';
import { SpotifyClient } from '@/api/services/spotify/SpotifyClient';
import { spotifyAdminRequest } from '@/api/services/spotify/SpotifyAdminRequest';
import { SearchApiUsecase } from '@/api/usecases/SearchApiUsecase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query.q?.toString();

  if (!query || query.length <= 0) {
    throw new Error('Query should not be empty');
  }

  const spotifyClient = new SpotifyClient(spotifyAdminRequest);

  const data = await new SearchApiUsecase(spotifyClient).exec(query);

  res.status(200).json(data)
}
