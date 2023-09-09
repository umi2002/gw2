import { useEffect, useState } from "react";

import DropDown from "../components/dropdown.js";

function ItemDropDown({ inputValue, setInputValue, itemList }) {
    const [matchedItems, setMatchedItems] = useState([]);

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function matchItem() {
        if (!itemList || itemList.length === 0) {
            return;
        }

        const regex = new RegExp(inputValue, 'i');  // 'i' flag for case-insensitive search

        const matchingItems = itemList.filter(item =>
            regex.test(item)
        );

        if (matchingItems.length >= 4) {
            setMatchedItems(matchingItems.slice(0, 4));
        } else {
            setMatchedItems(matchingItems);
        }
    }

    useEffect(matchItem, [inputValue]);

    return (
        <DropDown
            data={matchedItems}
            overrideFunction={handleChange}
        />
    )
}

export default ItemDropDown
