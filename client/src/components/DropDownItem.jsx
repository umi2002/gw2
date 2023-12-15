import SearchContext from "../contexts/SearchContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function DropDownItem({ item }) {
    const { query, setQuery } = useContext(SearchContext);
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/items/${item.id}`);
        setQuery(item.name);
    }

    return (
        <>
            <div onMouseDown={handleClick}>
                <li id="dropdown-item" value={item.id}>
                    {item.name}
                </li>
            </div>
        </>
    );
}

export default DropDownItem;
