import DragCard from '@/components/Card/DragCard';
import Layout from '@/components/Layout';
import { Swipe } from '@/enums';
import { useEffect, useRef, useState } from 'react';

const Play = () => {
  const [playlist, setPlaylist] = useState([]);

  const onSwipe = (swipe: Swipe, track: any) => {
    console.log(swipe, track);
    if (swipe === Swipe.Like) {
      return onLike();
    }
    if (swipe === Swipe.Dislike) {
      return onDislike();
    }
    return;
  }

  const onLike = () => {
    console.log('like');
  }

  const onDislike = () => {
    console.log('dislike');
  }

  return (
    <Layout>
      <div className='section'>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-half is-relative'>

              <DragCard
                isActive={true}
                onSwipe={onSwipe}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Play;