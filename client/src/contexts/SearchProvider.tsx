import { useState, PropsWithChildren } from "react";
import SearchContext from "./SearchContext";
import { ItemType } from "../utils/types.js";

function SearchProvider({ children }: PropsWithChildren<{}>) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([] as ItemType[]);

  return (
    <SearchContext.Provider value={{ query, setQuery, items, setItems }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
