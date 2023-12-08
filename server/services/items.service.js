import dbService from "./database.service.js";
await import("dotenv/config");

class ItemsService {
    constructor() {
        this.dbService = dbService;
    }

    get items() {
        return this.dbService.db.collection(process.env.DB_ITEMS);
    }

    async getItemById(id) {
        return await this.items.findOne({ id: parseInt(id) });
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
