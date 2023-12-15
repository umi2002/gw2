import ItemPrices from "../components/ItemPrices";
import ItemRecipe from "../components/ItemRecipe";
import httpManager from "../assets/js/http_manager";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/Item.css";

function Item() {
    const params = useParams();
    const [item, setItem] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getItemById(params.id);
    }, [params.id]);

    useEffect(() => {
        setIsLoaded(true);
    }, [item]);

    async function getItemById(id) {
        setIsLoaded(false);
        const item = await httpManager.getItemById(id);
        setItem(item);
    }

    return (
        <main id="App-main">
            {isLoaded ? (
                <div id="item-container">
                    <div id="item-image">
                        <img src={item.icon} />
                    </div>
                    <div id="item-text">
                        <p> Name: {item.name} </p>
                        <p> Id: {item.id} </p>
                        <ItemRecipe recipes={item.recipes} />
                        {item.tradeable && (
                            <ItemPrices buys={item.buys} sells={item.sells} />
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
}

export default Item;
