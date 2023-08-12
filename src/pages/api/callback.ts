import config from '@/api/config';
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies';
import { SpotifyClient } from '@/api/services/spotify/SpotifyClient';
import { HttpService } from '@/api/services/HttpService';

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

    const spotifyClient = new SpotifyClient(new HttpService());
    const data = await spotifyClient.requestAccessToken(req.query.code.toString());

    const isAdmin = cookies.get(config.spotify.adminScopeKey) === 'true' ? true : false; 

    if (isAdmin) {
      cookies.set(config.spotify.adminScopeKey);
      return res.json(data);
    }

    cookies.set(config.accessTokenKey, data.access_token, {
      maxAge: data.expires_in * 1000
    });
    
    res.redirect('/');
  } catch (error: unknown) {
    res.redirect('/500');
  }
}
