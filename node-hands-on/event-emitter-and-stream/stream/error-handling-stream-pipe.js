import fs from "fs";
import path from "path";
import stream from "stream";
import { pathToDataDir, pathToDestTxt } from "./pathToData.js";

const pathToNoSuchTxt = path.join(pathToDataDir, "no-such-file.txt");

await new Promise((_, reject) => {
  const callback = (err) => reject(err.message);
  fs.createReadStream(pathToNoSuchTxt)
    .on("error", callback)
    .pipe(fs.createWriteStream(pathToDestTxt))
    .on("error", callback);
}).catch(err => console.log(err));

console.log(Array(20).fill("-----").join(""));

stream.pipeline(
  fs.createReadStream(pathToNoSuchTxt),
  fs.createWriteStream(pathToDestTxt),
  (err) =>
    err ? console.log("err : ", err.message) : console.log("complete!!")
);
