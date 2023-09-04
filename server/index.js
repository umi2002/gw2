import express from "express";

import { PORT } from "./constants.js";
import { GW2_ROOT } from "./constants.js";
import { setupRoute } from "./queries.js";

const app = express();

setupRoute(app, "/gw2", GW2_ROOT + "/items");
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
