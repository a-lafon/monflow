import { services } from '@/application';
import config from '@/config';
import { Track } from '@/domain/models/track';
import Swipe from '@/presentation/components/Swipe';
import Layout from '@/presentation/components/common/Layout';
import usePlaylist from '@/presentation/hooks/usePlaylist';
import axios from 'axios';
import queryString from 'query-string';
import { FC, useEffect, useState } from 'react';

const SwipePage: FC<{ tracks: Track[] }> = ({ tracks }) => {
  const [tracksWithoutDisslikes, setTracksWithoutDislikes] = useState<Track[]>([]);
  const { playlist } = usePlaylist();

  useEffect(() => {
    (async () => {
      const playlistIds = new Set(playlist.map(p => p.id));
      const disslikes = new Set(await services.disslike.getAll());
      setTracksWithoutDislikes(tracks.filter(track => !disslikes.has(track.id) && !playlistIds.has(track.id)));
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
    likeService={services.like}
    disslikeService={services.disslike}
  />
}

export async function getServerSideProps(context: any) {
  try {
    const artists: string = context.query.artists;
    const tracks: string = context.query.tracks;

    const queryParams = queryString.stringify({
      artists,
      tracks,
    }, {
      arrayFormat: 'comma',
    });

    const url = `${config.apiUrl}/recommendations`;

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