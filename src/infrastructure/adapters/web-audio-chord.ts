import type { ChordAudioPort } from "@/application/ports/chord-audio-port";

const NOTE_FREQUENCIES: Record<string, number> = {
  C: 261.63,
  Db: 277.18,
  D: 293.66,
  Eb: 311.13,
  E: 329.63,
  F: 349.23,
  Gb: 369.99,
  G: 392.0,
  Ab: 415.3,
  A: 440.0,
  Bb: 466.16,
  B: 493.88,
};

const CHORD_INTERVALS: Record<string, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  seventh: [0, 4, 7, 10],
};

function getChordType(symbol: string): keyof typeof CHORD_INTERVALS {
  if (symbol.endsWith("m")) return "minor";
  if (symbol.endsWith("7")) return "seventh";
  return "major";
}

function getRoot(symbol: string): string {
  return symbol.replace("m", "").replace("7", "");
}

function toFrequency(rootFrequency: number, semitones: number): number {
  return rootFrequency * 2 ** (semitones / 12);
}

export class WebAudioChordAdapter implements ChordAudioPort {
  private context: AudioContext | null = null;

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.context) {
      const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return null;
      this.context = new Ctx();
    }
    return this.context;
  }

  play(chordSymbol: string): void {
    const context = this.ensureContext();
    if (!context) return;

    const root = getRoot(chordSymbol);
    const rootFrequency = NOTE_FREQUENCIES[root];
    if (!rootFrequency) return;

    const now = context.currentTime;
    const gain = context.createGain();
    gain.connect(context.destination);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    const intervals = CHORD_INTERVALS[getChordType(chordSymbol)];

    intervals.forEach((semitones, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index % 2 === 0 ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(toFrequency(rootFrequency, semitones), now);
      oscillator.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + 1.7);
    });
  }
}
