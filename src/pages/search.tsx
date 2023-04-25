import Layout from "@/components/Layout";
import { useState } from "react";
import SearchResults from "@/components/Search/SearchResults";
import SearchInput from "@/components/Search/SearchInput";
import SearchTracks from "@/components/Search/SearchTracks";

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Layout>
      <h1>Une playlist pour toi !</h1>
      <p>Balance jusqu'à 5 de tes musiques ou artistes préférés</p>
      <SearchTracks />
    </Layout>
  )
}

export default Search;
