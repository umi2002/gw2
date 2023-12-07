import { MongoClient, ServerApiVersion } from "mongodb";

class DatabaseService {
    constructor(uri) {
        this.client = new MongoClient(uri, {
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });
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

export default DatabaseService;
