import { useNavigate } from "react-router-dom";

function DropDownItem({ item }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/items/${item.id}`);
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
