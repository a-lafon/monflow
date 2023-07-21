import config from '@/api/config';
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.query.code) {
      throw new Error('Code not found');
    }

    const cookies = new Cookies(req, res);
    const storedState = cookies.get(config.spotify.stateKey);
    cookies.set(config.spotify.stateKey);

    if (!req.query.state || req.query.state !== storedState) {
      throw new Error('State missmatch');
    }

    // TODO: create a usecase
    const data = await requestAccessToken(req.query.code.toString());

    cookies.set(config.accessTokenKey, data.access_token, {
      maxAge: data.expires_in * 1000
    });

    res.redirect('/');
  } catch (error: unknown) {
    res.redirect('/500');
  }
}

const requestAccessToken = async (code: string): Promise<any> => {
  const { data } = await axios({
    method: 'post',
    url: `${config.spotify.url}/api/token`,
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      code,
      redirect_uri: config.spotify.redirectUri,
      grant_type: 'authorization_code',
    },
  });

  return data;
}
