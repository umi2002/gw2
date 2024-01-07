import express from "express";
import HTTP_STATUS from "../utils/http.js";
import ItemsService from "../services/items.service.js";
import { ItemType, CommerceData } from "../utils/types.js";

const router = express.Router();
const itemsService = new ItemsService();

router.get("/", async (req, res) => {
  try {
    const search: string = req.query.search as string;
    const results: ItemType[] = await itemsService.filterItemsByName(search);
    res.status(HTTP_STATUS.SUCCESS).json(results);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    const item: ItemType | null = await itemsService.getItemById(id);

    if (!item) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Item not found" });
      return;
    }

    if (item.tradeable) {
      const prices: CommerceData | null = await itemsService.getPricesById(id);
      if (prices) {
        item.buys = prices.buys;
        item.sells = prices.sells;
      }
    } else {
      item.buys = {};
      item.sells = {};
    }
    res.status(HTTP_STATUS.SUCCESS).json(item);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json({ error: error });
  }
});

export default router;
