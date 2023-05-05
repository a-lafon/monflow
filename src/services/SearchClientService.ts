import { Type } from "@/enums";
import { SearchApiResponse } from "@/pages/api/search";
import queryString from "query-string";

const MAX_TRACKS = 5;

class SearchClientService {

  public static isFullTracks(tracks: SearchApiResponse[]) {
    return tracks.length === MAX_TRACKS;
  }

  public static isTrackAlreadyInList(tracks: SearchApiResponse[], id: string) {
    return tracks.find((t) => t.id === id);
  };

  public static getQueryParams(tracks: SearchApiResponse[]) {
    const seedArtists = SearchClientService.getIdsByTracksType(tracks, Type.Artist)
    const seedTracks = SearchClientService.getIdsByTracksType(tracks, Type.Track)

    const queryParams = queryString.stringify({
      artists: seedArtists.length >= 1 ? seedArtists.toString() : undefined,
      tracks: seedTracks.length >= 1 ? seedTracks.toString() : undefined,
    }, {
      arrayFormat: 'comma',
    });

    return queryParams;
  }

  private static getIdsByTracksType(tracks: SearchApiResponse[], type: Type) {
    return tracks.filter((t) => t.type === type).map((t) => t.id);
  }
}

export default SearchClientService;
