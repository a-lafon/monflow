import { Image as ImageModel } from "@/api/models/image";
import { SearchApiResponse } from "@/pages/api/search";
import { FC } from "react";

const getSmallerImg = (images: ImageModel[]): ImageModel | null => {
  if (!images || images.length === 0) {
    return null;
  }

  let minHeight = Infinity;
  let smallestImgIndex = 0;
  for (let i = 0; i < images.length; i++) {
    if (images[i].height < minHeight) {
      minHeight = images[i].height;
      smallestImgIndex = i;
    }
  }

  return images[smallestImgIndex] ? images[smallestImgIndex] : null;
}

interface ISearchTrackItem {
  item: SearchApiResponse;
  onItemClicked: Function;
}

const SearchTrackItem: FC<ISearchTrackItem> = ({ item, onItemClicked }) => {
  const img = getSmallerImg(item.images);

  return (
    <div className="search-track-item m-3 p-0 is-clickable" onClick={() => onItemClicked(item)}>
      <article className="media is-align-items-center">
        <div className="media-left">
          <figure className="image is-64x64" style={
            img ? {
              backgroundImage: `url('${img.url}')`
            }
              : undefined
          }>
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
