import { Track } from "@/domain/models/track";
import { AnimatePresence } from "framer-motion";
import { FC, useEffect, useState } from "react";
import DragCard from "./DragCard";
import { SwipeType } from "@/domain/enums";

interface IDragCardContainer {
  tracks: Track[];
  onLike(track: Track): void;
  onDislike(track: Track): void;
  onTrackChange(track: Track): void;
}

const DragCardContainer: FC<IDragCardContainer> = ({ onLike, onDislike, onTrackChange, ...props }) => {
  const [tracks, setTracks] = useState<Track[]>(props.tracks);
  const activeIndex = tracks.length - 1;

    useEffect(() => {
    console.log(activeIndex);
    if (!tracks[activeIndex]) {
      return;
    }
    const currentTrak = tracks[activeIndex];
    console.log('currentTrak', currentTrak);
    onTrackChange(currentTrak);
  }, [activeIndex])

  const onSwipe = (swipe: SwipeType, track: Track) => {
    console.log('onSwipe', swipe);
    if (swipe === undefined) {
      return;
    }

    setTracks((current) => current.filter((t) => t.id !== track.id))

    if (swipe === SwipeType.Like) {
      return onLike(track);
    }

    if (swipe === SwipeType.Dislike) {
      return onDislike(track);
    }
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
            />
          )
        })
      }
    </AnimatePresence>
  )
}

export default DragCardContainer;