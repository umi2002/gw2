import DropDown from "./DropDown";
import { useState, useEffect } from "react";
import httpManager from "../assets/js/http_manager.js";
import "../assets/css/SearchBar.css";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [items, setItems] = useState([]);
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
        await filterItemsByName(query);
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
            <div id="search-container">
                <div id="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search for an item"
                        onChange={handleChange}
                        value={query}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                    {isDropDownVisible && <DropDown items={items} />}
                </div>
                <div id="search-button-container">
                    <button type="submit" onClick={handleSubmit}>
                        Search
                    </button>
                </div>
            </div>
        </>
    );
}

export default SearchBar;
