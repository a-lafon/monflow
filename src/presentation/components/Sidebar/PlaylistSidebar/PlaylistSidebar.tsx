import { FC } from "react";
import Sidebar from "../Sidebar";
import { SlSocialSpotify } from "react-icons/sl";
import { BsTrash } from "react-icons/bs";
import useAuth from "@/presentation/hooks/useAuth";
import usePlaylist from "@/presentation/hooks/usePlaylist";
import { SlPlaylist } from "react-icons/sl";
import { AiOutlineFieldTime } from "react-icons/ai";
import PlaylistSidebarTracks from "./PlaylistSidebarTracks";

const PlaylistSidebar: FC<{
  isOpen: boolean;
  onClose: Function;
}> = ({ isOpen, onClose }) => {
  const { isAuth } = useAuth();
  const {
    playlist,
    totalDurationFormatted,
    reset,
    register,
    isLoading
  } = usePlaylist();

  return (
    <Sidebar isOpen={isOpen} onClose={() => onClose()}>
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
      </div>

      {
        !isAuth && <div className="notification is-primary">
          Pour enregistrer votre playlist vous devez être connecté à votre compte spotify
        </div>
      }

      <div>
        <div className="media p-2">
          <div className="media-content">
            <span className="icon-text has-text-link mr-3">
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
          <div className="media-right">
            <button
              className="button is-link is-outlined"
              onClick={() => reset()}
            >
              <span className="icon">
                <BsTrash />
              </span>
              <span>Vider</span>
            </button>
          </div>
        </div>

        <PlaylistSidebarTracks />
      </div>
    </Sidebar >
  )
}

export default PlaylistSidebar;