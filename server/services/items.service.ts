import { Collection } from "mongodb";
import ApiService from "./api.service.js";
import dbService, { DatabaseService } from "./database.service.js";
import { ItemType, Ingredient, CommerceData } from "../utils/types.js";
await import("dotenv/config");

class ItemsService {
  apiService: ApiService;
  dbService: DatabaseService;

  constructor() {
    this.apiService = new ApiService();
    this.dbService = dbService;
  }

  get items(): Collection<ItemType> {
    return this.dbService.db.collection(process.env.DB_ITEMS as string);
  }

  async getItemById(id: number): Promise<ItemType | null> {
    return await this.items.findOne({ id: id });
  }

  async getPricesById(id: number): Promise<CommerceData | null> {
    const price: CommerceData | null = await this.apiService.getPricesById(id);
    return price;
  }

  async getItemsByName(name: string): Promise<ItemType[]> {
    return await this.items.find({ name: name }).toArray();
  }

  async filterItemsByName(name: string): Promise<ItemType[]> {
    if (!name) {
      return [];
    }

    const escapedString: string = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex: RegExp = new RegExp(escapedString, "i");

    return await this.items
      .find({ name: { $regex: regex } })
      .limit(10)
      .toArray();
  }
}

export default ItemsService;
