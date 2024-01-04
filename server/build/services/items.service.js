import ApiService from "./api.service.js";
import dbService from "./database.service.js";
await import("dotenv/config");
class ItemsService {
    apiService;
    dbService;
    constructor() {
        this.apiService = new ApiService();
        this.dbService = dbService;
    }
    get items() {
        const collection = process.env.DB_ITEMS || "";
        return this.dbService.db.collection(collection);
    }
    async getItemById(id) {
        return await this.items.findOne({ id: parseInt(id) });
    }
    async getPricesById(id) {
        const price = await this.apiService.getPricesById(id);
        return price;
    }
    async getItemsByName(name) {
        return await this.items.find({ name: name }).toArray();
    }
    async filterItemsByName(name) {
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
