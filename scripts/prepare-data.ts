import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, normalize } from "path";

const loadedData: any[] = [];
const dataDir = normalize("scripts/data");
let counter = 0;

console.log(dataDir);

loadAllData(dataDir);

writeFileSync(normalize("scripts/test.json"), JSON.stringify(loadedData));

function loadAllData(path: string) {
  readdirSync(path).forEach((file) => {
    const absolute = join(path, file);

    if (statSync(absolute).isDirectory()) {
      return loadAllData(absolute);
    } else {
      const fileData = JSON.parse(readFileSync(absolute).toString());

      if (loadedData.findIndex((item) => item._id === fileData._id) === -1) {
        loadedData.push(fileData);
      }
    }
  });
}
