import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { SpotifyUserRequest } from "../services/spotify/SpotifyUserRequest";
import { SpotifyClient } from "../services/spotify/SpotifyClient";
import Cookies from "cookies";
import config from "../config";

export default async function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) {
  const cookies = new Cookies(req, res);

  try {
    const accessToken = cookies.get(config.accessTokenKey);

    if (!accessToken) {
      throw new Error('Authorization is missing');
    }

    const spotifyUserRequest = new SpotifyUserRequest(accessToken);
    const spotifyClient = new SpotifyClient(spotifyUserRequest);

    const data = await spotifyClient.me();

    req.accessToken = accessToken;
    req.user = data;

    next(req, res);
  } catch (error) {
    cookies.set(config.accessTokenKey);
    res.status(401).send('Unauthorized');
  }
}
