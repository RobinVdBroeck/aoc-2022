import _ from "lodash";
import { win32 } from "path";

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

function second(input: string) {
  const ROCK = "rock" as const;
  const PAPER = "paper" as const;
  const SCISSORS = "scissors" as const;
  type Shapes = typeof ROCK | typeof PAPER | typeof SCISSORS;

  const WIN = "win" as const;
  const DRAW = "draw" as const;
  const LOSS = "loss" as const;
  type GameStates = typeof WIN | typeof DRAW | typeof LOSS;

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
  const STATE_LABELS = {
    X: LOSS,
    Y: DRAW,
    Z: WIN,
  };

  const calculateScore = (opponent: Shapes, state: GameStates) => {
    if (state === DRAW) {
      return 3 + SCORES[opponent];
    }
    if (state === LOSS) {
      switch (opponent) {
        case ROCK:
          return SCORES[SCISSORS];
        case PAPER:
          return SCORES[ROCK];
        case SCISSORS:
          return SCORES[PAPER];
        default:
          console.assert(false, opponent);
      }
    }
    if (state === WIN) {
      switch (opponent) {
        case ROCK:
          return 6 + SCORES[PAPER];
        case PAPER:
          return 6 + SCORES[SCISSORS];
        case SCISSORS:
          return 6 + SCORES[ROCK];
        default:
          console.assert(false, opponent);
      }
    }
  };

  return _.chain(input.split("\n"))
    .filter((line) => !_.isEmpty(line.trim()))
    .map((line) => line.split(" "))
    .map(([opponent, state]) => {
      const parsedOpponent = OPPONENT_LABELS[opponent];
      const parsedGameState = STATE_LABELS[state];
      return [parsedOpponent, parsedGameState] as [Shapes, GameStates];
    })
    .map(([opponent, state]) => calculateScore(opponent, state))
    .sum()
    .value();
}

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

    describe("second", () => {
      it("example", async () => {
        const example = await u.read("day02.1-example.txt");

        const result = second(example);
        expect(result).toBe(12);
      });
      it("result", async () => {
        const example = await u.read("day02.1-real.txt");

        const result = second(example);
        console.log(result);
      });
    });
  });
}
