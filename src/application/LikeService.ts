import { Track } from "@/domain/models/track";
import { ILikeRepository } from "@/domain/repositories/LikeRepository";
import { LikeInLocalStorage } from "@/infra/repositories/LikeInLocalStorage";

export class LikeService {
  constructor(private readonly likeRepository: ILikeRepository) {}

  async add(track: Track) {
    return await this.likeRepository.add(track);
  }

  async getAll() {
    return await this.likeRepository.getAll();
  }
}

const likeRepository = new LikeInLocalStorage();

export const likeService = new LikeService(likeRepository);
