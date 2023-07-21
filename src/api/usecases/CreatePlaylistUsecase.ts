import { ISpotifyClient } from '../interfaces/SpotifyClient';

export class CreatePlaylistUsecase {
  constructor(private readonly spotifyClient: ISpotifyClient) { }

  public async exec(params: {
    userId: string;
    uris: string[];
    public?: boolean;
    name?: string;
    description?: string;
  }): Promise<void> {
    const playlistId = await this.spotifyClient.createPlaylist(params.userId, {
      name: params.name || 'New playlist',
      description: params.description || 'Playlist created by monflow',
      public: params.public || false,
    });
    await this.spotifyClient.addItemsToPlaylist(playlistId, params.uris);
  }
}