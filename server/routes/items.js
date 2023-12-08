import express from "express";
import HTTP_STATUS from "../utils/http.js";
import ItemsService from "../services/items.service.js";

const router = express.Router();
const itemsService = new ItemsService();

router.get("/", async (req, res) => {
    try {
        const search = req.query.search;
        const results = await itemsService.filterItemsByName(search);
        res.status(HTTP_STATUS.SUCCESS).json(results);
    } catch (error) {
        res.status(HTTP_STATUS.SERVER_ERROR).json({ error: error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const item = await itemsService.getItemById(id);
        res.status(HTTP_STATUS.SUCCESS).json(item);
    } catch (error) {
        res.status(HTTP_STATUS.SERVER_ERROR).json({ error: error });
    }
});

export default router;
