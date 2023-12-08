import DropDown from "./DropDown";
import { useState, useEffect } from "react";
import httpManager from "../assets/js/http_manager.js";
import "../assets/css/SearchBar.css";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState("");

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
    }

    async function handleClick(event) {
        console.log(event.target.value);
    }

    return (
        <>
            <div id="search-container">
                <div id="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search for an item"
                        onChange={handleChange}
                    />
                    <DropDown items={items} onClick={handleClick}/>
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
