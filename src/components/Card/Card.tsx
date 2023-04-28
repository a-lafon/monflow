import { FC } from "react";

interface ICard {
  title: string;
  subtitle?: string;
  image: string;
}

const Card: FC<ICard> = ({ title, subtitle, image }) => {
  return (
    <div className="custom-card card">
      <div className="card-image">
        <figure className="image is-square">
          <img src={image} alt={title} />
        </figure>
      </div>
      <div className="card-content pl-0">
        <div className="media-content">
          <p className="title is-4 has-text-primary">{title}</p>
          {subtitle && <p className="subtitle is-6 has-text-primary">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

export default Card;