import { PAGE_SIZE } from "$lib/config/lists";
import { db } from "./init";

export type Feat = {
  name: string;
  img: string;
  system: {
    traits: {
      rarity: string; // TODO: Better typing
      value: string[];
    };
    source: {
      value: string; // TODO: Better typing
    };
    level: {
      value: number;
    };
    prerequisites: {
      value: {
        value: string;
      }[];
    };
    description: {
      value: string;
    };
  };
};

export const getFeatsByPage = async (page: number = 0) => {
  return db
    .find<Feat>({ type: "feat" })
    .sort({ name: 1 })
    .skip(PAGE_SIZE * page)
    .limit(100);
};

export const getFeatsCount = async () => {
  return db.count({ type: "feat" });
};

export const getFeatByName = async (_id: string) => {
  return db.findOne<Feat>({ _id, type: "feat" });
};
