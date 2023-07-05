import { FC } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

interface IPlayerContainer {
  duration: number;
  position: number;
  play: Function;
  pause: Function;
  isPlaying: boolean;
}

const PlayerContainer: FC<IPlayerContainer> = ({ isPlaying, duration, position, play, pause }) => {
  return (
    <div className="player-container has-background-primary">
      <div className="section">
        <div className="container">
          <div className="is-flex is-justify-content-center	is-align-items-center">
            <button
              className="is-flex is-justify-content-center is-align-items-center has-text-link is-size-1"
              onClick={() => isPlaying ? pause() : play()}
            >
              {
                isPlaying
                  ? <FaPause />
                  : <FaPlay />
              }
            </button>
            <span className='is-size-3 has-text-white ml-3'>
              {duration - position}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerContainer;
