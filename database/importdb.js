import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';

const MONGO_URL = "mongodb://localhost:27017";
const SERVER_URL = "http://localhost:3001";
const ROOT_ROUTE = "/gw2";
const ITEMS_ROUTE = "/items";
const DATABASE_NAME = "gw2";
const COLLECTION_NAME = "items";

async function fetchWithExponentialBackoff(endpoint, initialDelay = 1) {
    let delay = initialDelay;

    while (true) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            return await response.json(); // directly returning the parsed JSON
        } catch (error) {
            console.error(`Fetch failed. Retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
            delay *= 2;
        }
    }
}

async function importData(apiEndpoint) {
    let data;
    try {
        data = await fetchWithExponentialBackoff(apiEndpoint);
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return;
    }

    const client = new MongoClient(MONGO_URL);

    try {
        await client.connect();

        const key = data["id"];
        const name = data["name"];

        const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
        await collection.updateOne({ id: key }, { $set: { name: name } }, { upsert: true });
    } catch (error) {
        console.error('Failed to insert data into MongoDB:', error);
    } finally {
        await client.close();
    }
}

async function importDb() {
    const itemsServerEndpoint = SERVER_URL + ROOT_ROUTE + ITEMS_ROUTE;
    const itemsJson = await fetchWithExponentialBackoff(itemsServerEndpoint);

    console.log('Importing data...');

    for (const key in itemsJson) {
        await importData(itemsServerEndpoint + "/" + itemsJson[key]);
    }
    console.log('Data imported successfully.');
}

importDb();
