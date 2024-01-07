import { CommerceData } from "../utils/types.js";

class ApiService {
  baseUrl: string;
  pricesEndpoint: string;

  constructor() {
    this.baseUrl = "https://api.guildwars2.com/v2/";
    this.pricesEndpoint = "commerce/prices/";
  }

  async fetchWithExponentialBackoff(
    endpoint: string,
    initialDelay: number = 1,
  ): Promise<any> {
    let delay = initialDelay;

    while (true) {
      try {
        const response = await fetch(endpoint);
        if (!response.ok)
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`,
          );

        return await response.json();
      } catch (error) {
        console.error(`Fetch failed. Retrying in ${delay} ms...`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      }
    }
  }

  async getPricesById(id: number): Promise<CommerceData> {
    const endpoint: string = `${this.baseUrl}${this.pricesEndpoint}${id}`;
    console.log("Fetching data from:", endpoint);
    const response: CommerceData =
      await this.fetchWithExponentialBackoff(endpoint);

    return response;
  }
}

export default ApiService;
