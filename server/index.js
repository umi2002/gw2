import express from "express";

import { PORT } from "./constants.js";
import { setupRoute } from "./queries.js";

const app = express();

setupRoute("/gw2", app);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
