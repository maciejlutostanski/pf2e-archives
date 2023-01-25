import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, normalize } from "path";
import { encode } from "msgpack-lite";

const loadedData: any[] = [];
const dataDir = normalize("scripts/data");

loadAllData(dataDir);
writeFileSync(normalize("scripts/test.msp"), encode(loadedData));

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
