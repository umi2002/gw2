function createApiDataFetcher(apiEndpoint) {
    async function fetchAndRespondApiData(req, res, next) {
        try {
            const data = await fetch(apiEndpoint);
            const jsonData = await data.json();
            res.json(jsonData);
        } catch (error) {
            console.error('Error fetching API data:', error);
            next(new Error('Internal server error'));
        }
    }

    return fetchAndRespondApiData;
}

function setupRoute(app, routePath, apiEndpoint) {
    app.get(routePath, createApiDataFetcher(apiEndpoint));
}

export {
    setupRoute
}
