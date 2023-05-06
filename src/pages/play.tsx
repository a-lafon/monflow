import DragCard from '@/components/Card/DragCard';
import Layout from '@/components/Layout';
import { Swipe } from '@/enums';
import useSound from '@/hooks/useSound';
import { Track } from '@/models/track';
import { addTrack } from '@/redux/features/playlist/playlistSlice';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import queryString from 'query-string';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IPlay {
  data: Track[];
}

const Play: FC<IPlay> = ({ data }) => {
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  // const [soundUrl, setSoundUrl] = useState<string>('');
  const [sound, setSound] = useState<Howl>();
  const [isPlaying, setIsPlaying] = useState(false);
  const activeIndex = tracks.length - 1;

  useEffect(() => {
    console.log('DATA received', data);
    if (tracks.length === 0) {
      setTracks(data);
    }
  }, [data])


  useEffect(() => {
    console.log(activeIndex);
    if (!tracks[activeIndex]) {
      return;
    }
    const currentTrak = tracks[activeIndex];
    console.log(currentTrak.preview_url);

    if (currentTrak.preview_url) {
      const howl = new Howl({
        src: currentTrak.preview_url,
        format: 'mp3',
      });
      setSound(howl);
    }
  }, [activeIndex])

  useEffect(() => {
    console.log('sound change', sound);
    if (!sound) {
      return;
    }

    sound
      .once('load', () => playSound(sound))
      .on('end', () => unloadSound(sound));

    return () => {
      if (sound && sound.playing() === true) {
        unloadSound(sound);
      }
    }
  }, [sound])

  const playSound = (sound: Howl) => {
    console.log('playsound');
    setIsPlaying(true);
    sound.play();
  }

  const unloadSound = (sound: Howl) => {
    console.log('unloadSound');
    setIsPlaying(false);
    sound.unload();
    setSound(undefined);
  }

  const onSwipe = (swipe: Swipe, track: Track) => {
    console.log('onSwipe', swipe);
    if (swipe === undefined) {
      return;
    }
    if (sound) {
      unloadSound(sound);
    }
    setTracks((current) => current.filter((t) => t.id !== track.id))
    if (swipe === Swipe.Like) {
      return onLike(track);
    }
    if (swipe === Swipe.Dislike) {
      return onDislike(track);
    }
  }

  const onLike = (track: Track) => {
    console.log('like');
    setPlaylist([
      ...playlist,
      track,
    ]);
    dispatch(addTrack(track));
  }

  const onDislike = (track: Track) => {
    console.log('dislike');
  }

  return (
    <Layout>
      <div className='section'>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-half is-relative'>
              <AnimatePresence >
                {
                  tracks.map((track: any, index: number) => {
                    const isActive = index === activeIndex;
                    return (
                      <DragCard
                        key={track.id}
                        isActive={isActive}
                        track={track}
                        onSwipe={onSwipe}
                        isPlaying={isActive && isPlaying}
                      />
                    )
                  })
                }
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>

      <div className='section'>
        <div className='container'>
          {
            playlist.map((p) => (
              <div key={p.id}>{p.name}</div>
            ))
          }
        </div>
      </div>
    </Layout>
  )
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

    const url = 'http://localhost:3000/api/generate';

    const { data } = await axios.get<Track[]>(`${url}?${queryParams}`);

    return {
      props: { data },
    };
  } catch (error) {
    console.error(error)
  }
}

export default Play;