import { Category, setItems } from 'database/class';
import items from "./items.json";

export const training_code: Category = new Category({
  title: "Training Code",
  description: "Explore a comprehensive list of coding training platforms to enhance your programming skills.",
  items: setItems(items)
});