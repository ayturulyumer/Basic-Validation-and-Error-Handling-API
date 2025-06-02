// controllers/itemController.ts
import { Router, Request, Response } from "express";
import { Item } from "../types/Item";
import {
  addItem,
  deleteItemById,
  getAllItems,
  getItemById,
  updateItem,
} from "../services/itemService";
import { validateItem } from "../middlewares/validateItem";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  try {
    const items = getAllItems();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", validateItem, (req: Request, res: Response) => {
  const { name } = req.body;
  const newItem: Item = addItem(name);
  res.status(201).json(newItem);
});

router.get("/:id", (req: Request, res: Response) => {
  const itemId = req.params.id;
  console.log(itemId);
  try {
    const item = getItemById(itemId);

    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", validateItem, (req: Request, res: Response) => {
  const itemId = req.params.id;
  const { name } = req.body;

  const updatedItem = updateItem(itemId, name);

  if (!updatedItem) {
    res.status(404).json({ message: "Item not found" });
    return;
  }
  res.status(200).json(updatedItem);
});

router.delete("/:id", (req: Request, res: Response) => {
  const itemId = req.params.id;

    const item = getItemById(itemId);
    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    deleteItemById(itemId);
    res.status(204).send();

});
export default router;
