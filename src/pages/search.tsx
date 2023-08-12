import { services } from "@/application";
import Search from "@/presentation/components/Search";

const SearchPage = () => {
  return <Search searchService={services.search} />
}

export default SearchPage;
