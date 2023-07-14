import { IDisslikeRepository } from "@/domain/repositories/DisslikeRepository";
import { DisslikeInLocalStorage } from "@/infra/repositories/DisslikeInLocalStorage";

export class DisslikeService {
  constructor(private readonly disslikeRepository: IDisslikeRepository) {}

  async add(trackId: string) {
    return await this.disslikeRepository.add(trackId);
  }

  async getAll() {
    return await this.disslikeRepository.getAll();
  }
}

const disslikeRepository: IDisslikeRepository = new DisslikeInLocalStorage();

export const disslikeService = new DisslikeService(disslikeRepository);