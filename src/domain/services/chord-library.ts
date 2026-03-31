import type { ChordCategory } from "@/domain/entities/training-config";

export const CHORDS_PER_CATEGORY = 7;

export function getChordImage(category: ChordCategory, position: number): string {
  return `/${category}/${category}${position}.png`;
}

export function getChordAudio(category: ChordCategory, position: number): string {
  return `/Sounds/${category}/${category}${position}.mp3`;
}
