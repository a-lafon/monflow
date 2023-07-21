import authMiddleware from "@/api/middlewares/authMiddleware";
import { SpotifyClient } from "@/api/services/spotify/SpotifyClient";
import { SpotifyUserRequest } from "@/api/services/spotify/SpotifyUserRequest";
import { CreatePlaylistUsecase } from "@/api/usecases/CreatePlaylistUsecase";
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

      const spotifyRequest = new SpotifyUserRequest(req.accessToken);
      const spotifyClient = new SpotifyClient(spotifyRequest);

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