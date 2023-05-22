import config from '@/config';
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies';
import spotifyAuthClient from '@/api/services/spotify/SpotifyAuthClient';

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

  // TODO: create a usecase
  // const data = await spotifyAuthClient.requestAccessToken(code as string);

  // res.status(200).json(data)
}


// private async requestAccessToken(code: string): Promise<AccessToken> {
//   const { data } = await axios({
//     method: 'post',
//     url: `${config.spotify.url}/api/token`,
//     headers: {
//       Authorization: `Basic ${Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')}`,
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     data: {
//       code,
//       redirect_uri: config.spotify.redirectUri,
//       grant_type: 'authorization_code',
//     },
//   });

//   return data;
// }