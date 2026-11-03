import { expect, test } from "bun:test";
import { Alg, Move } from "../../alg/index.ts";
import { TwistyPlayerModel } from "./TwistyPlayerModel.ts";

test("invalid move does not freeze the the twisty player (2x2x2 cube)", async () => {
  const model = new TwistyPlayerModel();
  model.puzzleIDRequest.set("2x2x2");
  model.alg.set("R U");
  model.experimentalAddMove(new Move("r")); 
  model.experimentalAddMove(new Move("R")); 
  const alg = (await model.alg.get()).alg;
  expect(alg.isIdentical(new Alg("R U R"))).toBeTrue();
  await model.currentPattern.get();
  await model.detailedTimelineInfo.get();
});

test("valid moves work on the 3x3x3 cube", async () => {
  const model = new TwistyPlayerModel();
  model.alg.set("R U");
  model.experimentalAddMove("r");
  expect((await model.alg.get()).alg.isIdentical(new Alg("R U r"))).toBeTrue();
});