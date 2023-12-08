import DropDownItem from "./DropDownItem";
import "../assets/css/DropDown.css";

function DropDown({ items , handleClick }) {
    return (
        <>
            <ul id="dropdown">
                {items.map((item, index) => (
                    <DropDownItem key={index} item={item} handleClick />
                ))}
            </ul>
        </>
    );
}

export default DropDown;
