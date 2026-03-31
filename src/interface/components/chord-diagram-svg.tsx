import type { ChordDiagram } from "@/domain/services/chord-diagrams";

interface ChordDiagramSvgProps {
  diagram: ChordDiagram;
}

const STRINGS = 6;
const FRETS = 5;
const WIDTH = 260;
const HEIGHT = 320;
const LEFT = 40;
const TOP = 70;
const GRID_WIDTH = 180;
const GRID_HEIGHT = 200;

function getStringX(string: number): number {
  const spacing = GRID_WIDTH / (STRINGS - 1);
  return LEFT + (STRINGS - string) * spacing;
}

function getFretY(fret: number): number {
  const spacing = GRID_HEIGHT / FRETS;
  return TOP + (fret - 0.5) * spacing;
}

export function ChordDiagramSvg({ diagram }: ChordDiagramSvgProps) {
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mx-auto h-[320px] w-[260px] rounded-md bg-slate-900 p-2">
      <text x={WIDTH / 2} y={36} textAnchor="middle" className="fill-slate-100 text-2xl font-bold">
        {diagram.name}
      </text>

      {Array.from({ length: STRINGS }).map((_, idx) => {
        const string = idx + 1;
        const x = getStringX(string);
        return <line key={`string-${string}`} x1={x} y1={TOP} x2={x} y2={TOP + GRID_HEIGHT} stroke="#cbd5e1" strokeWidth="2" />;
      })}

      {Array.from({ length: FRETS + 1 }).map((_, idx) => {
        const y = TOP + idx * (GRID_HEIGHT / FRETS);
        return (
          <line
            key={`fret-${idx}`}
            x1={LEFT}
            y1={y}
            x2={LEFT + GRID_WIDTH}
            y2={y}
            stroke="#cbd5e1"
            strokeWidth={idx === 0 ? 6 : 2}
          />
        );
      })}

      {diagram.points.map((point, index) => (
        <circle
          key={`${point.string}-${point.fret}-${index}`}
          cx={getStringX(point.string)}
          cy={getFretY(point.fret)}
          r="9"
          fill="#fb7185"
          stroke="#9f1239"
          strokeWidth="2"
        />
      ))}

      {diagram.opens?.map((string) => (
        <circle
          key={`open-${string}`}
          cx={getStringX(string)}
          cy={TOP - 20}
          r="7"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
        />
      ))}

      {diagram.mutes?.map((string) => (
        <text key={`mute-${string}`} x={getStringX(string)} y={TOP - 16} textAnchor="middle" className="fill-rose-400 text-lg font-bold">
          X
        </text>
      ))}
    </svg>
  );
}
