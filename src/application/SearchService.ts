import { routes } from "@/config/routes";
import { EntityType } from "@/domain/enums";
import { SearchResult } from "@/domain/models/search";
import queryString from "query-string";

const MAX_TRACKS = 5;

export class SearchService {
  public isFullTracks(results: SearchResult[]) {
    return results.length === MAX_TRACKS;
  }

  public isResultAlreadyInList(results: SearchResult[], id: string) {
    return results.find((t) => t.id === id);
  };

  public getSwipeRoute(results: SearchResult[]): string {
    const queryParams = this.getQueryParams(results);
    return `${routes.SWIPE}${queryParams ? '?' + queryParams : ''}`;
  }

  private getQueryParams(results: SearchResult[]) {
    const seedArtists = this.getIdsByEntityType(results, EntityType.Artist)
    const seedTracks = this.getIdsByEntityType(results, EntityType.Track)

    const queryParams = queryString.stringify({
      artists: seedArtists.length >= 1 ? seedArtists.toString() : undefined,
      tracks: seedTracks.length >= 1 ? seedTracks.toString() : undefined,
    }, {
      arrayFormat: 'comma',
    });

    return queryParams;
  }

  private getIdsByEntityType(results: SearchResult[], type: EntityType) {
    return results.filter((t) => t.type === type).map((t) => t.id);
  }
}
