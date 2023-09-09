import "./item_search.css"

import { ROOT_ROUTE, ITEMS_ROUTE } from "../constants";

import { useState } from "react";
import InputBox from "../components/input_box";
import ItemRenderer from "./item_renderer";
import { useGW2InfoFetch } from "../fetch_GW2";
import ItemDropDown from "./item_dropdown";

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
        <div className="ItemSearch">
            <InputBox
                inputValue={inputValue}
                placeHolder="Search for an item"
                setInputValue={setInputValue}
                handleKeyDown={handleKeyDown}
            />
            <ItemDropDown
                inputValue={inputValue}
                setInputValue={setInputValue}
                itemList={itemList || []}
            />
            <button onClick={HandleButtonClick}>Search</button>
            <p> {error ? error.message : null} </p>
            {!error && <ItemRenderer className="Item" data={itemInfo} />}
        </div>
    )
}

export default ItemSearch;
