import { SERVER_URL } from "./constants.js";

const HTTP_INTERFACE = {
    GET: async function(endpoint) {
        const response = await fetch(`${SERVER_URL}/${endpoint}`);
        return response.json();
    },
};

class HTTPManager {
    constructor() {
        this.itemsBaseURL = "items";
    }

    async getItemById(id) {
        const item = await HTTP_INTERFACE.GET(`${this.itemsBaseURL}/${id}`);
        return item;
    }

    async filterItemsByName(name) {
        const results = await HTTP_INTERFACE.GET(
            `${this.itemsBaseURL}?search=${name}`,
        );
        return results;
    }
}

const httpManager = new HTTPManager();

export default httpManager;
