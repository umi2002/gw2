import express from "express";

import { PORT, ROOT_ROUTE } from "./constants.js";
import { setupItemRoutes } from "./setup_routes.js";

const app = express();

setupItemRoutes(app, ROOT_ROUTE);
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Listening on port ${PORT}`);
});
