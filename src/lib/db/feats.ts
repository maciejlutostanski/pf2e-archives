import { PAGE_SIZE } from "$lib/config/lists";
import { db } from "./init";
import { invoke } from "@tauri-apps/api/tauri";

export type Feat = {
  id: string;
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

type TotalCount = {
  count: number;
};

export const getFeatsByPage = async (page: number = 0): Promise<Feat[]> => {
  return invoke("get_entity_by_page", {
    entity: "feats",
    limit: 50,
    skip: PAGE_SIZE * page,
  });
};

export const getFeatsCount = async (): Promise<number> => {
  const start = new Date().getTime();
  const res = (await invoke("get_entity_count", {
    entity: "feats",
  })) as TotalCount[];
  const end = new Date().getTime();
  console.log(end - start);

  return res[0].count;
};

export const getFeatById = async (id: string): Promise<Feat> => {
  const res = (await invoke("get_entity_by_id", {
    id,
  })) as Feat[];

  return res[0];
};
