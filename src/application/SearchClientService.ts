import { ISearchResponse } from "@/api/interfaces/Search";
import { EntityType } from "@/domain/enums";
import queryString from "query-string";

const MAX_TRACKS = 5;

class SearchClientService {

  public static isFullTracks(tracks: ISearchResponse[]) {
    return tracks.length === MAX_TRACKS;
  }

  public static isTrackAlreadyInList(tracks: ISearchResponse[], id: string) {
    return tracks.find((t) => t.id === id);
  };

  public static getQueryParams(tracks: ISearchResponse[]) {
    const seedArtists = SearchClientService.getIdsByTracksType(tracks, EntityType.Artist)
    const seedTracks = SearchClientService.getIdsByTracksType(tracks, EntityType.Track)

    const queryParams = queryString.stringify({
      artists: seedArtists.length >= 1 ? seedArtists.toString() : undefined,
      tracks: seedTracks.length >= 1 ? seedTracks.toString() : undefined,
    }, {
      arrayFormat: 'comma',
    });

    return queryParams;
  }

  private static getIdsByTracksType(tracks: ISearchResponse[], type: EntityType) {
    return tracks.filter((t) => t.type === type).map((t) => t.id);
  }
}

export default SearchClientService;
