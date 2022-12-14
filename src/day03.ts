import _ from "lodash";

import * as u from "./util.js";

function first(input: string) {
  return (
    _.chain(input.split("\n"))
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const middle = line.length / 2;
        console.assert(line.length % 2 == 0, "line not even");
        const first = line.slice(0, middle);
        const last = line.slice(middle, line.length);
        return [first, last];
      })
      // find matching
      .map(([first, last]) => {
        for (const a of first) {
          for (const b of last) {
            if (a == b) {
              return a;
            }
          }
        }
        console.error(`none matching in ${first} ${last}`);
      })
      .map((letter) => {
        const ASCII_A = "A".charCodeAt(0);
        const ASCII_a = "a".charCodeAt(0);
        if (u.isUpper(letter)) {
          return letter.charCodeAt(0) - ASCII_A + 27;
        } else if (u.isLower(letter)) {
          return letter.charCodeAt(0) - ASCII_a + 1;
        }
        console.error("invalid letter" + letter);
      })
      .sum()
      .value()
  );
}

function second(input: string) {
  return _.chain(input.split("\n"))
    .filter((line) => line.trim() !== "")
    .reduce((accum, line) => {
      if (accum.length === 0) {
        accum = [[]];
      }
      let last = _.last(accum);
      if (last.length === 3) {
        accum.push([line]);
      } else {
        last.push(line);
      }
      return accum;
    }, [] as string[][])
    .map(([first, second, third]) => {
      // find character that is in every line
      for (const a of first) {
        for (const b of second) {
          if (a === b) {
            for (const c of third) {
              if (a === c) {
                return c;
              }
            }
          }
        }
      }
      console.error("none matching");
    })
    .map((letter) => {
      const ASCII_A = "A".charCodeAt(0);
      const ASCII_a = "a".charCodeAt(0);
      if (u.isUpper(letter)) {
        return letter.charCodeAt(0) - ASCII_A + 27;
      } else if (u.isLower(letter)) {
        return letter.charCodeAt(0) - ASCII_a + 1;
      }
      console.error("invalid letter" + letter);
    })
    .sum()
    .value();
}

if (import.meta.vitest) {
  const { it, describe, expect } = import.meta.vitest;
  describe("day3", () => {
    describe("first", () => {
      it("example", async () => {
        const example = await u.read("day03.1-example.txt");

        const result = first(example);
        expect(result).toBe(157);
      });
      it("result", async () => {
        const example = await u.read("day03.1-real.txt");

        const result = first(example);
        console.log(result);
      });
    });

    describe("second", () => {
      it("example", async () => {
        const example = await u.read("day03.1-example.txt");

        const result = second(example);
        expect(result).toBe(70);
      });
      it("result", async () => {
        const example = await u.read("day03.1-real.txt");

        const result = second(example);
        console.log(result);
      });
    });
  });
}
