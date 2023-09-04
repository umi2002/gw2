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

function setupGW2Route(app) {
    app.get("/gw2", fetchGW2Root);
}

export {
    setupGW2Route
}
