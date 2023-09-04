import fetch from "node-fetch";

import { GW2_ROOT } from "./constants.js";

async function fetchGW2Root(req, res) {
    try {
        const data = await fetch(GW2_ROOT);
        const jsonData = await data.json();
        res.json(jsonData);
    } catch (error) {
        console.error('Error fetching API data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

function setupRoute(route, app) {
    app.get(route, fetchGW2Root);
}

export {
    setupRoute
}
