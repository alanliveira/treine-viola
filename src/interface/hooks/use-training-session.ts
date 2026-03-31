"use client";

import { useMemo, useRef, useState } from "react";
import type { TrainingConfig } from "@/domain/entities/training-config";
import { ChordSession, type TrainingStep } from "@/application/use-cases/chord-session";
import { MathRandomizerAdapter } from "@/infrastructure/adapters/math-randomizer";
import { CHORDS_PER_CATEGORY } from "@/domain/services/chord-library";

export function useTrainingSession(defaultConfig: TrainingConfig) {
  const [config, setConfig] = useState<TrainingConfig>(defaultConfig);
  const [running, setRunning] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(defaultConfig.secondsPerChord);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<TrainingStep | null>(null);

  const prepInterval = useRef<NodeJS.Timeout | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const session = useMemo(
    () => new ChordSession(config, new MathRandomizerAdapter()),
    [config],
  );

  const totalSteps = config.cycleCount * CHORDS_PER_CATEGORY;

  function clearAllTimers() {
    if (prepInterval.current) clearInterval(prepInterval.current);
    if (timerInterval.current) clearInterval(timerInterval.current);
  }

  function stop() {
    clearAllTimers();
    setRunning(false);
    setCountdown(3);
    setCurrentIndex(0);
    setTimeLeft(config.secondsPerChord);
    setStep(null);
  }

  function advance() {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      const nextStep = session.buildNextStep(prev);
      if (!nextStep) {
        stop();
        return 0;
      }
      setStep(nextStep);
      setTimeLeft(config.secondsPerChord);
      return nextIndex;
    });
  }

  function start() {
    clearAllTimers();
    setRunning(true);
    setCountdown(3);
    setTimeLeft(config.secondsPerChord);
    setCurrentIndex(0);
    setStep(null);

    prepInterval.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (prepInterval.current) clearInterval(prepInterval.current);
          advance();

          timerInterval.current = setInterval(() => {
            setTimeLeft((t) => {
              if (t <= 1) {
                advance();
                return config.secondsPerChord;
              }
              return t - 1;
            });
          }, 1000);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return {
    running,
    countdown,
    timeLeft,
    currentIndex,
    totalSteps,
    step,
    config,
    setConfig,
    start,
    stop,
  };
}
