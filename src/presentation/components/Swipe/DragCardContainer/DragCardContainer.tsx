import { Track } from "@/domain/models/track";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import DragCard from "./DragCard";
import { SwipeType } from "@/domain/enums";
import { FiRefreshCcw } from "react-icons/fi";

interface IDragCardContainer {
  tracks: Track[];
  onLike(track: Track): void;
  onDislike(track: Track): void;
  onTrackChange(track: Track): void;
  onRefresh(track: Track): void;
}

const DragCardContainer: FC<IDragCardContainer> = ({ onLike, onDislike, onTrackChange, onRefresh, ...props }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [dislikedTrackIds, setDisslikedTrackIds] = useState<string[]>([]);
  const [lastTrackLiked, setLastTrackLiked] = useState<Track>();
  const activeIndex = tracks.length - 1;

  useEffect(() => {
    setTracks(props.tracks);
  }, [props.tracks])

  useEffect(() => {
    if (!tracks[activeIndex]) {
      return;
    }
    const currentTrak = tracks[activeIndex];
    onTrackChange(currentTrak);
  }, [activeIndex])

  const onSwipe = (swipe: SwipeType, track: Track) => {
    console.log('onSwipe', swipe, track);
    if (swipe === undefined) {
      return;
    }

    setTracks((current) => current.filter((t) => t.id !== track.id))

    if (swipe === SwipeType.Like) {
      setLastTrackLiked(track);
      return onLike(track);
    }

    if (swipe === SwipeType.Dislike) {
      setDisslikedTrackIds([...dislikedTrackIds, track.id]);
      return onDislike(track);
    }
  }

  if (tracks.length === 0) {
    const tracksWithoutDisslikes = props.tracks.filter((track) => dislikedTrackIds.includes(track.id));
    const randomIndex = Math.floor(Math.random() * tracksWithoutDisslikes.length);
    const track = lastTrackLiked || tracksWithoutDisslikes[randomIndex];
    return (
      <div className="mt-6 has-text-centered">
        <motion.button
          className="button is-large is-rounded is-link"
          initial={{scale: 0.9}}
          animate={{ scale: 1.2 }}
          transition={{ type: "spring", duration: .8 }}
          onClick={() => onRefresh(track)}
        >
          <span className="icon is-large">
            <FiRefreshCcw />
          </span>
          <span>Continuer</span>
        </motion.button>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {
        tracks.map((track: any, index: number) => {
          const isActive = index === activeIndex;
          return (
            <DragCard
              key={track.id}
              isActive={isActive}
              track={track}
              onSwipe={onSwipe}
              onRefresh={onRefresh}
            />
          )
        })
      }
    </AnimatePresence>
  )
}

export default DragCardContainer;