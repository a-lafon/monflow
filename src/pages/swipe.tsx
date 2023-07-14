import { disslikeService } from '@/application/DisslikeService';
import { likeService } from '@/application/LikeService';
import { Track } from '@/domain/models/track';
import Swipe from '@/presentation/components/Swipe';
import Layout from '@/presentation/components/common/Layout';
import axios from 'axios';
import queryString from 'query-string';
import { FC, useEffect, useState } from 'react';

const SwipePage: FC<{ tracks: Track[] }> = ({ tracks }) => {
  const [tracksWithoutDisslikes, setTracksWithoutDisllikes] = useState<Track[]>([]);

  useEffect(() => {
    (async () => {
      // TODO: filtrer aussi les likes pour eviter qu'ils soient dans la playlist
      const disslikes = await disslikeService.getAll();
      setTracksWithoutDisllikes(tracks.filter((track) => !disslikes.includes(track.id)));
    })()
  }, [tracks]);

  if (tracksWithoutDisslikes.length === 0) {
    return <Layout hasFooter={false}>
      <div className='has-text-white has-text-centered mt-6'>
        Aucun résultats trouvés
      </div>
    </Layout>
  }

  return <Swipe
    tracks={tracksWithoutDisslikes}
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
    console.error(error);
    context.res.writeHead(301, { Location: '/' })
    context.res.end()
  }
}

export default SwipePage;