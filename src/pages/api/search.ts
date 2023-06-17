import type { NextApiRequest, NextApiResponse } from 'next';
import { SpotifyClient } from '@/api/services/spotify/SpotifyClient';
import { spotifyAdminRequest } from '@/api/services/spotify/SpotifyAdminRequest';
import { SearchUsecase } from '@/api/usecases/SearchUsecase';
import { ISearchResponse } from '@/api/interfaces/Search';
import { FuseService } from '@/api/services/FuseService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISearchResponse[]>
) {
  const query = req.query.q?.toString();

  if (!query || query.length <= 0) {
    throw new Error('Query should not be empty');
  }

  const spotifyClient = new SpotifyClient(spotifyAdminRequest);

  const data = await new SearchUsecase(spotifyClient).exec(query);

  const fuse = new FuseService();
  const fuseResults = fuse.getResults(query, data, ['name']);

  res.status(200).json(fuseResults);
}
