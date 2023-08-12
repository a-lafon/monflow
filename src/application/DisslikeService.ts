import { IDisslikeRepository } from "@/domain/repositories/DisslikeRepository";

export class DisslikeService {
  constructor(private readonly disslikeRepository: IDisslikeRepository) { }

  async add(trackId: string) {
    return await this.disslikeRepository.add(trackId);
  }

  async getAll() {
    return await this.disslikeRepository.getAll();
  }
}
