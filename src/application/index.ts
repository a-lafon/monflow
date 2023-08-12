import { LikeInLocalStorage } from "@/infra/repositories/LikeInLocalStorage";
import { LikeService } from "./LikeService";
import { PlaylistInLocalStorage } from "@/infra/repositories/PlaylistInLocalStorage";
import { PlaylistService } from "./PlaylistService";
import { DisslikeInLocalStorage } from "@/infra/repositories/DisslikeInLocalStorage";
import { DisslikeService } from "./DisslikeService";
import { SearchService } from "./SearchService";

export const services = {
  like: new LikeService(new LikeInLocalStorage()),
  disslike: new DisslikeService(new DisslikeInLocalStorage()),
  playlist: new PlaylistService(new PlaylistInLocalStorage()),
  search: new SearchService(),
}

