import { Artist } from "@/domain/models/artist";
import { Track } from "@/domain/models/track";
import { ISpotifyClient } from "../interfaces/SpotifyClient";
import { SearchUsecase } from "./SearchUsecase";

const artistsMock: Artist[] = [
  {
    external_urls: {
      spotify: '',
    },
    followers: {
      total: 0,
    },
    genres: [
      "belgian hip hop",
      "french hip hop",
    ],
    href: "",
    id: "artist-id",
    images: [
      {
        height: 640,
        url: "https://img-url",
        width: 640,
      },
      {
        height: 320,
        url: "https://img-url",
        width: 320,
      },
      {
        height: 160,
        url: "https://img-url",
        width: 160,
      },
    ],
    name: "Romeo elvis",
    popularity: 52,
    type: "artist",
    uri: "spotify:artist:1mMUzAMrNqoTHgtxA0dZi6",
  },
  {
    external_urls: {
      spotify: '',
    },
    followers: {
      total: 0,
    },
    genres: [
      "belgian hip hop",
      "french hip hop",
    ],
    href: "",
    id: "artist-id",
    images: [],
    name: "Cabellero Jean jass",
    popularity: 52,
    type: "artist",
    uri: "spotify:artist:1mMUzAMrNqoTHgtxA0dZi6",
  }
];
const tracksMock: Track[] = [
  {
    album: {
      album_type: "album",
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/1Yfe3ONJlioHys7jwHdfVm",
          },
          href: "https://api.spotify.com/v1/artists/1Yfe3ONJlioHys7jwHdfVm",
          id: "1Yfe3ONJlioHys7jwHdfVm",
          name: "Lomepal",
          type: "artist",
          uri: "spotify:artist:1Yfe3ONJlioHys7jwHdfVm",
        },
      ],
      available_markets: ['FR'],
      external_urls: {
        spotify: "https://open.spotify.com/album/0n4P6BsuT61HgsKExU0i1R",
      },
      href: "https://api.spotify.com/v1/albums/0n4P6BsuT61HgsKExU0i1R",
      id: "0n4P6BsuT61HgsKExU0i1R",
      images: [
        {
          height: 640,
          url: "https://i.scdn.co/image/ab67616d0000b27300c0bba714d6c46e47ab1d07",
          width: 640,
        },
        {
          height: 300,
          url: "https://i.scdn.co/image/ab67616d00001e0200c0bba714d6c46e47ab1d07",
          width: 300,
        },
        {
          height: 64,
          url: "https://i.scdn.co/image/ab67616d0000485100c0bba714d6c46e47ab1d07",
          width: 64,
        },
      ],
      name: "Jeannine",
      release_date: "2018-12-07",
      release_date_precision: "day",
      total_tracks: 17,
      type: "album",
      uri: "spotify:album:0n4P6BsuT61HgsKExU0i1R",
    },
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/1Yfe3ONJlioHys7jwHdfVm",
        },
        href: "https://api.spotify.com/v1/artists/1Yfe3ONJlioHys7jwHdfVm",
        id: "1Yfe3ONJlioHys7jwHdfVm",
        name: "Lomepal",
        type: "artist",
        uri: "spotify:artist:1Yfe3ONJlioHys7jwHdfVm",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/2pHk4wAmL7ofTAuvCIUWtv",
        },
        href: "https://api.spotify.com/v1/artists/2pHk4wAmL7ofTAuvCIUWtv",
        id: "2pHk4wAmL7ofTAuvCIUWtv",
        name: "Roméo Elvis",
        type: "artist",
        uri: "spotify:artist:2pHk4wAmL7ofTAuvCIUWtv",
      },
    ],
    available_markets: ['FR'],
    disc_number: 1,
    duration_ms: 235906,
    explicit: true,
    external_ids: {
      isrc: "FR9W11811018",
    },
    external_urls: {
      spotify: "https://open.spotify.com/track/6l7PqWKsgm4NLomOE7Veou",
    },
    href: "https://api.spotify.com/v1/tracks/6l7PqWKsgm4NLomOE7Veou",
    id: "6l7PqWKsgm4NLomOE7Veou",
    is_local: false,
    name: "1000°C",
    popularity: 64,
    preview_url: "https://p.scdn.co/mp3-preview/2f484fa09dcd8595def3774be415815b9454ed24?cid=40c2a2ce43a643a984ca1ef6bf7ed8ad",
    track_number: 5,
    type: "track",
    uri: "spotify:track:6l7PqWKsgm4NLomOE7Veou",
  }
] as Track[];

describe('SearchUsecase', () => {
  let searchUsecase: SearchUsecase;
  let spotifyClient: ISpotifyClient;
  
  beforeEach(() => {
    spotifyClient = {} as ISpotifyClient;
    spotifyClient.search = jest.fn();

    searchUsecase = new SearchUsecase(spotifyClient);
  })
  
  describe('exec', () => {
    it('shoud return search results', async () => {
      /* Given */
      const query = 'romeo elvis';
      jest.spyOn(spotifyClient, 'search').mockImplementation(() => Promise.resolve({
        artists: {
          href: '',
          items: artistsMock,
          limit: 20,
          next: '',
          offset: 0,
          total: 2,
        },
        tracks: {
          href: '',
          items: tracksMock,
          limit: 20,
          next: '',
          offset: 0,
          total: 1,
        },
      }))

      /* When */
      const results = await searchUsecase.exec(query);

      /* Then */
      expect(results).toBeDefined();
      expect(results).toHaveProperty('length');
      expect(results.length).toBe(2);
    })
  })
})