import { IDisslikeRepository } from "@/domain/repositories/DisslikeRepository";

export class DisslikeInLocalStorage implements IDisslikeRepository {
  private readonly key = 'disslikes';

  add(trackId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const disslikes = await this.getAll();
        disslikes.push(trackId);
        localStorage.setItem(this.key, JSON.stringify(disslikes));
        resolve();
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement dans le localStorage : ', error);
        reject();
      }
    })
  }

  getAll(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      try {
        const disslikes = localStorage.getItem(this.key);
        if (disslikes) {
          return resolve(JSON.parse(disslikes));
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