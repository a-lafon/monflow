import { useSearch } from "@/hooks/api";
import { FC, useEffect } from "react";
import SearchResultItem from "./SearchResultItem";

interface ISearchResults {
  searchValue: string;
  onResultsLoading: Function;
}

const SearchResults: FC<ISearchResults> = ({ searchValue, onResultsLoading }) => {
  const { data, error, isLoading } = useSearch(searchValue);

  useEffect(() => {
    onResultsLoading(isLoading);
  }, [isLoading, onResultsLoading])

  if (isLoading || error) {
    return null;
  }

  const onItemClicked = (item: any) => {
    console.log('item', item);
  }

  return (
    <>
      {data &&
        data.map((item) =>
          <SearchResultItem
            key={`${item.type}_${item.id}`}
            item={item} onItemClicked={onItemClicked}
          />
        )
      }
    </>
  );
}

export default SearchResults;
