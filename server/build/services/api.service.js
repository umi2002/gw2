class ApiService {
    baseUrl;
    pricesEndpoint;
    constructor() {
        this.baseUrl = "https://api.guildwars2.com/v2/";
        this.pricesEndpoint = "commerce/prices/";
    }
    async fetchWithExponentialBackoff(endpoint, initialDelay = 1) {
        let delay = initialDelay;
        while (true) {
            try {
                const response = await fetch(endpoint);
                if (!response.ok)
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                return await response.json();
            }
            catch (error) {
                console.error(`Fetch failed. Retrying in ${delay} ms...`);
                await new Promise((res) => setTimeout(res, delay));
                delay *= 2;
            }
        }
    }
    async getPricesById(id) {
        const endpoint = `${this.baseUrl}${this.pricesEndpoint}${id}`;
        console.log("Fetching data from:", endpoint);
        const response = await this.fetchWithExponentialBackoff(endpoint);
        return await response;
    }
}
export default ApiService;
