interface ItemType {
  id: number;
  icon: string;
  name: string;
  tradeable: boolean;
  buys: Prices;
  sells: Prices;
  recipes: Ingredient[][];
}

interface Prices {
  quantity?: number;
  unit_price?: number;
}

interface Ingredient {
  item_id: number;
  count: number;
}

interface CommerceData {
  id: number;
  whitelisted: boolean;
  buys: Prices;
  sells: Prices;
}

export type { ItemType, Prices, Ingredient, CommerceData };
