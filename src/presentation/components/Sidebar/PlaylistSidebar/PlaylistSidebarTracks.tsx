import usePlaylist from "@/presentation/hooks/usePlaylist";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
import useSound from "@/presentation/hooks/useSound";
import { Track } from "@/domain/models/track";
import { FC, useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";

const PlaylistSidebarTracks = () => {
  const [currentPlayedTrack, setCurrentPlayedTrack] = useState<Track>();
  const [soundUrls, setSoundUrls] = useState<string[]>([]);
  const { playlist, remove, } = usePlaylist();
  const { sound, play, pause, stop, isPlaying } = useSound({ urls: soundUrls });

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

    return setCurrentPlayedTrack(track);
  }

  return (
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
                    className="button is-primary is-outlined  is-inverted is-borderless"
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
                    className="button is-primary is-outlined is-borderless"
                    onClick={() => {
                      if (isTrackPlaying(track)) {
                        stop();
                      }
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
  )
}

export default PlaylistSidebarTracks;
