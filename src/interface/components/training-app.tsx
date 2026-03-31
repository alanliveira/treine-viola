"use client";

import { useEffect, useMemo } from "react";
import type { ChordCategory, TrainingConfig } from "@/domain/entities/training-config";
import { useTrainingSession } from "@/interface/hooks/use-training-session";
import { getChordDiagram } from "@/domain/services/chord-diagrams";
import { ChordDiagramSvg } from "@/interface/components/chord-diagram-svg";
import { WebAudioChordAdapter } from "@/infrastructure/adapters/web-audio-chord";

const defaultConfig: TrainingConfig = {
  category: "VA",
  cycleCount: 1,
  secondsPerChord: 10,
  soundEnabled: true,
  sequentialMode: false,
};

const categories: Array<{ key: ChordCategory; label: string }> = [
  { key: "VA", label: "Acordes maiores" },
  { key: "VAM", label: "Acordes menores" },
  { key: "VA7", label: "Acordes com 7ª" },
];

export function TrainingApp() {
  const { running, countdown, currentIndex, totalSteps, timeLeft, step, config, setConfig, start, stop } =
    useTrainingSession(defaultConfig);

  const chordAudio = useMemo(() => new WebAudioChordAdapter(), []);
  const currentDiagram = step ? getChordDiagram(config.category, step.position) : getChordDiagram(config.category, 1);

  useEffect(() => {
    if (config.soundEnabled && step) {
      chordAudio.play(currentDiagram.name);
    }
  }, [step, config.soundEnabled, currentDiagram.name, chordAudio]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 p-6">
      <header className="rounded-xl bg-slate-900 p-4">
        <h1 className="text-2xl font-bold text-brand">Treine Viola • Next.js</h1>
        <p className="text-sm text-slate-300">Migração legada com base em Clean Architecture + Hexagonal.</p>
      </header>

      <section className="grid gap-4 rounded-xl bg-slate-900 p-4 md:grid-cols-2">
        <label className="text-sm">
          Categoria
          <select
            className="mt-1 w-full rounded-md bg-slate-800 p-2"
            value={config.category}
            onChange={(e) => setConfig({ ...config, category: e.target.value as ChordCategory })}
            disabled={running}
          >
            {categories.map((category) => (
              <option key={category.key} value={category.key}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          Tempo por acorde (segundos)
          <input
            className="mt-1 w-full rounded-md bg-slate-800 p-2"
            type="number"
            min={5}
            max={30}
            value={config.secondsPerChord}
            onChange={(e) => setConfig({ ...config, secondsPerChord: Number(e.target.value) })}
            disabled={running}
          />
        </label>

        <label className="text-sm">
          Quantidade de ciclos
          <input
            className="mt-1 w-full rounded-md bg-slate-800 p-2"
            type="number"
            min={1}
            max={8}
            value={config.cycleCount}
            onChange={(e) => setConfig({ ...config, cycleCount: Number(e.target.value) })}
            disabled={running}
          />
        </label>

        <div className="flex items-end gap-4 pb-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.soundEnabled}
              onChange={(e) => setConfig({ ...config, soundEnabled: e.target.checked })}
              disabled={running}
            />
            Som gerado pelo sistema
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.sequentialMode}
              onChange={(e) => setConfig({ ...config, sequentialMode: e.target.checked })}
              disabled={running}
            />
            Sequencial
          </label>
        </div>
      </section>

      <section className="rounded-xl bg-slate-900 p-6 text-center">
        {!running ? (
          <button onClick={start} className="rounded-lg bg-brand px-6 py-3 font-semibold hover:bg-brand-dark">
            Iniciar treino
          </button>
        ) : (
          <button onClick={stop} className="rounded-lg bg-rose-700 px-6 py-3 font-semibold hover:bg-rose-600">
            Encerrar
          </button>
        )}

        {running && countdown > 0 && <p className="mt-4 text-3xl font-bold">Começando em {countdown}...</p>}

        {running && countdown === 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="rounded-lg bg-slate-800 p-3">
              <ChordDiagramSvg diagram={currentDiagram} />
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-800 p-3">
              <p className="text-lg font-semibold">Etapa</p>
              <p className="text-4xl font-bold text-brand">
                {currentIndex}/{totalSteps}
              </p>
              <p className="text-lg">Tempo restante</p>
              <p className="text-4xl font-bold">00:{String(timeLeft).padStart(2, "0")}</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
