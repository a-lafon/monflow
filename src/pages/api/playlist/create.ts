import authMiddleware from "@/api/middlewares/authMiddleware";
import { SpotifyClient } from "@/api/services/spotify/SpotifyClient";
import { SpotifyRequestFactory } from "@/api/services/spotify/SpotifyRequest/SpotifyRequestFactory";
import { CreatePlaylistUsecase } from "@/api/usecases/CreatePlaylistUsecase";
import { RequestType } from "@/domain/models/requestType";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  authMiddleware(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        throw new Error('Method not allowed');
      }

      if (!req.body.uris) {
        throw new Error('Missing parameters');
      }

      const spotifyRequest = new SpotifyRequestFactory(RequestType.User);
      const spotifyClient = new SpotifyClient(spotifyRequest.createRequest(req.accessToken));

      const createPlaylistUsecase = new CreatePlaylistUsecase(spotifyClient);
      await createPlaylistUsecase.exec({
        uris: req.body.uris.toString(),
        userId: req.user.id,
      });

      res.send('Playlist created');
    } catch (error: unknown) {
      let message = 'An error occured';
      if (error instanceof Error) {
        message = error.message;
      }
      return res.status(500).send(message);
    }
  });
}