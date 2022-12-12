import * as fs from "fs/promises";
import path from "path";

export function read(filename: string): Promise<string> {
  return fs
    .readFile(path.join(__dirname, filename))
    .then((buffer) => buffer.toString());
}

export function isUpper(str: string): boolean {
  return str === str.toUpperCase();
}

export function isLower(str: string): boolean {
  return str === str.toLowerCase();
}

export function reverseCasing(str: string): string {
  if (isLower(str)) {
    return str.toUpperCase();
  }
  if (isUpper(str)) {
    return str.toLowerCase();
  }
  return "";
}
