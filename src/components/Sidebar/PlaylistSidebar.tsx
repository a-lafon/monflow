import { RootState } from "@/redux/store";
import { FC } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

interface IPlaylistSidebar {
  isOpen: boolean;
  onClose: Function;
}

const PlaylistSidebar: FC<IPlaylistSidebar> = ({ isOpen, onClose }) => {
  const tracks = useSelector((state: RootState) => state.playlist.tracks);

  return (
    <Sidebar isOpen={isOpen} onClose={() => onClose()}>
      <h2 className="title is-4 text<-primary">Tes coups de coeur</h2>
      <button className="button is-link">Sauvegarder</button>
      <div>
        {
          tracks.map((t) =>
            <div key={t.id} className="box mb-2 p-4">
              <article className="media">
                <div className="media-left">
                  <figure className="image is-32x32">
                    <img src={t.album.images[0].url} alt={t.name} />
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong className="has-text-primary">{t.name}</strong> <small>@{t.artists[0].name}</small>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          )
        }
      </div>
    </Sidebar>
  )
}

export default PlaylistSidebar;