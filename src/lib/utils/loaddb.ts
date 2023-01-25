import { readDir } from "@tauri-apps/api/fs";

export async function loadDb() {
  const dataDirContent = await readDir("./data");
  console.log(dataDirContent);
}

// export async function dropDb(db: SQLite) {
//   db.execute(`DROP TABLE IF EXISTS actions`);
// }

// export async function getActions(db: SQLite) {
//   return await db.select(`SELECT * FROM actions`);
// }
