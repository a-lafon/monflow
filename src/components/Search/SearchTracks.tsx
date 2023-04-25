import { FC, useState } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

interface ISearchTracks {
}

const SearchTracks: FC<ISearchTracks> = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  return (
    <>
      <SearchInput
        onChange={(value: string) => setSearchValue(value)}
        isLoading={isResultsLoading}
        placeholder='Artistes ou titres ...'
      />

      {searchValue &&
        <SearchResults
          searchValue={searchValue}
          onResultsLoading={setIsResultsLoading}
        />}
    </>
  );
}

export default SearchTracks;
