import _ from "lodash";

import * as u from "./util.js";

function first(input: string) {
  return _.chain(input.split("\n\n"))
    .map((lines) => lines.split("\n").map((x) => Number.parseInt(x, 10)))
    .map(_.sum)
    .max()
    .value();
}

function second(input: string) {
  return _.chain(input.split("\n\n"))
    .map((lines) => lines.split("\n").map((x) => Number.parseInt(x, 10)))
    .map(_.sum)
    .sort((a, b) => b - a)
    .take(3)
    .sum()
    .value();
}

if (import.meta.vitest) {
  const { it, describe, expect } = import.meta.vitest;
  describe("day1", () => {
    describe("first", () => {
      it("example", async () => {
        const example = await u.read("day01.1-example.txt");

        const result = first(example);
        expect(result).toBe(24000);
      });
      it("result", async () => {
        const example = await u.read("day01.1-real.txt");

        const result = first(example);
        console.log(result);
      });
    });

    describe("second", () => {
      it("example", async () => {
        const example = await u.read("day01.1-example.txt");

        const result = second(example);
        expect(result).toBe(41000);
      });
      it("result", async () => {
        const example = await u.read("day01.1-real.txt");

        const result = second(example);
        console.log(result);
      });
    });
  });
}
