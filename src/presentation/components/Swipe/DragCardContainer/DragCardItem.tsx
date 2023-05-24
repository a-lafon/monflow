import { SwipeType } from "@/domain/enums";
import { Track } from "@/domain/models/track";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { BsFillHeartbreakFill, BsFillHeartFill } from "react-icons/bs";
import { IconType } from "react-icons";

interface IDragCardItem {
  isActive: boolean;
  track: Track;
  onSwipe?(swipeType: SwipeType, track: Track): void;
}

interface IAnimatedIcon {
  Icon: IconType;
  size: number;
  textColor: string;
  isActive: boolean;
}

const AnimatedIcon = ({ Icon, size, textColor, isActive }: IAnimatedIcon) => {
  return (
    <motion.span
      className={`icon has-text-${textColor} is-size-${size}`}
      animate={isActive ? { scale: 1.25 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Icon />
    </motion.span>
  );
}

const DragCardItem: FC<IDragCardItem> = ({ isActive, track, onSwipe }) => {
  const [isHeartbreakActive, setIsHeartbreakActive] = useState(false);
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [isInfoActive, setIsInfoActive] = useState(false);

  return (
    <div>
      <div className="card-image is-relative">
        <figure className="image is-square">
          <img src={track.album.images[0].url} alt={track.name} />
        </figure>
        <div className="is-overlay">
          <div className="is-flex is-flex-direction-column is-justify-content-end">
            <div className="m-4">
              <div className="title is-3 has-text-link mb-0">{track.name}</div>
              <div className="subtititle has-text-link">{track.artists[0].name}</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="card-footer has-background-black is-borderless">
        <a
          className="card-footer-item is-borderless"
          onClick={() => isActive && onSwipe ? onSwipe(SwipeType.Dislike, track) : null}
          onMouseEnter={() => setIsHeartbreakActive(true)}
          onMouseLeave={() => setIsHeartbreakActive(false)}
        >
          <AnimatedIcon
            Icon={BsFillHeartbreakFill}
            isActive={isHeartbreakActive}
            size={4}
            textColor="danger"
          />
        </a>
        <a
          className="card-footer-item is-borderless"
          onMouseEnter={() => setIsInfoActive(true)}
          onMouseLeave={() => setIsInfoActive(false)}
        >
          <AnimatedIcon
            Icon={FaInfoCircle}
            isActive={isInfoActive}
            size={5}
            textColor="primary-light"
          />
        </a>
        <a
          className="card-footer-item is-borderless"
          onClick={() => isActive && onSwipe ? onSwipe(SwipeType.Like, track) : null}
          onMouseEnter={() => setIsHeartActive(true)}
          onMouseLeave={() => setIsHeartActive(false)}
        >
          <AnimatedIcon
            Icon={BsFillHeartFill}
            isActive={isHeartActive}
            size={4}
            textColor="link"
          />
        </a>
      </footer>
    </div>
  )
}

export default DragCardItem;
