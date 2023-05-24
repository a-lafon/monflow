import useSound from '@/presentation/hooks/useSound';
import { Track } from '@/domain/models/track';
import { removeTrack, setPlaylist } from '@/presentation/redux/features/playlist/playlistSlice';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../common/Layout';
import { LikeService } from '@/application/LikeService';
import { DisslikeService } from '@/application/DisslikeService';
import PlayerContainer from './PlayerContainer';
import DragCardContainer from './DragCardContainer';

interface ISwipe {
  tracks: Track[];
  likeService: LikeService;
  disslikeService: DisslikeService;
}

const Swipe: FC<ISwipe> = ({ likeService, disslikeService, tracks }) => {
  const dispatch = useDispatch();
  const [soundUrls, setSoundUrls] = useState<string[]>([]);
  const { sound, duration, position, play, pause, isPlaying } = useSound({ urls: soundUrls })

  useEffect(() => {
    dispatch(setPlaylist([...tracks].reverse()));
  }, [])

  useEffect(() => {
    if (sound) {
      play();
    }

  }, [sound]);

  const onLike = (track: Track) => {
    likeService.add(track);
  }

  const onDislike = (track: Track) => {
    dispatch(removeTrack(track.id));
    disslikeService.add(track);
  }

  const onTrackChange = (track: Track) => {
    if (track.preview_url) {
      setSoundUrls([track.preview_url]);
    }
  }

  return (
    <Layout hasFooter={false}>
      <div className='section'>
        <div className='container'>
          <div className="columns is-centered">
            <div className="column is-half is-relative">
              <DragCardContainer
                tracks={tracks}
                onLike={onLike}
                onDislike={onDislike}
                onTrackChange={onTrackChange}
              />
            </div>
          </div>
        </div>

        <PlayerContainer
          duration={duration}
          isPlaying={isPlaying}
          position={position}
          play={play}
          pause={pause}
        />

      </div>
    </Layout>
  )
}

export default Swipe;