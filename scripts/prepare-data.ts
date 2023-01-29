import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, normalize } from "path";
import { gzipSync } from "zlib";
import fs from "fs-extra";

prepareDbData();
copyAssets();

// ------------------- Functions ------------------------ //

function prepareDbData() {
  const startTime = new Date().getTime();
  console.log("Preparing Database");
  const loadedData: any[] = [];
  let loadedDataTypes: any = {};

  const dataDir = normalize("scripts/pf2e/packs/data");
  const dbFile = normalize("static/db.json.gz");

  try {
    loadAllData(dataDir);

    if (!fs.existsSync(normalize("src-tauri/db"))) {
      fs.mkdirSync(normalize("src-tauri/db"));
    }

    Object.keys(loadedDataTypes).forEach((key) => {
      // writeFileSync(dbFile, gzipSync(JSON.stringify(loadedData)));
      fs.writeFileSync(
        normalize(`src-tauri/db/${key}.json`),
        JSON.stringify(loadedDataTypes[key])
      );
    });

    const endTime = new Date().getTime();
    console.log(`Finished in: ${endTime - startTime}ms`);
  } catch (err) {
    console.error(err);
  }
  return;

  function loadAllData(path: string) {
    readdirSync(path).forEach((file) => {
      const absolute = join(path, file);

      if (statSync(absolute).isDirectory()) {
        return loadAllData(absolute);
      } else {
        const fileData = JSON.parse(readFileSync(absolute).toString());

        delete fileData._id;

        if (!loadedDataTypes[fileData.type]) {
          loadedDataTypes[fileData.type] = [];
        }

        loadedDataTypes[fileData.type].push(fileData);
      }
    });
  }
}

// async function compressFile(filePath: string) {
//   const stream = createReadStream(filePath);
//   stream.pipe(createGzip()).pipe(createWriteStream(`${filePath}.gz`));

//   await new Promise((resolve, reject) => {
//     stream.on("finish", resolve);
//     stream.on("error", reject);
//   });

//   return;
// }

function copyAssets() {
  const startTime = new Date().getTime();
  console.log("Copping assets");
  const srcDir = `scripts/pf2e/static/icons`;
  const destDir = `static/systems/pf2e/icons`;

  try {
    fs.copySync(srcDir, destDir, { overwrite: true });
  } catch (err) {
    console.error(err);
  }
  const endTime = new Date().getTime();
  console.log(`Finished in: ${endTime - startTime}ms`);
}
