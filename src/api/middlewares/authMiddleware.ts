import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { SpotifyClient } from "../services/spotify/SpotifyClient";
import Cookies from "cookies";
import config from "../config";
import { RequestType } from "@/domain/models/requestType";
import { SpotifyHttpFactory } from "../services/spotify/SpotifyHttp/SpotifyHttpFactory";

export default async function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) {
  const cookies = new Cookies(req, res);

  try {
    const accessToken = cookies.get(config.accessTokenKey);

    if (!accessToken) {
      throw new Error('Authorization is missing');
    }

    const spotifyHttpFactory = new SpotifyHttpFactory(RequestType.User);
    const spotifyClient = new SpotifyClient(spotifyHttpFactory.createRequest(accessToken));

    const data = await spotifyClient.me();

    req.accessToken = accessToken;
    req.user = data;

    next(req, res);
  } catch (error) {
    cookies.set(config.accessTokenKey);
    res.status(401).send('Unauthorized');
  }
}
