import { MongoClient, ServerApiVersion } from "mongodb";
await import("dotenv/config");

class DatabaseService {
  client;
  db;

  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI as string, {
      serverApi: ServerApiVersion.v1,
    });
    this.db = this.client.db(process.env.DB);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to database");
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log("Disconnected from database");
    } catch (error) {
      console.error("Error disconnecting from database:", error);
    }
  }
}

const dbService = new DatabaseService();

export { dbService as default, DatabaseService };
