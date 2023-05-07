import { Swipe } from "@/enums";
import { Track } from "@/models/track";
import { motion, PanInfo, useDragControls } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { FaStop, FaPlay, FaInfoCircle } from "react-icons/fa";
import { BsFillHeartbreakFill, BsFillHeartFill } from "react-icons/bs";
import useSound from "@/hooks/useSound";

interface IDragCard {
  isActive: boolean;
  track: Track;
  onSwipe: Function;
  isPlaying: boolean;
}

const DragCard: FC<IDragCard> = ({ isActive, onSwipe, track, isPlaying }) => {
  const [swipe, setSwipe] = useState<Swipe>()

  const onDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      setSwipe(Swipe.Like)
    } else if (info.offset.x < -50) {
      setSwipe(Swipe.Dislike)
    } else {
      setSwipe(undefined)
    }
  }

  const onDragEnd = () => {
    console.log('SSS', swipe);
    return onSwipe(swipe, track)
  }

  return (
    isActive
      ? <motion.div
        key={track.id}
        className="card draggable-card"
        drag={true}
        whileDrag={
          swipe === Swipe.Like
            ? { opacity: .6, rotate: '6deg' }
            : swipe === Swipe.Dislike
              ? { opacity: .6, rotate: '-6deg' }
              : undefined
        }
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={.2}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        initial={{
          scale: .9,
        }}
        animate={{
          scale: 1,
        }}
        exit={
          swipe === Swipe.Like
            ? { opacity: 0, rotate: '6deg' }
            : swipe === Swipe.Dislike
              ? { opacity: 0, rotate: '-6deg' }
              : undefined
        }
      >
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
        <footer className="card-footer has-background-white">
          <a className="card-footer-item" onClick={() => onSwipe(Swipe.Dislike, track)}>
            <span className="icon">
              <BsFillHeartbreakFill />
            </span>
          </a>
          <a className="card-footer-item">
            <span className="icon">
              {
                isPlaying
                  ? <FaStop />
                  : <FaPlay />
              }
            </span>
          </a>
          <a className="card-footer-item" onClick={() => onSwipe(Swipe.Like, track)}>
            <span className="icon">
              <BsFillHeartFill />
            </span>
          </a>
        </footer>
      </motion.div>
      : (
        <motion.div
          initial={{
            scale: .9
          }}
          className="card draggable-card">
          <div className="card-image">
            <figure className="image is-square">
              <img style={{ pointerEvents: 'none' }} src={track.album.images[0].url} alt="Placeholder image" />
            </figure>
          </div>
          <footer className="card-footer has-background-white">
            <a href="#" className="card-footer-item">
              <span className="icon">
                <BsFillHeartbreakFill />
              </span>
            </a>
            <a href="#" className="card-footer-item">
              <span className="icon">
                <FaPlay />
              </span>
              {/* <FaStop /> */}
            </a>
            <a href="#" className="card-footer-item">
              <span className="icon">
                <BsFillHeartFill />
              </span>
            </a>
          </footer>
        </motion.div>
      )
  )
}

export default DragCard;



// {
  // tracks.map((track) => (
  //   <motion.div
  //     key={track.id}
  //     className="card is-absolute"
  //     style={{
  //       position: 'absolute',
  //       top: 0,
  //       left: 0,
  //       bottom: 0,
  //       right: 0 ,
  //       width: '100%',
  //       height: '100%'
  //     }}
  //     drag={true}
  //     whileDrag={{ scale: 1.2 }}
  //     >
  //     <div className="card-image">
  //       <figure className="image is-square">
  //         <img src={track.album.images[0].url} alt="Placeholder image" />
  //       </figure>
  //     </div>
  //     {/* <div className="card-content">
  //       <div className="media">
  //         <div className="media-left">
  //           <figure className="image is-48x48">
  //             <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
  //           </figure>
  //         </div>
  //         <div className="media-content">
  //           <p className="title is-4">{track.name}</p>
  //           <p className="subtitle is-6">@${track.artists[0].name}</p>
  //         </div>
  //       </div>
  //     </div> */}
  //     <footer className="card-footer">
  //       <a href="#" className="card-footer-item">Save</a>
  //       <a href="#" className="card-footer-item">Edit</a>
  //       <a href="#" className="card-footer-item">Delete</a>
  //     </footer>
  //   </motion.div>
  // ))
// }