import type { ChordCategory } from "@/domain/entities/training-config";

export interface ChordPoint {
  string: 1 | 2 | 3 | 4 | 5 | 6;
  fret: number;
}

export interface ChordDiagram {
  name: string;
  points: ChordPoint[];
  mutes?: Array<1 | 2 | 3 | 4 | 5 | 6>;
  opens?: Array<1 | 2 | 3 | 4 | 5 | 6>;
}

const VA_DIAGRAMS: Record<number, ChordDiagram> = {
  1: { name: "C", points: [{ string: 5, fret: 3 }, { string: 4, fret: 2 }, { string: 2, fret: 1 }], mutes: [6], opens: [1, 3] },
  2: { name: "D", points: [{ string: 3, fret: 2 }, { string: 1, fret: 2 }, { string: 2, fret: 3 }], mutes: [6, 5], opens: [4] },
  3: { name: "E", points: [{ string: 3, fret: 1 }, { string: 5, fret: 2 }, { string: 4, fret: 2 }], opens: [1, 2, 6] },
  4: { name: "F", points: [{ string: 1, fret: 1 }, { string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 3 }, { string: 5, fret: 3 }, { string: 6, fret: 1 }] },
  5: { name: "G", points: [{ string: 6, fret: 3 }, { string: 5, fret: 2 }, { string: 1, fret: 3 }], opens: [2, 3, 4] },
  6: { name: "A", points: [{ string: 4, fret: 2 }, { string: 3, fret: 2 }, { string: 2, fret: 2 }], mutes: [6], opens: [1, 5] },
  7: { name: "B", points: [{ string: 5, fret: 2 }, { string: 4, fret: 4 }, { string: 3, fret: 4 }, { string: 2, fret: 4 }, { string: 1, fret: 2 }] },
};

const VAM_DIAGRAMS: Record<number, ChordDiagram> = {
  1: { name: "Cm", points: [{ string: 5, fret: 3 }, { string: 4, fret: 5 }, { string: 3, fret: 5 }, { string: 2, fret: 4 }, { string: 1, fret: 3 }], mutes: [6] },
  2: { name: "Dm", points: [{ string: 1, fret: 1 }, { string: 3, fret: 2 }, { string: 2, fret: 3 }], mutes: [6, 5], opens: [4] },
  3: { name: "Em", points: [{ string: 5, fret: 2 }, { string: 4, fret: 2 }], opens: [1, 2, 3, 6] },
  4: { name: "Fm", points: [{ string: 1, fret: 1 }, { string: 2, fret: 1 }, { string: 3, fret: 1 }, { string: 4, fret: 3 }, { string: 5, fret: 3 }, { string: 6, fret: 1 }] },
  5: { name: "Gm", points: [{ string: 6, fret: 3 }, { string: 5, fret: 5 }, { string: 4, fret: 5 }, { string: 3, fret: 3 }, { string: 2, fret: 3 }, { string: 1, fret: 3 }] },
  6: { name: "Am", points: [{ string: 4, fret: 2 }, { string: 3, fret: 2 }, { string: 2, fret: 1 }], mutes: [6], opens: [1, 5] },
  7: { name: "Bm", points: [{ string: 5, fret: 2 }, { string: 4, fret: 4 }, { string: 3, fret: 4 }, { string: 2, fret: 3 }, { string: 1, fret: 2 }] },
};

const VA7_DIAGRAMS: Record<number, ChordDiagram> = {
  1: { name: "C7", points: [{ string: 5, fret: 3 }, { string: 4, fret: 2 }, { string: 2, fret: 1 }, { string: 3, fret: 3 }], mutes: [6], opens: [1] },
  2: { name: "D7", points: [{ string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 1, fret: 2 }], mutes: [6, 5], opens: [4] },
  3: { name: "E7", points: [{ string: 3, fret: 1 }, { string: 5, fret: 2 }], opens: [1, 2, 4, 6] },
  4: { name: "F7", points: [{ string: 1, fret: 1 }, { string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 1 }, { string: 5, fret: 3 }, { string: 6, fret: 1 }] },
  5: { name: "G7", points: [{ string: 6, fret: 3 }, { string: 5, fret: 2 }, { string: 1, fret: 1 }], opens: [2, 3, 4] },
  6: { name: "A7", points: [{ string: 4, fret: 2 }, { string: 2, fret: 2 }], mutes: [6], opens: [1, 3, 5] },
  7: { name: "B7", points: [{ string: 5, fret: 2 }, { string: 3, fret: 2 }, { string: 4, fret: 1 }, { string: 1, fret: 2 }], opens: [2] },
};

const DIAGRAM_BY_CATEGORY: Record<ChordCategory, Record<number, ChordDiagram>> = {
  VA: VA_DIAGRAMS,
  VAM: VAM_DIAGRAMS,
  VA7: VA7_DIAGRAMS,
};

export function getChordDiagram(category: ChordCategory, position: number): ChordDiagram {
  const fallback = { name: "Acorde", points: [] } satisfies ChordDiagram;
  return DIAGRAM_BY_CATEGORY[category]?.[position] ?? fallback;
}
