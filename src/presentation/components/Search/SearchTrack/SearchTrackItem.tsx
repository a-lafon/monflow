import { Image as ImageModel } from "@/domain/models/image";
import { FC } from "react";
import { ISearchResponse } from "@/api/interfaces/Search";

const getSmallerImg = (images: ImageModel[]): ImageModel => {
  return images[images.length - 1];
}

interface ISearchTrackItem {
  item: ISearchResponse;
  onItemClicked: Function;
}

const SearchTrackItem: FC<ISearchTrackItem> = ({ item, onItemClicked }) => {
  const img = getSmallerImg(item.images);

  return (
    <div className="search-track-item m-3 p-0 is-clickable" onClick={() => onItemClicked(item)}>
      <article className="media is-align-items-center">
        <div className="media-left">
          <figure className="image is-64x64" style={{
            backgroundImage: `url('${img.url}')`
          }}>
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{item.name}</strong>
              {item.type === 'track' &&
                <small>{' @' + item.artist}</small>
              }
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}

export default SearchTrackItem;
