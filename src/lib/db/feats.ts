import { db } from "./init";

const PAGE_SIZE = 50;

export const getFeatsByPage = async (page: number = 0) => {
  return db
    .find({ name: "downtime" })
    .sort({ name: 1 })
    .skip(page * PAGE_SIZE)
    .limit(PAGE_SIZE);
};
