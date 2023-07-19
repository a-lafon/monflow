import { Track } from "@/domain/models/track";
import { ISpotifyClient } from "../../interfaces/SpotifyClient";
import { GetRecommendationsUsecase } from "../../usecases/GetRecommendationsUsecase";

describe('GetRecommendationsUsecase', () => {
  describe('exec', () => {
    let getRecommendationsUsecase: GetRecommendationsUsecase;
    let spotifyClient: ISpotifyClient;

    beforeEach(() => {
      spotifyClient = {} as ISpotifyClient;
      spotifyClient.recommandations = jest.fn();

      getRecommendationsUsecase = new GetRecommendationsUsecase(spotifyClient);
    })

    it('should return recommendations', async () => {
      /* Given */
      const params = {
        seedArtists: ['the blaze'],
        seedGenres: ['electro'],
        seedTracks: ['trackId'],
      };

      jest.spyOn(spotifyClient, 'recommandations').mockImplementation(() => Promise.resolve({
        tracks: [
          {
            album: {
              album_group: "ALBUM",
              album_type: "ALBUM",
              artists: [
                {
                  external_urls: {
                    spotify: "https://open.spotify.com/artist/1WjBIvYAnZTkTh5UiZNwlR",
                  },
                  href: "https://api.spotify.com/v1/artists/1WjBIvYAnZTkTh5UiZNwlR",
                  id: "1WjBIvYAnZTkTh5UiZNwlR",
                  name: "Oliver Koletzki",
                  type: "artist",
                  uri: "spotify:artist:1WjBIvYAnZTkTh5UiZNwlR",
                },
              ],
              available_markets: ['FR'],
              external_urls: {
                spotify: "https://open.spotify.com/album/6mM6lqJGzNcEB1PBwZHYAo",
              },
              href: "https://api.spotify.com/v1/albums/6mM6lqJGzNcEB1PBwZHYAo",
              id: "6mM6lqJGzNcEB1PBwZHYAo",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab67616d0000b27315be104fbc9ce0b6fb09b832",
                  width: 640,
                },
                {
                  height: 300,
                  url: "https://i.scdn.co/image/ab67616d00001e0215be104fbc9ce0b6fb09b832",
                  width: 300,
                },
                {
                  height: 64,
                  url: "https://i.scdn.co/image/ab67616d0000485115be104fbc9ce0b6fb09b832",
                  width: 64,
                },
              ],
              name: "Großstadtmärchen",
              release_date: "2009-09-04",
              release_date_precision: "day",
              total_tracks: 9,
              type: "album",
              uri: "spotify:album:6mM6lqJGzNcEB1PBwZHYAo",
            },
            artists: [
              {
                external_urls: {
                  spotify: "https://open.spotify.com/artist/1WjBIvYAnZTkTh5UiZNwlR",
                },
                href: "https://api.spotify.com/v1/artists/1WjBIvYAnZTkTh5UiZNwlR",
                id: "1WjBIvYAnZTkTh5UiZNwlR",
                name: "Oliver Koletzki",
                type: "artist",
                uri: "spotify:artist:1WjBIvYAnZTkTh5UiZNwlR",
              },
            ],
            available_markets: ['FR'],
            disc_number: 1,
            duration_ms: 340560,
            explicit: false,
            external_ids: {
              isrc: "DEKN60900180",
            },
            external_urls: {
              spotify: "https://open.spotify.com/track/0V2GX0aukyZMt6nSMxfOJk",
            },
            href: "https://api.spotify.com/v1/tracks/0V2GX0aukyZMt6nSMxfOJk",
            id: "0V2GX0aukyZMt6nSMxfOJk",
            is_local: false,
            name: "Hypnotized",
            popularity: 59,
            preview_url: "https://p.scdn.co/mp3-preview/99f06b239e3cd087bda130366804cb744be8b19e?cid=40c2a2ce43a643a984ca1ef6bf7ed8ad",
            track_number: 6,
            type: "track",
            uri: "spotify:track:0V2GX0aukyZMt6nSMxfOJk",
          },
          {
            id: "0V2GX0aukyZMt6nSMxfOJk",
            type: "track",
          }
        ] as Track[],
        seeds: [
          {
            initialPoolSize: 500,
            afterFilteringSize: 500,
            afterRelinkingSize: 500,
            id: "artist-id",
            type: "ARTIST",
            href: "https://api.spotify.com/v1/artists/artist-id",
          },
        ],
      }))

      /* When */
      const recommandations = await getRecommendationsUsecase.exec(params);

      /* Then */
      expect(recommandations).toBeDefined();
      expect(recommandations).toHaveProperty('length');
      expect(recommandations.length).toBe(1);
      expect(recommandations[0].available_markets).toBeUndefined();
      expect(recommandations[0].preview_url).toBe('https://p.scdn.co/mp3-preview/99f06b239e3cd087bda130366804cb744be8b19e?cid=40c2a2ce43a643a984ca1ef6bf7ed8ad');
      expect(recommandations[0].artists).toHaveProperty('length');
    })

    it('should throw an error cause seeds are greater than max seeds', async () => {
      /* Given */
      const params = {
        seedArtists: ['artist1', 'artist2', 'artist3'],
        seedGenres: ['electro'],
        seedTracks: ['trackId1', 'trackId2', 'trackId3'],
      }
  
      /* When */
      const recommandations = getRecommendationsUsecase.exec(params);

      /* Then */
      await expect(recommandations).rejects.toThrowError();
    })
  })
})