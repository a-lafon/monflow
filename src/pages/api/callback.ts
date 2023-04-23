import config from '@/config';
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies';
import spotifyAuthClient from '@/core/services/spotify/SpotifyAuthClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = new Cookies(req, res);
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = cookies.get(config.spotify.stateKey);
  cookies.set(config.spotify.stateKey);

  if (!code) {
    throw new Error('Code not found');
  }

  if (!state || state !== storedState) {
    throw new Error('State missmatch');
  }

  const data = await spotifyAuthClient.requestAccessToken(code as string);

  res.status(200).json(data)
}
