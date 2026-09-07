import assert from "node:assert/strict";
import test from "node:test";
import { errorsFor, firstTenthForMaeAMseB, mae, mse, predictLinear, rmse } from "../src/math.js";

test("linear prediction uses b + w*x", () => {
  assert.equal(predictLinear(4, 3, 2), 14);
});

test("MSE and RMSE are calculated from residuals", () => {
  const errors = [2, -2, -5];
  assert.equal(mae(errors), 3);
  assert.equal(mse(errors), 11);
  assert.ok(Math.abs(rmse(errors) - Math.sqrt(11)) < 1e-12);
});

test("fit residuals are correct", () => {
  const errors = errorsFor(
    [
      { x: 1, y: 5 },
      { x: 2, y: 8 },
      { x: 3, y: 11 }
    ],
    3,
    2
  );
  assert.deepEqual(errors, [0, 0, 0]);
  assert.equal(mse(errors), 0);
});

test("decimal outlier mission accepts tenths and first valid tenth is 5.8", () => {
  assert.equal(firstTenthForMaeAMseB(), 5.8);
  const errorsA = [1, 1, 1, 5.8];
  assert.ok(mae(errorsA) < 3);
  assert.ok(mse(errorsA) > 9);
});
