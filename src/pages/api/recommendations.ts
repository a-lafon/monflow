import { GetRecommendationsUsecase } from '@/api/usecases/GetRecommendationsUsecase';
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies';
import config from '@/api/config';
import { SpotifyClientCreator } from '@/api/services/spotify/SpotifyClientCreator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = new Cookies(req, res);

  try {
    const { artists, genres, tracks } = req.query;

    if (!artists && !tracks) {
      throw new Error('Seeds should not be empty');
    }

    const seedArtists = artists ? artists.toString().split(',') : [];
    const seedTracks = tracks ? tracks.toString().split(',') : [];
    const seedGenres = genres ? genres.toString().split(',') : [];

    const accessToken = cookies.get(config.accessTokenKey);

    const spotifyClient = new SpotifyClientCreator().createClient(accessToken);

    const getRecommendationsUsecase = new GetRecommendationsUsecase(spotifyClient);

    const recommendations = await getRecommendationsUsecase.exec({
      seedArtists,
      seedGenres,
      seedTracks,
      limit: 50
    });

    res.status(200).json(recommendations)
  } catch (error: unknown) {
    let message = 'An error occured';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500).send(message);
  }
}
