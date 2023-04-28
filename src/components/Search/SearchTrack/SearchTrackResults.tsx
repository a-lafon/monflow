import { useSearch } from "@/hooks/api";
import { FC, useEffect } from "react";
import SearchTrackItem from "./SearchTrackItem";

interface ISearchTrackResults {
  searchValue: string;
  onResultsLoading: Function;
  onItemClicked: Function;
}

const SearchTrackResults: FC<ISearchTrackResults> = ({ searchValue, onResultsLoading, onItemClicked }) => {
  const { data, error, isLoading } = useSearch(searchValue);

  useEffect(() => {
    onResultsLoading(isLoading);
  }, [isLoading, onResultsLoading])

  if (isLoading || error) {
    return null;
  }

  return (
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
  );
}

export default SearchTrackResults;
