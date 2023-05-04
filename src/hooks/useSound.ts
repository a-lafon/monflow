import { Howl, Howler } from 'howler';
import { useEffect, useState } from 'react';

const useSound = (urls: string[]) => {
  const [sound, setSound] = useState<Howl>();


  useEffect(() => {
    console.log('urls', urls);
    
    const howl = new Howl({
      src: urls,
      format: 'mp3',
    });
    setSound(howl)

    return () => {
      howl.unload();
    };
  }, urls);

  const play = () => {
    if (sound) {
      console.log('play', sound);
      sound.play();
    }
  };

  const stop = () => {
    sound?.stop();
  };

  const isPlaying = (sound && sound.playing()) || false;

  console.log(isPlaying);


  return [sound, play, stop, isPlaying];
};

export default useSound;