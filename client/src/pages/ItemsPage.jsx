import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import httpManager from "../assets/js/http_manager";
import Item from "../components/Item";
import "../assets/css/Items.css";

function ItemsPage() {
    const [items, setItems] = useState([]);
    const url = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(url.search);
    const query = searchParams.get("search");

    useEffect(() => {
        filterItemsByName(query);
    }, [query]);

    async function filterItemsByName(name) {
        const filteredItems = await httpManager.filterItemsByName(name);
        setItems(filteredItems);
    }

    async function handleClickItem(id) {
        navigate(`/items/${id}`);
    }

    return (
        <main id="App-main">
            {items ? (
                <>
                    <div>Search results for {query}</div>
                    <div id="items-container">
                        {items.map((item, index) => (
                            <Item id={item.id} isExpanded={false} key={index} />
                        ))}
                    </div>
                </>
            ) : (
                <div>No items found</div>
            )}
        </main>
    );
}

export default ItemsPage;
