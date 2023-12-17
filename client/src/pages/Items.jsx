import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import httpManager from "../assets/js/http_manager";
import "../assets/css/Items.css";

function Items() {
    const [items, setItems] = useState([]);
    const url = useLocation();
    const searchParams = new URLSearchParams(url.search);
    const query = searchParams.get("search");

    useEffect(() => {
        filterItemsByName(query);
    }, [query]);

    async function filterItemsByName(name) {
        const filteredItems = await httpManager.filterItemsByName(name);
        setItems(filteredItems);
    }

    return (
        <main id="App-main">
            {items ? (
                <>
                    <div>Search results for {query}</div>
                    <div id="items-container">
                        {items.map((item, index) => (
                            <div id="item-container" key={index}>
                                <div id="item-image">
                                    <img src={item.icon} />
                                </div>
                                <div id="item-text">
                                    <p> Name: {item.name} </p>
                                    <p> Id: {item.id} </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div>No items found</div>
            )}
        </main>
    );
}

export default Items;
