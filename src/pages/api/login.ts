import config from '@/api/config';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = new Cookies(req, res);

  try {
    const state = generateRandomString(16);
    let scope = config.spotify.userScope;

    if (req.query.scope && req.query.scope === config.spotify.adminScopeKey) {
      scope = config.spotify.adminScope;
      cookies.set(config.spotify.adminScopeKey, 'true');
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
    cookies.set(config.spotify.stateKey);
    cookies.set(config.spotify.adminScopeKey);
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