import { Track } from "@/domain/models/track";
import { IPlaylistRepository } from "@/domain/repositories/PlaylistRepository";
import { PlaylistInLocalStorage } from "@/infra/repositories/PlaylistInLocalStorage";

export class PlaylistService {
  constructor(private readonly playlistRepository: IPlaylistRepository) {}

  async add(track: Track) {
    return await this.playlistRepository.add(track);
  }

  async getAll() {
    return await this.playlistRepository.getAll();
  }

  async remove(id: string) {
    return await this.playlistRepository.remove(id);
  }

  async removeAllTracks() {
    return await this.playlistRepository.removeAll();
  }
}

const playlistRepository = new PlaylistInLocalStorage();

export const playlistService = new PlaylistService(playlistRepository);
