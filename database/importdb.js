import fetch from "node-fetch";
import { MongoClient, ServerApiVersion } from "mongodb";
await import("dotenv/config");

const MONGO_URI = process.env.MONGO_URI;
const GW2_API_URI = "https://api.guildwars2.com/v2/items";
const DATABASE_NAME = "gw2";
const COLLECTION_NAME = "items";

async function fetchWithExponentialBackoff(endpoint, initialDelay = 1) {
    let delay = initialDelay;

    while (true) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok)
                throw new Error(
                    `HTTP Error: ${response.status} ${response.statusText}`,
                );

            return await response.json();
        } catch (error) {
            console.error(`Fetch failed. Retrying in ${delay} ms...`);
            await new Promise((res) => setTimeout(res, delay));
            delay *= 2;
        }
    }
}

async function importData(apiEndpoint, client) {
    let data;
    try {
        console.log("Fetching data from:", apiEndpoint);
        data = await fetchWithExponentialBackoff(apiEndpoint);
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return;
    }

    try {
        const key = data.id;
        const name = data.name;
        const icon = data.icon;

        const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
        await collection.updateOne(
            { id: key },
            { $set: { name: name, icon: icon } },
            { upsert: true },
        );
    } catch (error) {
        console.error("Failed to insert data into MongoDB:", error);
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

    const itemsJson = await fetchWithExponentialBackoff(GW2_API_URI);

    console.log("Importing data...");

    for (const key in itemsJson) {
        await importData(GW2_API_URI + "/" + itemsJson[key], client);
    }

    await client.close();
    console.log("Data imported successfully.");
}

importDb();
