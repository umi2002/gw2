import SearchContext from "./SearchContext";
import { useState } from "react";

function SearchProvider({ children }) {
    const [query, setQuery] = useState("");
    const [items, setItems] = useState([]);

    return (
        <SearchContext.Provider value={{ query, setQuery, items, setItems }}>
            {children}
        </SearchContext.Provider>
    );
}

export default SearchProvider;
