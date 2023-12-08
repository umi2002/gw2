import { MongoClient, ServerApiVersion } from "mongodb";
await import("dotenv/config");

const MONGO_URI = process.env.MONGO_URI;
const GW2_BASE_URI = "https://api.guildwars2.com/v2/";
const GW2_ITEMS_ENDPOINT = "items/";
const GW2_PRICES_ENDPOINT = "commerce/prices/";
const DATABASE_NAME = "gw2";
const COLLECTION_NAME = "items";

async function fetchWithExponentialBackoff(endpoint, initialDelay = 1) {
    let delay = initialDelay;

    while (true) {
        const response = await fetch(endpoint);
        if (response.ok) {
            return await response.json();
        } else {
            if (response.status === 404) {
                return null;
            } else if (response.status === 429) {
                console.error(`Fetch failed. Retrying in ${delay} ms...`);
                await new Promise((res) => setTimeout(res, delay));
                delay *= 2;
            } else {
                throw new Error(
                    `HTTP Error: ${response.status} ${response.statusText}`,
                );
            }
        }
    }
}

async function importData(id, client) {
    let itemData;
    let priceData;
    try {
        console.log("Fetching data from id:", id);
        itemData = await fetchWithExponentialBackoff(
            GW2_BASE_URI + GW2_ITEMS_ENDPOINT + id,
        );
        priceData = await fetchWithExponentialBackoff(
            GW2_BASE_URI + GW2_PRICES_ENDPOINT + id,
        );
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return;
    }

    try {
        const key = itemData.id;
        const name = itemData.name;
        const icon = itemData.icon;
        const tradeable = priceData !== null;
        const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
        await collection.updateOne(
            { id: key },
            { $set: { name: name, icon: icon, tradeable: tradeable } },
            { upsert: true },
        );
    } catch (error) {
        console.error("Failed to insert itemData into MongoDB:", error);
    }
}

async function importDb() {
    const client = new MongoClient(MONGO_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        await client.connect();
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        return;
    }

    const itemsJson = await fetchWithExponentialBackoff(
        GW2_BASE_URI + GW2_ITEMS_ENDPOINT,
    );

    console.log("Importing data...");

    for (const key in itemsJson) {
        await importData(itemsJson[key], client);
    }

    await client.close();
    console.log("Data imported successfully.");
}

importDb();
