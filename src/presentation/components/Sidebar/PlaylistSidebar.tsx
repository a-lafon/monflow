import { FC, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { SlSocialSpotify } from "react-icons/sl";
import { BsTrash } from "react-icons/bs";
import useAuth from "@/presentation/hooks/useAuth";
import usePlaylist from "@/presentation/hooks/usePlaylist";
import { SlPlaylist } from "react-icons/sl";
import { AiOutlineFieldTime } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import useSound from "@/presentation/hooks/useSound";
import { FaPlay, FaPause } from "react-icons/fa";
import { Track } from "@/domain/models/track";

interface IPlaylistSidebar {
  isOpen: boolean;
  onClose: Function;
}

const PlaylistSidebar: FC<IPlaylistSidebar> = ({ isOpen, onClose }) => {
  const [currentPlayedTrack, setCurrentPlayedTrack] = useState<Track>();
  const [soundUrls, setSoundUrls] = useState<string[]>([]);
  const { isAuth } = useAuth();
  const {
    playlist,
    totalDurationFormatted,
    reset,
    remove,
    register,
    isLoading
  } = usePlaylist();
  const { sound, play, pause, isPlaying } = useSound({ urls: soundUrls });

  useEffect(() => {
    if (currentPlayedTrack && currentPlayedTrack.preview_url) {
      setSoundUrls([currentPlayedTrack.preview_url]);
    }
  }, [currentPlayedTrack])

  useEffect(() => {
    if (sound) {
      play();
    }
  }, [sound])

  const isTrackPlaying = (track: Track) => isPlaying && currentPlayedTrack && currentPlayedTrack.id === track.id;

  const playTrack = (track: Track) => {
    if (!currentPlayedTrack) {
      return setCurrentPlayedTrack(track);
    }

    if (currentPlayedTrack.id === track.id) {
      return play();
    }

    setCurrentPlayedTrack(track);
  }

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
          Pour enregistrer votre playlist vous devez être connecté
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

        <AnimatePresence>
          {
            playlist.map((track: Track) =>
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
                    <div className="buttons">
                      <button
                        disabled={!track.preview_url ? true : false}
                        className="button is-primary"
                        onClick={
                          isTrackPlaying(track)
                            ? () => pause()
                            : () => playTrack(track)
                        }
                      >
                        <span className="icon">
                          {
                            isTrackPlaying(track)
                              ? <FaPause />
                              : <FaPlay />
                          }
                        </span>
                      </button>
                      <button
                        className="button is-primary"
                        onClick={() => {
                          remove(track);
                        }}
                      >
                        <span className="icon">
                          <BsTrash />
                        </span>
                      </button>
                    </div>
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