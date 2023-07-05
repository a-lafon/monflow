import { Howl } from 'howler';
import { useEffect, useState } from 'react';

interface IUseSound {
  urls: string[];
}

const useSound = ({ urls }: IUseSound) => {
  const [sound, setSound] = useState<Howl>();
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (urls.length === 0) {
      return;
    }

    const howl = new Howl({
      src: urls,
      format: 'mp3',
    });

    let requestId = 0;
    const updatePosition = () => {
      setPosition(Math.round(howl.seek()));
      requestId = requestAnimationFrame(updatePosition);
    };

    howl
      .on('load', () => onLoad(howl))
      .on('play', () => {
        setIsPlaying(true);
        requestId = requestAnimationFrame(updatePosition);
      })
      .on('end', () => onEnd())

    return () => {
      howl.unload();
    };
  }, [urls]);

  const onLoad = (howl: Howl) => {
    setSound(howl);
    setDuration(Math.round(howl.duration()));
  }

  const onEnd = () => {
    setIsPlaying(false);
    unload();
  }

  const play = () => {
    if (sound) {
      sound.play();
    }
  };

  const pause = () => {
    if (sound) {
      setIsPlaying(false);
      sound.pause();
    }
  }

  const stop = () => {
    if (sound) {
      sound.stop();
    }
  };

  const unload = () => {
    if (sound) {
      sound.unload();
      setSound(undefined);
    }
  };

  return { sound, play, stop, unload, duration, position, pause, isPlaying };

};

export default useSound;