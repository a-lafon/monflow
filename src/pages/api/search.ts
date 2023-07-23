import type { NextApiRequest, NextApiResponse } from 'next';
import { SearchUsecase } from '@/api/usecases/SearchUsecase';
import { FuseService } from '@/api/services/FuseService';
import config from '@/api/config';
import Cookies from 'cookies';
import { SpotifyClientCreator } from '@/api/services/spotify/SpotifyClientCreator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = new Cookies(req, res);

  try {
    const query = req.query.q?.toString();

    if (!query || query.length <= 0) {
      throw new Error('Query should not be empty');
    }

    const accessToken = cookies.get(config.accessTokenKey);

    const spotifyClient = new SpotifyClientCreator().createClient(accessToken);

    const data = await new SearchUsecase(spotifyClient).exec(query);

    const fuse = new FuseService();
    const fuseResults = fuse.getResults(query, data, ['name']);

    res.status(200).json(fuseResults);
  } catch (error: unknown) {
    let message = 'An error occured';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500).send(message);
  }
}
