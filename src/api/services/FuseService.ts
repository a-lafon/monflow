import Fuse from "fuse.js";
import { IFuseService } from "../interfaces/IFuseService";

export class FuseService implements IFuseService {
  public getResults<T>(query: string, array: T[], keys: string[]) {
    const fuse = new Fuse(array, { includeScore: true, keys });
    return fuse.search(query).map((i) => i.item);
  }
}
