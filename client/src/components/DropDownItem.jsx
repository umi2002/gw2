import { useEffect } from "react";

function DropDownItem({ item, handleClick }) {
    return (
        <>
            <li id="dropdown-item" value={item.id} onClick={handleClick}>
                {item.name}
            </li>
        </>
    );
}

export default DropDownItem;
