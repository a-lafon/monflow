import { SwipeType } from "@/domain/enums";
import { Track } from "@/domain/models/track";
import { motion, PanInfo } from "framer-motion";
import { FC, useState } from "react";
import DragCardItem from "./DragCardItem";

interface IDragCard {
  isActive: boolean;
  track: Track;
  onSwipe(swipeType: SwipeType | undefined, track: Track): void;
}

const DragCard: FC<IDragCard> = ({ isActive, onSwipe, track }) => {
  const [swipe, setSwipe] = useState<SwipeType>();

  const onDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      setSwipe(SwipeType.Like)
    } else if (info.offset.x < -50) {
      setSwipe(SwipeType.Dislike)
    } else {
      setSwipe(undefined)
    }
  }

  const onDragEnd = () => {
    return onSwipe(swipe, track)
  }

  const dragAnimation = swipe === SwipeType.Like
    ? { opacity: .6, rotate: '6deg' }
    : swipe === SwipeType.Dislike
      ? { opacity: .6, rotate: '-6deg' }
      : undefined;

  const exitAnimation = swipe === SwipeType.Like
    ? { opacity: 0, rotate: '6deg' }
    : swipe === SwipeType.Dislike
      ? { opacity: 0, rotate: '-6deg' }
      : undefined;

  return (
    isActive
      ? <motion.div
        key={track.id}
        className="card draggable-card"
        drag={true}
        whileDrag={dragAnimation}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={.2}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        initial={{ scale: .9 }}
        animate={{ scale: 1 }}
        exit={exitAnimation}
      >
        <DragCardItem isActive={isActive} track={track} onSwipe={onSwipe} />
      </motion.div>
      : <motion.div
        initial={{
          scale: .9
        }}
        className="card draggable-card">
        <DragCardItem isActive={isActive} track={track} />
      </motion.div>
  )
}

export default DragCard;
