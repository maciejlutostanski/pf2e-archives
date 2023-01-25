import NeDB from "nedb-promises";
import { promisify } from "util";
import { writable } from "svelte/store";

export const dbState = writable<{
  err: any | null;
  state: "err" | "loading" | "loaded";
}>({ err: null, state: "loading" });

export const db = NeDB.create({
  filename: "database",
  autoload: true,
  onload: async (err) => {
    console.log("test");
    if (err) {
      dbState.set({ err, state: "err" });
    } else {
      await db.ensureIndex({ fieldName: "type" });
      dbState.set({ err: null, state: "loaded" });
    }
  },
});
console.log(db);

const populateDb = async () => {
  const resp = await fetch("db.json");
  const data = await resp.json();

  // promisify(db.insert(data));

  // db.insert(data, (err, resp) => {
  //   console.log(err, resp);
  // });
};
