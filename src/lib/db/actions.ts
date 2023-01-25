import { db } from "./init";

const PAGE_SIZE = 50;

export const getActionsByPage = async (page: number = 0) => {
  return db
    .find({ type: "action" })
    .sort({ name: 1 })
    .skip(page * PAGE_SIZE)
    .limit(PAGE_SIZE);
};
