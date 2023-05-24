import { disslikeService } from '@/application/DisslikeService';
import { likeService } from '@/application/LikeService';
import { Track } from '@/domain/models/track';
import Swipe from '@/presentation/components/Swipe';
import axios from 'axios';
import queryString from 'query-string';
import { FC } from 'react';

const SwipePage: FC<{ tracks: Track[] }> = ({ tracks }) => {
  return <Swipe
    tracks={tracks}
    likeService={likeService}
    disslikeService={disslikeService}
  />
}

export async function getServerSideProps(context: any) {
  try {
    const artists: string = context.query.artists;
    const tracks: string = context.query.tracks;
    // const genres: string = context.query.genres;

    const queryParams = queryString.stringify({
      artists,
      tracks,
    }, {
      arrayFormat: 'comma',
    });

    const url = 'http://localhost:3000/api/recommendations';

    const { data } = await axios.get<Track[]>(`${url}?${queryParams}`);

    return {
      props: { tracks: data },
    };
  } catch (error) {
    console.error(error)
  }
}

export default SwipePage;