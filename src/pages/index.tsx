import Head from 'next/head'
import Layout from '@/components/Layout'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Howl, Howler } from 'howler';
// import SiriWave from 'siriwave'


function IntersectionObserverWrapper({ children, onIntersection }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersection();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [onIntersection]);

  return <div ref={ref}>{children}</div>;
}


export default function Home() {
  const [sound, setSound] = useState<Howl>();
  const siriwaveRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>();
  // useEffect(() => {
  //   const siriWave = new SiriWave({
  //     container: siriwaveRef.current!,
  //     width: 640,
  //     height: 200,
  //   });
  // }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Faites une action lorsque le component est visible dans la fenêtre d'affichage
        console.log("Component visible!");
        if (sound && !sound.playing()) {
          sound?.play()
        }
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [sound]);

  useEffect(() => {
    console.log('HELLO')
    const howl = new Howl({
      src: ['https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-10.mp3']
    })
    setSound(howl)
  }, [])

  useEffect(() => {
    if (sound) {
      sound.once('load', function () {
        console.log('load', sound.duration());

        // sound.play();
      });

      sound.on('play', () => {
        console.log('play', sound.playing());
      })

      // Fires when the sound finishes playing.
      sound.on('end', function () {
        console.log('end', sound.playing());

        console.log('Finished!');
      });
    }
  }, [sound])

  const fade = () => {
    sound?.rate(1.5)
  }

  const stop = () => {
    sound?.stop();
  }

  const play = () => {
    if (sound && !sound.playing()) {
      sound?.play();
    }
  }

  const onIntersection = (comp) => {
    console.log(comp + ' is visible');
    if (comp === 'Composant 2') {
      new Howl({
        src: ['https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-10.mp3']
      }).play()
    } else {
      new Howl({
        src: ['https://cdns-preview-0.dzcdn.net/stream/c-01ef0c4982c94b86c7c0e6b2a70dde4b-9.mp3']
      }).play()
    }
    // Faites une action lorsque le component est visible dans la fenêtre d'affichage
  };

  return (
    <Layout>
      <div ref={siriwaveRef}></div>
      <div>
        Hello
        <button onClick={fade}>rate</button>
        <button onClick={stop}>stop</button>
        <button onMouseOver={play}>play</button>


        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">John Smith</p>
                <p className="subtitle is-6">@johnsmith</p>
              </div>
            </div>

            <div className="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br />
              <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>



        <div style={{ marginBottom: 800 }}></div>

        {/* <div style={{backgroundColor: 'red', height: 250, width: 250}} ref={ref}>Mon component</div> */}

        <IntersectionObserverWrapper onIntersection={() => onIntersection('component 1')}>
          Composant 1
        </IntersectionObserverWrapper>

        <div style={{ marginBottom: 800 }}></div>

        <IntersectionObserverWrapper onIntersection={() => onIntersection('Composant 2')}>
          Composant 2
        </IntersectionObserverWrapper>

      </div>
    </Layout>
  )
}
