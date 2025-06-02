
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
  return items.find(item => item.id === id);
}
