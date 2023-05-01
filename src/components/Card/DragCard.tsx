import { Swipe } from "@/enums";
import { motion, PanInfo } from "framer-motion";
import { FC, useState } from "react";
import tracks from '../../../mockedData';

interface IDragCard {
  isActive: boolean;
  onSwipe: Function;
}

const DragCard: FC<IDragCard> = ({isActive, onSwipe}) => {
  const onDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      setSwipe(Swipe.Like)
    } else if (info.offset.x < -100) {
      setSwipe(Swipe.Dislike)
    } else {
      setSwipe(undefined)
    }
  }

  const onDragEnd = () => {
    return onSwipe(swipe, tracks[0])
  }

  const [swipe, setSwipe] = useState<Swipe>()

  return (
    <motion.div
      key={tracks[0].id}
      className="card"
      drag={true}
      whileDrag={
        swipe === Swipe.Like
          ? { scale: 0.9, opacity: .6, rotate: '6deg' }
          : swipe === Swipe.Dislike
            ? { scale: 0.9, opacity: .6, rotate: '-6deg' }
            : undefined
      }
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={.3}
      // dragSnapToOrigin={true}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      initial={{
        scale: .9
      }}
      animate={{
        scale: 1,
        // rotate: `${card.name.length % 2 === 0 ? 6 : -6}deg`,
      }}
      exit={{ opacity: 0 }}
    >
      <div className="card-image">
        <figure className="image is-square">
          <img style={{ pointerEvents: 'none' }} src={tracks[0].album.images[0].url} alt="Placeholder image" />
        </figure>
      </div>
      {/* <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-4">{track.name}</p>
          <p className="subtitle is-6">@${track.artists[0].name}</p>
        </div>
      </div>
    </div> */}
      <footer className="card-footer">
        <a href="#" className="card-footer-item">Save</a>
        <a href="#" className="card-footer-item">Edit</a>
        <a href="#" className="card-footer-item">Delete</a>
      </footer>
    </motion.div>
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