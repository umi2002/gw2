import "../css/item_input_dropdown.css"

import { useState } from "react";

import DropDown from "../components/dropdown.js";
import InputBox from "../components/input_box.js";

function ItemInputDropDown({ inputValue, setInputValue, itemList, handleKeyDown }) {
    const [matchedItems, setMatchedItems] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    function handleChange(event) {
        const value = event.target.value;
        setInputValue(value);
        matchItem(value);

        if (!value) {
            setShowDropdown(false);
        }
    }

    function matchItem(value) {
        if (!itemList || itemList.length === 0) {
            return;
        }

        const regex = new RegExp(value, 'i');
        const matchingItems = itemList.filter(item => regex.test(item));

        setMatchedItems(matchingItems.slice(0, 100));
        setShowDropdown(matchingItems.length > 0);
    }

    return (
        <div className="InputDropDown">
            <div className="InputBox">
                <InputBox
                    inputValue={inputValue}
                    placeHolder="Search for an item"
                    handleChange={handleChange}
                    handleKeyDown={handleKeyDown}
                />
            </div>
            <div className={`DropDown ${showDropdown ? "expanded" : "collapsed"}`}>
                {showDropdown
                    && <DropDown
                        data={matchedItems}
                        setInputValue={setInputValue}
                        setShowDropdown={setShowDropdown}
                        handleChange={handleChange}
                    />}
            </div>
        </div>
    );
}

export default ItemInputDropDown
