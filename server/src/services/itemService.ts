import { v4 as uuidv4 } from "uuid";
import { Item } from "../types/Item";

let items: Item[] = [];

export function getAllItems(): Item[] {
  return items;
}

export function addItem(name: string): Item {
  const newItem: Item = { id: uuidv4(), name };
  items.push(newItem);
  return newItem;
}

export function getItemById(id: string): Item | undefined {
  return items.find((item) => item.id === id);
}

export function updateItem(id: string, name: string): Item | undefined {
  const itemIndex = items.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return undefined;
  }

  items[itemIndex].name = name;
  return items[itemIndex];
}

// src/services/itemsService.ts
export function deleteItemById(id: string): void {
  items = items.filter(item => item.id !== id);
}
