import "../css/item_search.css"

import { ROOT_ROUTE, ITEMS_ROUTE } from "../constants";

import { useState } from "react";
import ItemRenderer from "./item_renderer";
import { useGW2InfoFetch } from "../fetch_GW2";
import ItemInputDropDown from "./item_input_dropdown";

function ItemSearch() {
    const [inputValue, setInputValue] = useState("");
    const [itemRoute, setItemRoute] = useState(null);
    const { serverInfo: itemInfo, error } = useGW2InfoFetch(itemRoute);
    const { serverInfo: itemList } = useGW2InfoFetch(ROOT_ROUTE + ITEMS_ROUTE);

    if (error && error.message === "Network response was not ok") {
        error.message = "No item matches that ID.";
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            HandleButtonClick();
        }
    }

    function HandleButtonClick() {
        if (!inputValue) {
            return;
        }

        setItemRoute(ROOT_ROUTE + ITEMS_ROUTE + "/" + inputValue);
    }

    return (
        <div>
            <div className="ItemSearch">
                <ItemInputDropDown
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    itemList={itemList}
                    handleKeyDown={handleKeyDown}
                />
                <button className="ItemSearch-button" onClick={HandleButtonClick}>Search</button>
            </div>
            <div className="Item">
                <p> {error ? error.message : null} </p>
                {!error && <ItemRenderer data={itemInfo} />}
            </div>
        </div>
    )
}

export default ItemSearch;
