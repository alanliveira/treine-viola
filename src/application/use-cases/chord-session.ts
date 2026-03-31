import { CHORDS_PER_CATEGORY } from "@/domain/services/chord-library";
import type { TrainingConfig } from "@/domain/entities/training-config";
import type { RandomizerPort } from "@/application/ports/randomizer-port";

export interface TrainingStep {
  position: number;
  audioSrc: string;
}

export class ChordSession {
  private used = new Set<number>();
  private sequentialCursor = 0;

  constructor(
    private readonly config: TrainingConfig,
    private readonly randomizer: RandomizerPort,
  ) {}

  buildNextStep(currentStep: number): TrainingStep | null {
    if (currentStep >= this.config.cycleCount * CHORDS_PER_CATEGORY) {
      return null;
    }

    const position = this.selectPosition();

    return {
      position,
      audioSrc: `/Sounds/${this.config.category}/${this.config.category}${position}.mp3`,
    };
  }

  private selectPosition(): number {
    if (this.used.size === CHORDS_PER_CATEGORY) {
      this.used.clear();
      this.sequentialCursor = 0;
    }

    if (this.config.sequentialMode) {
      this.sequentialCursor += 1;
      this.used.add(this.sequentialCursor);
      return this.sequentialCursor;
    }

    let candidate = this.randomizer.next(CHORDS_PER_CATEGORY) + 1;
    while (this.used.has(candidate)) {
      candidate = this.randomizer.next(CHORDS_PER_CATEGORY) + 1;
    }

    this.used.add(candidate);
    return candidate;
  }
}
