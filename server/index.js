import express from "express";
import { PORT, ROOT_ROUTE } from "./constants.js";
import { setupItems } from "./setup_routes.js";


async function main() {
    const app = express();

    try {
        await setupItems(app, ROOT_ROUTE);
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error during setup:", error);
        client.shutdown();
        process.exit(1);
    }
}

main();
