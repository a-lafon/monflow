import { FC, useState } from "react";
import SearchInput from "../SearchInput";
import SearchTrackResults from "./SearchTrackResults";
import { SearchResult } from "@/domain/models/search";

interface ISearchTracks {
  onItemClicked: Function;
}

const SearchTracks: FC<ISearchTracks> = ({ onItemClicked }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [isSearchReset, setIsSearchReset] = useState(false);

  const resetSearch = () => {
    setSearchValue('');
    setIsSearchReset(true);
  }

  const onInputChange = (value: string) => {
    setIsSearchReset(false);
    setSearchValue(value);
  }

  const _onItemClicked = (item: SearchResult) => {
    resetSearch();
    return onItemClicked(item);
  }

  return (
    <div className="search-tracks is-relative">
      <SearchInput
        isReset={isSearchReset}
        onChange={onInputChange}
        isLoading={isResultsLoading}
        placeholder='Artistes ou titres ...'
      />

      {searchValue &&
        <SearchTrackResults
          searchValue={searchValue}
          onResultsLoading={setIsResultsLoading}
          onItemClicked={_onItemClicked}
        />}
    </div>
  );
}

export default SearchTracks;
