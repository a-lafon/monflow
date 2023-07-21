import { RootState } from "@/presentation/redux/store";
import { FC } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { SlSocialSpotify } from "react-icons/sl";
import { BsTrash } from "react-icons/bs";
import useAuth from "@/presentation/hooks/useAuth";

interface IPlaylistSidebar {
  isOpen: boolean;
  onClose: Function;
}

const PlaylistSidebar: FC<IPlaylistSidebar> = ({ isOpen, onClose }) => {
  const playlist = useSelector((state: RootState) => state.playlist.playlist);
  const { isAuth } = useAuth();

  return (
    <Sidebar isOpen={isOpen} onClose={() => onClose()}>
      <h2 className="title is-3 has-text-white">Tes coups de coeur</h2>
      <button className="button is-link is-rounded is-medium" disabled={!isAuth}>
        <span className="icon">
          <SlSocialSpotify />
        </span>
        <span>Enregistrer</span>
      </button>

      <div className="mt-4">
        {
          playlist.map((t) =>
            <div key={t.id} className="p-2">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img src={t.album.images[0].url} alt={t.name} />
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p className="m-0">
                      <strong className="has-text-white">{t.name}</strong>
                    </p>
                    <p className="m-0">
                      <small className="has-text-white">{t.artists[0].name}</small>
                    </p>
                  </div>
                </div>
                <div className="media-right">
                  <button className="button is-danger is-small">
                    <span className="icon">
                      <BsTrash />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </Sidebar>
  )
}

export default PlaylistSidebar;