import httpManager from "../assets/js/http_manager";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Item() {
    const params = useParams();
    const [item, setItem] = useState({});

    useEffect(() => {
        getItemById(params.id);
    }, [params.id]);

    useEffect(() => {
        console.log(item);
    }, [item]);

    async function getItemById(id) {
        const item = await httpManager.getItemById(id);
        setItem(item);
    }

    return (
        <main id="App-main">
            <div className="item">
                <div className="item-image">
                    <img src={item.icon} />
                </div>
                <div className="item-name">{item.name}</div>
                <div className="item-id">{item.id}</div>
            </div>
        </main>
    );
}

export default Item;
