import NeDB from "nedb-promises";
import { writable } from "svelte/store";

export const dbState = writable<{
  err: any | null;
  state: "err" | "loading" | "loaded";
}>({ err: null, state: "loading" });

export const db = NeDB.create({
  filename: "database",
  autoload: true,
  onload: async (err) => {
    if (err) {
      dbState.set({ err, state: "err" });
    } else {
      await db.ensureIndex({ fieldName: "type" });
      dbState.set({ err: null, state: "loaded" });
    }
  },
});

export const seedDb = async () => {
  const resp = await fetch("db.json.gz");
  const data = await resp.json();

  return db.insert<any[]>(data);
};
