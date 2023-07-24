import { RootState } from "@/presentation/redux/store";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { SlSocialSpotify } from "react-icons/sl";
import { BsTrash } from "react-icons/bs";
import useAuth from "@/presentation/hooks/useAuth";
import { removeTrack, setPlaylist } from '@/presentation/redux/features/playlist/playlistSlice';
import { SlPlaylist } from "react-icons/sl";
import { AiOutlineFieldTime } from "react-icons/ai";
import axios from "axios";
import { routes } from "@/config/routes";

interface IPlaylistSidebar {
  isOpen: boolean;
  onClose: Function;
}

const PlaylistSidebar: FC<IPlaylistSidebar> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const playlist = useSelector((state: RootState) => state.playlist.playlist);
  const { isAuth } = useAuth();
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    setTotalDuration(playlist.reduce((acc, obj) => acc + obj.duration_ms, 0));
  }, [playlist]);

  const register = async () => {
    console.log(playlist.map((p) => p.uri));
    try {
      const resp = await axios.post(routes.CREATE_PLAYLIST, {
        uris: playlist.map((p) => p.uri)
      })
      console.log(resp);
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Sidebar isOpen={isOpen} onClose={() => onClose()}>
      <h2 className="title is-3 has-text-link has-text-centered">Tes coups de coeur</h2>

      <div className="buttons">
        <button
          disabled={!isAuth}
          className="button is-link is-rounded is-medium"
          onClick={() => register()}
        >
          <span className="icon">
            <SlSocialSpotify />
          </span>
          <span>Enregistrer sur Spotify</span>
        </button>
        <button
          className="button is-rounded is-white is-inverted"
          onClick={() => dispatch(setPlaylist([]))}
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
            <span>{formatDuration(totalDuration)}</span>
          </span>
        </div>
        {
          playlist.map((track) =>
            <div key={track.id} className="p-2">
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
                    onClick={() => dispatch(removeTrack(track.id))}
                  >
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

const formatDuration = (duration_ms: number): string => {
  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;

  const hours = Math.floor(duration_ms / millisecondsInHour);
  duration_ms %= millisecondsInHour;

  const minutes = Math.floor(duration_ms / millisecondsInMinute);

  let formattedDuration = '';
  if (hours > 0) {
    formattedDuration += `${hours}h`;
  }
  if (minutes > 0) {
    formattedDuration += `${minutes}min`;
  }

  return formattedDuration;
}


export default PlaylistSidebar;