import DropDownItem from "./DropDownItem";
import "../assets/css/DropDown.css";

function DropDown({ items }) {
    return (
        <>
            <ul id="dropdown">
                {items.map((item, index) => (
                    <DropDownItem key={index} item={item} />
                ))}
            </ul>
        </>
    );
}

export default DropDown;
