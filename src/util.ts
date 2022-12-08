import * as fs from "fs/promises";
import path from "path";

export function read(filename: string): Promise<string> {
  return fs
    .readFile(path.join(__dirname, filename))
    .then((buffer) => buffer.toString());
}
