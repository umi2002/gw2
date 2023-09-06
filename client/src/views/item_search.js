import { ROOT_ROUTE, ITEMS_ROUTE } from "../constants";

import React, { useState } from "react";
import InputBox from "../components/input_box";
import ItemRenderer from "./item_renderer";
import { useGW2InfoFetch } from "../fetch_GW2";

function ItemSearch() {
    const [inputValue, setInputValue] = useState("");
    const [itemRoute, setItemRoute] = useState(null);
    const { serverInfo, error, isLoading } = useGW2InfoFetch(itemRoute);

    if (error && error.message === "Network response was not ok") {
        error.message = "No item matches that ID.";
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            HandleButtonClick();
        }
    }

    function HandleButtonClick() {
        setItemRoute(ROOT_ROUTE + ITEMS_ROUTE + "/" + inputValue);
    }

    console.log(serverInfo);

    return (
        <div>
            <InputBox
                inputValue={inputValue}
                placeHolder="Search for an item"
                setInputValue={setInputValue}
                handleKeyDown={handleKeyDown}
            />
            <button onClick={HandleButtonClick}>Search</button>
            <p> {error ? error.message : null} </p>
            {!isLoading && <ItemRenderer data={serverInfo} />}
        </div>
    )
}

export default ItemSearch;
