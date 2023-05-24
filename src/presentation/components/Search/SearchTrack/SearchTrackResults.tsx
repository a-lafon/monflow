import { useSearch } from "@/presentation/hooks/api";
import { stagger, useAnimate } from "framer-motion";
import { FC, useEffect } from "react";
import SearchTrackItem from "./SearchTrackItem";

interface ISearchTrackResults {
  searchValue: string;
  onResultsLoading: Function;
  onItemClicked: Function;
}

const useTrackItemsAnimation = (isLoading: boolean) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isLoading) {
      animate([
        [
          '.search-track-item',
          {
            opacity: 0, x: -64, filter: 'blur(10px)'
          },
          { duration: 0 }
        ],
        [
          '.search-track-item',
          {
            opacity: 1, x: 0, filter: 'blur(0px)'
          },
          {
            duration: 0.2,
            delay: stagger(0.1, { startDelay: 0.1 })
          }
        ]
      ]);
    }
  }, [isLoading])

  return scope;
}

const SearchTrackResults: FC<ISearchTrackResults> = ({ searchValue, onResultsLoading, onItemClicked }) => {
  const { data, error, isLoading } = useSearch(searchValue);
  const scope = useTrackItemsAnimation(isLoading);

  useEffect(() => {
    onResultsLoading(isLoading);
  }, [isLoading, onResultsLoading])

  if (isLoading || error) {
    return null;
  }

  return (
    <div ref={scope}>
      <div className="search-track-results">
        {data &&
          <>
            <div className="is-size-6 m-3">{data.length} résultats</div>
            {
              data.map((item) =>
                <SearchTrackItem
                  key={`${item.type}_${item.id}`}
                  item={item} onItemClicked={onItemClicked}
                />
              )
            }
          </>
        }
      </div>
    </div>
  );
}

export default SearchTrackResults;
