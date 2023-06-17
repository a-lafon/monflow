import Layout from "@/presentation/components/common/Layout";
import { likeService } from '@/application/LikeService';
import { useEffect, useState } from "react";
import { Track } from "@/domain/models/track";

const Feed = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    (async () => {
      setTracks(await likeService.getAll())
    })()
  }, [])

  console.log('tracks', tracks);

  return (
    <Layout>
      <div className="tabs is-centered">
        <ul>
          <li className="is-active">
            <a>
              <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
              <span>Likes</span>
            </a>
          </li>
          <li>
            <a>
              <span className="icon is-small"><i className="fas fa-music" aria-hidden="true"></i></span>
              <span>Disslikes</span>
            </a>
          </li>
        </ul>
      </div>


      <div className="section">
        <div className="container">
          <div className="columns is-multiline is-mobile">
            {
              tracks.map((track: Track) =>
                <div key={`${track.id}_${track.type}`} className="column is-3-mobile is-2-tablet is-1-desktop">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img className="is-rounded" src={track.album.images[track.album.images.length - 1].url} alt={track.name} />
                    </figure>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Feed;
