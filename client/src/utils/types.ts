interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  items: ItemType[];
  setItems: (items: ItemType[]) => void;
}

interface ItemType {
  id: string;
  icon: string;
  name: string;
  tradeable: boolean;
  buys: Prices;
  sells: Prices;
  recipes: Ingredient[][];
}

interface Prices {
  quantity: number;
  unit_price: number;
}

interface Ingredient {
  item_id: number;
  count: number;
}

export type { SearchContextType, ItemType, Prices, Ingredient };
