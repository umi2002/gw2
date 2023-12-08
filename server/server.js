import express from "express";
import dbService from "./services/database.service.js";
import itemsRouter from "./routes/items.js";
await import("dotenv/config");

async function shutdown() {
    console.log("Shutting down");
    server.close(async () => {
        await dbService.disconnect();
        process.exit(0);
    });
}

const app = express();
const PORT = 3001;

app.use((req, res, next) => {
    console.log(`New HTTP request: ${req.method} ${req.url}`);
    next();
});

app.use("/items", itemsRouter);

const server = app.listen(PORT, () => {
    (async () => {
        dbService.connect();
    })();
    console.log(`Listening on port ${PORT}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
server.on("close", () => {
    console.log("Server closed");
});
