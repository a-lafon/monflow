import { FC } from "react";
import Sidebar from "./Sidebar";
import { SlSocialSpotify } from "react-icons/sl";
import { BsTrash } from "react-icons/bs";
import useAuth from "@/presentation/hooks/useAuth";
import usePlaylist from "@/presentation/hooks/usePlaylist";
import { SlPlaylist } from "react-icons/sl";
import { AiOutlineFieldTime } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

interface IPlaylistSidebar {
  isOpen: boolean;
  onClose: Function;
}

const PlaylistSidebar: FC<IPlaylistSidebar> = ({ isOpen, onClose }) => {
  const { isAuth } = useAuth();
  const {
    playlist,
    totalDurationFormatted,
    reset,
    remove,
    register,
    isLoading
  } = usePlaylist();

  return (
    <Sidebar isOpen={isOpen} onClose={() => onClose()}>
      <h2 className="title is-3 has-text-link has-text-centered">Tes coups de coeur</h2>

      <div className="buttons">
        <button
          disabled={!isAuth || playlist.length === 0}
          className={`button is-link is-rounded is-medium ${isLoading ? 'is-loading' : ''}`}
          onClick={() => register()}
        >
          <span className="icon">
            <SlSocialSpotify />
          </span>
          <span>Enregistrer sur Spotify</span>
        </button>
        <button
          className="button is-rounded is-white is-inverted"
          onClick={() => reset()}
        >
          <span className="icon">
            <BsTrash />
          </span>
          <span>Supprimer</span>
        </button>
      </div>

      <div className="mt-4">
        <div className="mb-1">
          <span className="icon-text has-text-link ml-1 mr-3">
            <span className="icon">
              <SlPlaylist />
            </span>
            <span>{playlist.length} titres</span>
          </span>
          <span className="icon-text has-text-link">
            <span className="icon">
              <AiOutlineFieldTime />
            </span>
            <span>{totalDurationFormatted}</span>
          </span>
        </div>
        <AnimatePresence>
          {
            playlist.map((track) =>
              <motion.div
                className="p-2"
                key={track.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src={track.album.images[0].url} alt={track.name} />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p className="m-0">
                        <strong className="has-text-white">{track.name}</strong>
                      </p>
                      <p className="m-0">
                        <small className="has-text-white">{track.artists[0].name}</small>
                      </p>
                    </div>
                  </div>
                  <div className="media-right">
                    <button
                      className="button is-white is-inverted"
                      onClick={() => remove(track)}
                    >
                      <span className="icon">
                        <BsTrash />
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          }
        </AnimatePresence>
      </div>
    </Sidebar >
  )
}

export default PlaylistSidebar;