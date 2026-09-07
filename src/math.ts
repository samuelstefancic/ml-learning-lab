export type Point = { x: number; y: number };

export function predictLinear(x: number, w: number, b: number): number {
  return b + w * x;
}

export function errorsFor(points: Point[], w: number, b: number): number[] {
  return points.map((point) => predictLinear(point.x, w, b) - point.y);
}

export function mae(errors: number[]): number {
  if (errors.length === 0) return 0;
  return errors.reduce((sum, error) => sum + Math.abs(error), 0) / errors.length;
}

export function mse(errors: number[]): number {
  if (errors.length === 0) return 0;
  return errors.reduce((sum, error) => sum + error * error, 0) / errors.length;
}

export function rmse(errors: number[]): number {
  return Math.sqrt(mse(errors));
}

export function firstTenthForMaeAMseB(): number {
  // A errors = [1,1,1,k], B errors = [3,3,3,3].
  // Need MAE(A) < 3 and MSE(A) > 9. Search at one-decimal precision.
  for (let i = 1; i <= 300; i += 1) {
    const k = i / 10;
    const errorsA = [1, 1, 1, k];
    if (mae(errorsA) < 3 && mse(errorsA) > 9) return k;
  }
  throw new Error("No threshold found in configured range");
}
