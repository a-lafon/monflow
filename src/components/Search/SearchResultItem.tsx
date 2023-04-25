import { Image } from "@/api/models/image";
import { SearchApiResponse } from "@/pages/api/search";
import { FC } from "react";

const getSmallerImg = (images: Image[]): string => {
  if (!images || images.length === 0) {
    return '';
  }

  let minHeight = Infinity;
  let smallestImgIndex = 0;
  for (let i = 0; i < images.length; i++) {
    if (images[i].height < minHeight) {
      minHeight = images[i].height;
      smallestImgIndex = i;
    }
  }

  return images[smallestImgIndex] ? images[smallestImgIndex].url : '';
}

interface ISearchResultItem {
  item: SearchApiResponse;
  onItemClicked: Function;
}

const SearchResultItem: FC<ISearchResultItem> = ({ item, onItemClicked }) => {
  return (
    <div className="box" onClick={() => onItemClicked(item)}>
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img className="is-rounded" src={getSmallerImg(item.images)} alt={item.name} />
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

export default SearchResultItem;
