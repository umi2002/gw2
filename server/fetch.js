import fetch from "node-fetch";

function createApiDataFetcher(apiEndpoint) {
    async function fetchAndRespondApiData(req, res, next) {
        try {
            const data = await fetch(apiEndpoint);
            const jsonData = await data.json();
            res.json(jsonData);
        } catch (error) {
            console.error('Error fetching API data from endpoint:', apiEndpoint, 'Error:', error);
            next(new Error('Internal server error'));
        }
    }

    return fetchAndRespondApiData;
}

export default createApiDataFetcher;
