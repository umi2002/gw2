import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Item from "../components/Item";
import httpManager from "../assets/js/http_manager";
import { ItemType } from "../utils/types.js";
import "../assets/css/Items.css";

function ItemsPage() {
  const [items, setItems] = useState([] as ItemType[]);
  const url = useLocation();
  const searchParams = new URLSearchParams(url.search);
  const query = searchParams.get("search") as string;

  useEffect(() => {
    filterItemsByName(query);
  }, [query]);

  async function filterItemsByName(name: string) {
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
