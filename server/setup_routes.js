import fetch from "node-fetch";

import { GW2_API, ITEMS_ROUTE } from "./constants.js";
import createApiDataFetcher from "./fetch.js";

function setupRoute(app, routePath, apiEndpoint) {
    app.get(routePath, createApiDataFetcher(apiEndpoint));
}

async function setupItems(app, routePath) {
    try {
        const itemsRoutePath = routePath + ITEMS_ROUTE;
        const itemsApiEndpoint = GW2_API + ITEMS_ROUTE;
        const itemsData = await fetch(itemsApiEndpoint);
        const itemsJson = await itemsData.json();

        setupRoute(app, itemsRoutePath, itemsApiEndpoint);

        for (const key in itemsJson) {
            const itemId = "/" + itemsJson[key];
            const itemRoutePath = itemsRoutePath + itemId;
            setupRoute(app, itemRoutePath, itemsApiEndpoint + itemId);
        }
        console.log("Item routes set up");
    } catch (error) {
        console.error("Error setting up item routes:", error);
    }
}

export {
    setupItems
}
