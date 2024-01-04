import ApiService from "./api.service.js";
import dbService, { DatabaseService } from "./database.service.js";
await import("dotenv/config");

class ItemsService {
  apiService: ApiService;
  dbService: DatabaseService;

  constructor() {
    this.apiService = new ApiService();
    this.dbService = dbService;
  }

  get items() {
    const collection: string = process.env.DB_ITEMS || "";

    return this.dbService.db.collection(collection);
  }

  async getItemById(id: string) {
    return await this.items.findOne({ id: parseInt(id) });
  }

  async getPricesById(id: string) {
    const price = await this.apiService.getPricesById(id);
    return price;
  }

  async getItemsByName(name: string) {
    return await this.items.find({ name: name }).toArray();
  }

  async filterItemsByName(name: string) {
    if (!name) {
      return [];
    }

    const escapedString = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedString, "i");

    return await this.items
      .find({ name: { $regex: regex } })
      .limit(10)
      .toArray();
  }
}

export default ItemsService;
