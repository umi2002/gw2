import { SERVER_URL } from "./constants";

const HTTP_INTERFACE = {
  GET: async function (endpoint: string) {
    const response = await fetch(`${SERVER_URL}/${endpoint}`);
    return response.json();
  },
};

class HTTPManager {
  itemsBaseURL: string;

  constructor() {
    this.itemsBaseURL = "items";
  }

  async getItemById(id: string) {
    const item = await HTTP_INTERFACE.GET(`${this.itemsBaseURL}/${id}`);
    return item;
  }

  async filterItemsByName(name: string) {
    const results = await HTTP_INTERFACE.GET(
      `${this.itemsBaseURL}?search=${name}`,
    );
    return results;
  }
}

const httpManager = new HTTPManager();

export default httpManager;
