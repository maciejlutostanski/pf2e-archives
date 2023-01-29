// const Surreal = require("surrealdb.js");
import { readFileSync } from "fs";
import { normalize } from "path";
import Surreal from "surrealdb.js";

const db = new Surreal("http://127.0.0.1:8000/rpc");

async function main() {
  try {
    await db.use("ns", "pf2");
    let path = normalize("src-tauri/db/feat.json");
    const file = JSON.parse(readFileSync(path).toString());
    console.log(file);

    file.forEach(async (item: any) => {
      let updated = await db.change("feat", item);
      console.log(updated);
    });
  } catch (e) {
    console.error("ERROR", e);
  }
}

main();
