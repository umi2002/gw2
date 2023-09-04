import express from "express";

import { PORT } from "./constants.js";
import { setupGW2Route } from "./queries.js";

const app = express();

setupGW2Route(app);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
