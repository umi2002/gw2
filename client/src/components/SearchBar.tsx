import DropDown from "./DropDown";
import SearchContext from "../contexts/SearchContext";
import { useState, useEffect, useContext, useCallback, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import httpManager from "../assets/js/http_manager";
import "../assets/css/SearchBar.css";

function SearchBar() {
  const navigate = useNavigate();
  const { query, setQuery, items, setItems } = useContext(SearchContext);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  const filterItemsByName = useCallback(
    async (name: string): Promise<void> => {
      const filteredItems = await httpManager.filterItemsByName(name);
      setItems(filteredItems);
    },
    [setItems],
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      filterItemsByName(query);
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [query, filterItemsByName]);

  async function handleChange(event: FormEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputElement = document.querySelector("input");

    if (!inputElement) return;

    inputElement.blur();
    await filterItemsByName(query);
    if (items.length === 1) {
      navigate(`/items/${items[0].id}`);
      return;
    } else {
      navigate(`/items?search=${query}`);
    }
  }

  function onFocus() {
    setIsDropDownVisible(true);
  }

  function onBlur() {
    setTimeout(() => {
      setIsDropDownVisible(false);
    }, 100);
  }

  return (
    <>
      <form id="search-form" onSubmit={handleSubmit}>
        <div id="search-bar-container">
          <input
            type="text"
            placeholder="Search for an item"
            onChange={handleChange}
            value={query}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          {isDropDownVisible && <DropDown />}
        </div>
        <div id="search-button-container">
          <button type="submit">Search</button>
        </div>
      </form>
    </>
  );
}

export default SearchBar;
