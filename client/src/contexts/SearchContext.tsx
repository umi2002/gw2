import React from "react";
import { SearchContextType } from "../utils/types";

const SearchContext = React.createContext<SearchContextType>({
  query: "",
  setQuery: () => {},
  items: [],
  setItems: () => {},
});

export default SearchContext;
