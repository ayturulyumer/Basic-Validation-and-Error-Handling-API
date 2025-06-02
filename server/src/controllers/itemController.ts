// controllers/itemController.ts
import { Router, Request, Response } from "express";
import { Item } from "../types/Item";
import {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
} from "../services/itemService";

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

router.post("/", (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Item name is required" });
      return;
    }

    const newItem: Item = addItem(name);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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

router.put("/:id", (req: Request, res: Response) => {
  const itemId = req.params.id;
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Item name is required" });
    return;
  }

  try {
    const updatedItem = updateItem(itemId, name); 
    
    if (!updatedItem) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
