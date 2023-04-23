import type { NextApiRequest, NextApiResponse } from 'next';
import searchService from '@/core/services/SearchService';
import { Artist } from '@/core/models/artist';
import { Track } from '@/core/models/track';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<(Artist[] | Track[])[]>
) {
  const query = req.query.q?.toString();

  if (!query || query.length <= 0) {
    throw new Error('Query should not be empty');
  }

  const results = await searchService.getResults(query);

  res.status(200).json(results)
}
