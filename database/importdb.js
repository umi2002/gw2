import { MongoClient, ServerApiVersion } from "mongodb";
await import("dotenv/config");

const MONGO_URI = process.env.MONGO_URI;
const GW2_BASE_URI = "https://api.guildwars2.com/v2/";
const GW2_ITEMS_ENDPOINT = "items/";
const GW2_PRICES_ENDPOINT = "commerce/prices/";
const GW2_RECIPES_ENDPOINT = "recipes/";
const GW2_RECIPE_SEARCH_ENDPOINT = "recipes/search";
const GW2_RECIPE_OUTPUT_ENDPOINT = "?output=";
const GW2_RECIPE_INPUT_ENDPOINT = "?input=";
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
        return [];
      } else {
        console.error(`Fetch failed. Retrying in ${delay} ms...`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      }
    }
  }
}

async function importData(id, client) {
  let itemData;
  let priceData;
  let outputRecipeData;
  let inputRecipeData;

  try {
    console.log("Fetching data for item with id:", id);

    itemData = await fetchWithExponentialBackoff(
      GW2_BASE_URI + GW2_ITEMS_ENDPOINT + id,
    );
    console.log("itemData:", itemData);

    priceData = await fetchWithExponentialBackoff(
      GW2_BASE_URI + GW2_PRICES_ENDPOINT + id,
    );
    console.log("priceData:", priceData);

    const outputRecipeIds = await fetchWithExponentialBackoff(
      GW2_BASE_URI +
        GW2_RECIPE_SEARCH_ENDPOINT +
        GW2_RECIPE_OUTPUT_ENDPOINT +
        id,
    );
    console.log("outputRecipeIds:", outputRecipeIds);

    outputRecipeData = await outputRecipeIds.reduce(async (accPromise, id) => {
      const acc = await accPromise;
      const data = await fetchWithExponentialBackoff(
        GW2_BASE_URI + GW2_RECIPES_ENDPOINT + id,
      );
      acc.push(data.ingredients);
      return acc;
    }, []);
    console.log("outputRecipeData:", outputRecipeData);

    const inputRecipeIds = await fetchWithExponentialBackoff(
      GW2_BASE_URI +
        GW2_RECIPE_SEARCH_ENDPOINT +
        GW2_RECIPE_INPUT_ENDPOINT +
        id,
    );
    console.log("inputRecipeIds:", inputRecipeIds);

    inputRecipeData = await inputRecipeIds.reduce(async (accPromise, id) => {
      const acc = await accPromise;
      const data = await fetchWithExponentialBackoff(
        GW2_BASE_URI + GW2_RECIPES_ENDPOINT + id,
      );
      acc.push(data.ingredients);
      return acc;
    }, []);
    console.log("inputRecipeData:", inputRecipeData);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }

  try {
    const key = itemData.id;
    const name = itemData.name;
    const icon = itemData.icon;
    const tradeable = priceData !== [];
    const outputRecipes = outputRecipeData;
    const inputRecipes = inputRecipeData;
    const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
    await collection.updateOne(
      { id: key },
      {
        $set: {
          name: name,
          icon: icon,
          tradeable: tradeable,
          recipes: outputRecipes,
          usedIn: inputRecipes,
        },
      },
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
