import {
  readdirSync,
  statSync,
  readFileSync,
  writeFileSync,
  createReadStream,
  createWriteStream,
  unlinkSync,
} from "fs";
import { join, normalize } from "path";
import { createGzip } from "zlib";
import fs from "fs-extra";

prepareDbData();
copyAssets();

// ------------------- Functions ------------------------ //

function prepareDbData() {
  console.log("Preparing Database Data");
  const loadedData: any[] = [];
  const dataDir = normalize("scripts/pf2e/packs/data");
  const dbFile = normalize("static/db.json");

  loadAllData(dataDir);
  writeFileSync(dbFile, JSON.stringify(loadedData));
  compressFile(dbFile);
  console.log("Database Data Saved");

  function loadAllData(path: string) {
    readdirSync(path).forEach((file) => {
      const absolute = join(path, file);

      if (statSync(absolute).isDirectory()) {
        return loadAllData(absolute);
      } else {
        const fileData = JSON.parse(readFileSync(absolute).toString());

        delete fileData._id;

        loadedData.push(fileData);
      }
    });
  }
}

function compressFile(filePath: string) {
  const stream = createReadStream(filePath);
  stream
    .pipe(createGzip())
    .pipe(createWriteStream(`${filePath}.gz`))
    .on("finish", () => {
      console.log(`Successfully compressed the file at ${filePath}`);
      unlinkSync(filePath);
    });
}

function copyAssets() {
  console.log("Copping assets start");
  const srcDir = `scripts/pf2e/static/icons`;
  const destDir = `static/systems/pf2e/icons`;

  try {
    fs.copySync(srcDir, destDir, { overwrite: true });
  } catch (err) {
    console.error(err);
  }
  console.log("Copping assets done");
}
