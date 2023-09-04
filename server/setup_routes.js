import fetch from "node-fetch";

import { GW2_API, ITEMS_ROUTE } from "./constants.js";
import createApiDataFetcher from "./fetch.js";

function setupRoute(app, routePath, apiEndpoint) {
    app.get(routePath, createApiDataFetcher(apiEndpoint));
}

async function setupItemRoutes(app, routePath) {
    try {
        const itemsData = await fetch(GW2_API + ITEMS_ROUTE);
        const itemsJson = await itemsData.json();
        let itemsRoutePath = routePath + ITEMS_ROUTE;
        let itemsApiEndpoint = GW2_API + ITEMS_ROUTE;

        setupRoute(app, itemsRoutePath, itemsApiEndpoint);

        for (const key in itemsJson) {
            const itemId = "/" + itemsJson[key];
            setupRoute(app, itemsRoutePath + itemId, itemsApiEndpoint + "/" + itemId);
        }
    } catch (error) {
        console.error("Error setting up item routes:", error);
    }
}

export {
    setupItemRoutes
}

