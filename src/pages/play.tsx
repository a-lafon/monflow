import DragCard from '@/components/Card/DragCard';
import Layout from '@/components/Layout';
import { Swipe } from '@/enums';
import { Track } from '@/models/track';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import mockedData from '../../mockedData';

const Play = () => {
  const [tracks, setTracks] = useState<Track[]>(mockedData as any);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const activeIndex = tracks.length - 1;

  console.log('activeIndex', activeIndex);
  

  const onSwipe = (swipe: Swipe, track: Track) => {
    console.log('onSwipe', swipe);
    if (swipe === undefined) return;
    setTracks((current) => current.filter((t) => t.id !== track.id))
    if (swipe === Swipe.Like) {
      return onLike(track);
    }
    if (swipe === Swipe.Dislike) {
      return onDislike(track);
    }
    return;
  }

  const onLike = (track: Track) => {
    console.log('like');
    setPlaylist([
      ...playlist,
      track,
    ])
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
                    // tracks.slice().reverse().map((track: any, index: number) => {
                    // console.log(track.name, index);
                    return (
                      <DragCard
                        key={track.id}
                        isActive={index === activeIndex}
                        track={track}
                        onSwipe={onSwipe}
                      />
                    )
                  }
                  )
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

export default Play;