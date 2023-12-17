import DropDown from "./DropDown";
import SearchContext from "../contexts/SearchContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import httpManager from "../assets/js/http_manager.js";
import "../assets/css/SearchBar.css";

function SearchBar() {
    const navigate = useNavigate();
    const { query, setQuery, items, setItems } = useContext(SearchContext);
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);

    useEffect(() => {
        const timeOutId = setTimeout(async () => {
            await filterItemsByName(query);
        }, 500);

        return () => clearTimeout(timeOutId);
    }, [query]);

    async function filterItemsByName(name) {
        const filteredItems = await httpManager.filterItemsByName(name);
        setItems(filteredItems);
    }

    async function handleChange(event) {
        setQuery(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const inputElement = document.querySelector("input");
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
