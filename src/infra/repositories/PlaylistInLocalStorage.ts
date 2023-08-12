import { Track } from "@/domain/models/track";
import { IPlaylistRepository } from "@/domain/repositories/PlaylistRepository";

export class PlaylistInLocalStorage implements IPlaylistRepository {
  private readonly key = 'playlist';

  add(track: Track): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const playlist = await this.getAll();
        playlist.push(track);
        localStorage.setItem(this.key, JSON.stringify(playlist));
        resolve();
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement dans le localStorage : ', error);
        reject();
      }
    })
  }

  getAll(): Promise<Track[]> {
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(localStorage.getItem(this.key) || '[]'));
      } catch (error) {
        console.error('Erreur lors de la récupération dans le localStorage : ', error);
        reject();
      }
    })
  }

  remove(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const playlist = await this.getAll();
        localStorage.setItem(this.key, JSON.stringify(playlist.filter((track) => track.id !== id)));
        resolve();
      } catch (error) {
        console.error('Erreur lors de la suppresion dans le localStorage : ', error);
        reject();
      }
    })
  }

  removeAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(this.key, JSON.stringify([]));
        resolve();
      } catch (error) {
        console.error('Erreur lors de la suppresion dans le localStorage : ', error);
        reject();
      }
    })
  }
}