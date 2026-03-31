import type { RandomizerPort } from "@/application/ports/randomizer-port";

export class MathRandomizerAdapter implements RandomizerPort {
  next(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
