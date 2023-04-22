import config from '@/config';
import { generateRandomString } from '@/utils';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = new Cookies(req, res);
  const state = generateRandomString(16);

  const data = {
    response_type: 'code',
    client_id: config.spotify.clientId,
    scope: config.spotify.adminScope,
    redirect_uri: config.spotify.redirectUri,
    state: state
  }

  cookies.set(config.spotify.stateKey, state);
  res.redirect(`${config.spotify.url}/authorize?${queryString.stringify(data)}`);
}
