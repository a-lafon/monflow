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
  onRefresh(track: Track): void;
}

const DragCardContainer: FC<IDragCardContainer> = ({ onLike, onDislike, onTrackChange, onRefresh, ...props }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const activeIndex = tracks.length - 1;

  useEffect(() => {
    setTracks(props.tracks);
  }, [props.tracks])

  useEffect(() => {
    if (!tracks[activeIndex]) {
      return;
    }
    const currentTrak = tracks[activeIndex];
    console.log('currentTrak', currentTrak);
    onTrackChange(currentTrak);
  }, [activeIndex])

  const onSwipe = (swipe: SwipeType, track: Track) => {
    console.log('onSwipe', swipe, track);
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
              onRefresh={onRefresh}
            />
          )
        })
      }
    </AnimatePresence>
  )
}

export default DragCardContainer;