import { db } from "./init";

export const getActions = async () => {
  return db.find<{ name: string }>({ type: "action" }).sort({ name: 1 });
};
