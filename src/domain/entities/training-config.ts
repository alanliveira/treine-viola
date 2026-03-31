export type ChordCategory = "VA" | "VAM" | "VA7";

export interface TrainingConfig {
  category: ChordCategory;
  cycleCount: number;
  secondsPerChord: number;
  soundEnabled: boolean;
  sequentialMode: boolean;
}
