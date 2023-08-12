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
    <div className="player-container">
      <div className="section">
        <div className="container">
          <div className="is-flex is-justify-content-center	is-align-items-center">
            <button
              className="button is-link is-size-3 is-rounded is-inverted"
              onClick={() => isPlaying ? pause() : play()}
            >
              <span className="icon">
                {
                  isPlaying
                    ? <FaPause />
                    : <FaPlay />
                }
              </span>
              <span className='has-text-white'>
                {duration - position}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerContainer;
