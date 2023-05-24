import { Track } from "@/domain/models/track";
import { ILikeRepository } from "@/domain/repositories/LikeRepository";

export class LikeInLocalStorage implements ILikeRepository {
  private readonly key = 'likes';

  add(track: Track): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const likes = await this.getAll();
        likes.push(track);
        localStorage.setItem(this.key, JSON.stringify(likes));


        let totalSize = 0;

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i) || '';
          const value = localStorage.getItem(key) || '';
          const itemSize = key.length + value.length;
          totalSize += itemSize;
        }

        console.log('Taille totale du localStorage :', totalSize, 'octets');
        const totalSizeInMB = (totalSize / 1048576).toFixed(2);

        console.log('Taille totale du localStorage :', totalSizeInMB, 'Mo');
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
        const likes = localStorage.getItem(this.key);
        if (likes) {
          return resolve(JSON.parse(likes));
        }
        resolve([]);
      } catch (error) {
        console.error('Erreur lors de la récupération dans le localStorage : ', error);
        reject();
      }
    })
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}