import { SearchService } from "@/application/SearchService";
import Search from "@/presentation/components/Search";

const searchService = new SearchService();

const SearchPage = () => {
  return <Search searchService={searchService} />
}

export default SearchPage;
