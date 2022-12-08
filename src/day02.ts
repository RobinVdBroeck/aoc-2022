import _ from "lodash";
import * as u from "./util.js";

function first(input: string) {
  const ROCK = "rock" as const;
  const PAPER = "paper" as const;
  const SCISSORS = "scissors" as const;
  type Shapes = typeof ROCK | typeof PAPER | typeof SCISSORS;

  const SCORES = {
    [ROCK]: 1,
    [PAPER]: 2,
    [SCISSORS]: 3,
  };
  const OPPONENT_LABELS = {
    A: ROCK,
    B: PAPER,
    C: SCISSORS,
  };
  const MY_LABELS = {
    X: ROCK,
    Y: PAPER,
    Z: SCISSORS,
  };

  const calculateScore = (me: Shapes, opponent: Shapes) => {
    const baseScore = SCORES[me];

    // draw
    if (me == opponent) {
      return 3 + baseScore;
    }

    const won =
      (me === ROCK && opponent === SCISSORS) ||
      (me === PAPER && opponent === ROCK) ||
      (me === SCISSORS && opponent === PAPER);
    if (won) {
      return 6 + baseScore;
    }
    return 0 + baseScore;
  };

  return _.chain(input.split("\n"))
    .filter((line) => !_.isEmpty(line.trim()))
    .map((line) => line.split(" "))
    .map(([opponent, me]) => {
      const parsedOpponent = OPPONENT_LABELS[opponent];
      const parsedMe = MY_LABELS[me];
      return [parsedOpponent, parsedMe] as [Shapes, Shapes];
    })
    .map(([opponent, me]) => calculateScore(me, opponent))
    .sum()
    .value();
}

function second(input: string) {}

if (import.meta.vitest) {
  const { it, describe, expect } = import.meta.vitest;
  describe("day2", () => {
    describe("first", () => {
      it("example", async () => {
        const example = await u.read("day02.1-example.txt");

        const result = first(example);
        expect(result).toBe(15);
      });
      it("result", async () => {
        const example = await u.read("day02.1-real.txt");

        const result = first(example);
        console.log(result);
      });
    });

    describe.skip("second", () => {
      it("example", async () => {
        const example = await u.read("day02.2-example.txt");
      });
      it("result", async () => {
        const example = await u.read("day02.2-real.txt");
      });
    });
  });
}
