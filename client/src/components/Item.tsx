import ItemPrices from "../components/ItemPrices";
import ItemRecipe from "../components/ItemRecipe";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpManager from "../assets/js/http_manager";
import { ItemType } from "../utils/types";
import "../assets/css/Item.css";

interface Props {
  id: string;
  isExpanded: boolean;
}

function Item({ id, isExpanded }: Props) {
  const navigate = useNavigate();
  const [item, setItem] = useState({} as ItemType);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getItemById(id);
  }, [id]);

  useEffect(() => {
    if (item) {
      setIsLoaded(true);
    }
  }, [item]);

  async function getItemById(id: string) {
    setIsLoaded(false);
    const item = await httpManager.getItemById(id);
    setItem(item);
  }

  async function handleClickItem() {
    if (!isExpanded) {
      navigate(`/items/${item.id}`);
    }
  }

  return (
    <>
      {isLoaded ? (
        <div className="item-container" onClick={handleClickItem}>
          <div className="item-image">
            <img alt="item-icon" src={item.icon} />
          </div>
          <div className="item-text">
            <p> Name: {item.name} </p>
            <p> Id: {item.id} </p>
            {isExpanded && (
              <>
                <ItemRecipe recipes={item.recipes} />
                {item.tradeable && (
                  <ItemPrices buys={item.buys} sells={item.sells} />
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Item;
