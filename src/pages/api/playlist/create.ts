import { spotifyAdminRequest } from "@/api/services/spotify/SpotifyAdminRequest";
import { SpotifyClient } from "@/api/services/spotify/SpotifyClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    if (!req.body.uris) {
      throw new Error('Missing parameters');
    }

    const spotifyClient = new SpotifyClient(spotifyAdminRequest);
    const user = await spotifyClient.me();
    const playlistId = await spotifyClient.createPlaylist(user.id, {
      name: 'New playlist',
      description: 'description',
      public: false,
    });
    await spotifyClient.addItemsToPlaylist(playlistId, req.body.uris);
    res.status(200).send('Playlist created');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}