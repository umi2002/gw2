import SearchContext from "../contexts/SearchContext";
import DropDownItem from "./DropDownItem";
import { useContext } from "react";
import "../assets/css/DropDown.css";

function DropDown() {
  const { items } = useContext(SearchContext);

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
