import config from '@/api/config';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cookies = new Cookies(req, res);
    const state = generateRandomString(16);
    let scope = config.spotify.userScope;

    if (req.query.scope && req.query.scope === 'admin') {
      scope = config.spotify.adminScope;
    }

    const data = {
      response_type: 'code',
      client_id: config.spotify.clientId,
      scope,
      redirect_uri: config.spotify.redirectUri,
      state: state
    }

    cookies.set(config.spotify.stateKey, state);
    res.redirect(`${config.spotify.url}/authorize?${queryString.stringify(data)}`);
  } catch (error: unknown) {
    res.redirect('/500');
  }
}

const generateRandomString = (length: number) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};