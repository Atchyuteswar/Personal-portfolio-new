"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

// Warm Jazz / Study Chord Progression (Frequencies in Hz)
// I: Fmaj9 (F3, A3, C4, E4, G4)
// ii: Em7 (E3, G3, B3, D4, G4)
// iii: Dm9 (D3, F3, A3, C4, E4)
// IV: Cmaj9 (C3, E3, G3, B3, D4)
const STUDY_CHORDS = [
  [174.61, 220.0, 261.63, 329.63, 392.0],
  [164.81, 196.0, 246.94, 293.66, 392.0],
  [146.83, 174.61, 220.0, 261.63, 329.63],
  [130.81, 164.81, 196.0, 246.94, 293.66],
];

const MELODY_NOTES = [523.25, 587.33, 659.25, 783.99, 880.0, 659.25, 587.33, 523.25];

export default function AmbientMusicPlayer() {
  const { musicConfig } = portfolioData.profile;
  const [isPlaying, setIsPlaying] = useState(false);
  const [waitingForInteraction, setWaitingForInteraction] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(musicConfig.defaultVolume ?? 0.35);
  const [trackIndex, setTrackIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const userManuallyPausedRef = useRef(false);
  const chordStepRef = useRef(0);

  const currentTrack = musicConfig.tracks[trackIndex] || musicConfig.tracks[0];
  const hasCustomMp3 = Boolean(musicConfig.customMp3Url && musicConfig.customMp3Url.trim() !== "");

  // Clean up synth timers
  const stopSynthLoop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Trigger a single warm chord + subtle bell note in Web Audio API
  const triggerChordStep = useCallback(
    (ctx: AudioContext, destination: AudioNode, mode: string) => {
      if (ctx.state !== "running") return;

      const now = ctx.currentTime;
      const step = chordStepRef.current;
      const chord = STUDY_CHORDS[step % STUDY_CHORDS.length];
      chordStepRef.current += 1;

      // Low-pass filter for warm muffled lo-fi / library piano tone
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(mode === "drone" ? 420 : 780, now);
      filter.Q.setValueAtTime(0.7, now);
      filter.connect(destination);

      const duration = mode === "drone" ? 5.5 : 4.2;

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        // Slight detune for warm chorus richness
        const detuneCents = (idx - 2) * 3.5;
        osc.frequency.setValueAtTime(mode === "drone" ? freq * 0.5 : freq, now);
        osc.detune.setValueAtTime(detuneCents, now);

        const stagger = idx * 0.06;
        const peakGain = mode === "drone" ? 0.055 : 0.045;

        noteGain.gain.setValueAtTime(0.0001, now + stagger);
        noteGain.gain.linearRampToValueAtTime(peakGain, now + stagger + 0.6);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + stagger + duration);

        osc.connect(noteGain);
        noteGain.connect(filter);

        osc.start(now + stagger);
        osc.stop(now + stagger + duration + 0.05);
      });

      // Gentle upper harmonic chime in 'chords' mode
      if (mode === "chords") {
        const bellOsc = ctx.createOscillator();
        const bellGain = ctx.createGain();
        const melodyFreq = MELODY_NOTES[step % MELODY_NOTES.length];

        bellOsc.type = "sine";
        bellOsc.frequency.setValueAtTime(melodyFreq, now + 0.8);

        bellGain.gain.setValueAtTime(0.0001, now + 0.8);
        bellGain.gain.linearRampToValueAtTime(0.022, now + 1.0);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        bellOsc.connect(bellGain);
        bellGain.connect(filter);

        bellOsc.start(now + 0.8);
        bellOsc.stop(now + 3.3);
      }
    },
    []
  );

  // Start playback (either Custom MP3 or Web Audio Synth)
  const startPlayback = useCallback(async () => {
    try {
      if (hasCustomMp3) {
        if (!htmlAudioRef.current) {
          const audio = new Audio(musicConfig.customMp3Url);
          audio.loop = true;
          audio.volume = isMuted ? 0 : volume;
          htmlAudioRef.current = audio;
        }
        await htmlAudioRef.current.play();
        setIsPlaying(true);
        setWaitingForInteraction(false);
        return true;
      }

      // Generative Web Audio API Synth
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        const ctx = new AudioCtx();
        const master = ctx.createGain();
        master.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
        master.connect(ctx.destination);
        audioCtxRef.current = ctx;
        masterGainRef.current = master;
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      if (ctx.state === "running" && masterGainRef.current) {
        stopSynthLoop();
        const mode = currentTrack.mode || "chords";
        triggerChordStep(ctx, masterGainRef.current, mode);
        intervalRef.current = setInterval(() => {
          if (audioCtxRef.current && masterGainRef.current) {
            triggerChordStep(audioCtxRef.current, masterGainRef.current, mode);
          }
        }, 4000);

        setIsPlaying(true);
        setWaitingForInteraction(false);
        return true;
      } else {
        setWaitingForInteraction(true);
        return false;
      }
    } catch {
      // Browser blocked unmuted autoplay until first user interaction
      setWaitingForInteraction(true);
      return false;
    }
  }, [
    hasCustomMp3,
    musicConfig.customMp3Url,
    isMuted,
    volume,
    stopSynthLoop,
    currentTrack.mode,
    triggerChordStep,
  ]);

  const pausePlayback = useCallback(() => {
    stopSynthLoop();
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  }, [stopSynthLoop]);

  const togglePlay = () => {
    if (isPlaying) {
      userManuallyPausedRef.current = true;
      pausePlayback();
    } else {
      userManuallyPausedRef.current = false;
      startPlayback();
    }
  };

  // Sync volume & mute changes in real time
  useEffect(() => {
    const effectiveVol = isMuted ? 0 : volume;
    if (htmlAudioRef.current) {
      htmlAudioRef.current.volume = effectiveVol;
    }
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        effectiveVol,
        audioCtxRef.current.currentTime,
        0.08
      );
    }
  }, [volume, isMuted]);

  // Restart synth loop when track mode changes while playing
  useEffect(() => {
    if (isPlaying && !hasCustomMp3) {
      startPlayback();
    }
  }, [trackIndex, isPlaying, hasCustomMp3, startPlayback]);

  // Autoplay on initial visit + seamless unlock on first user interaction
  useEffect(() => {
    if (!musicConfig.enabled || !musicConfig.autoplayOnVisit) return;

    let unlocked = false;

    const attemptAutoStart = async () => {
      if (unlocked || userManuallyPausedRef.current) return;
      const ok = await startPlayback();
      if (ok) {
        unlocked = true;
        removeInteractionListeners();
      }
    };

    const handleFirstInteraction = () => {
      if (!unlocked && !userManuallyPausedRef.current) {
        attemptAutoStart();
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };

    // 1. Try immediate autoplay on load
    attemptAutoStart();

    // 2. If browser policy suspends audio until first gesture, unlock on very first tap/click
    window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
    window.addEventListener("keydown", handleFirstInteraction, { passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("click", handleFirstInteraction, { passive: true });

    return () => {
      removeInteractionListeners();
      stopSynthLoop();
    };
  }, [musicConfig.enabled, musicConfig.autoplayOnVisit, startPlayback, stopSynthLoop]);

  if (!musicConfig.enabled) return null;

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2 max-w-[calc(100vw-1.5rem)]">
      {/* Subtle prompt if browser is waiting for first tap to unlock audio */}
      {waitingForInteraction && !isPlaying && (
        <button
          onClick={() => {
            userManuallyPausedRef.current = false;
            startPlayback();
          }}
          className="px-3 py-1.5 rounded-full border border-[#9E2A2B]/40 dark:border-[#E06D53]/40 bg-[#FAF7F2]/95 dark:bg-[#181C22]/95 backdrop-blur-md shadow-md text-[11px] font-mono text-[#9E2A2B] dark:text-[#E06D53] flex items-center gap-1.5 animate-bounce"
        >
          <Sparkles className="w-3 h-3 shrink-0" />
          <span>Tap to enable ambient study music</span>
        </button>
      )}

      {/* Expanded Audio Settings Popover */}
      {expanded && (
        <div className="w-72 sm:w-80 p-4 rounded-xl border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2]/95 dark:bg-[#181C22]/95 backdrop-blur-md shadow-xl space-y-3.5 text-xs">
          <div className="flex items-center justify-between border-b border-[#DED8C8] dark:border-[#272D37] pb-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#9E2A2B] dark:text-[#E06D53] font-semibold flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5" />
              <span>Ambient Monograph Audio</span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="font-mono text-[10px] text-[#78756F] hover:text-[#161615] dark:hover:text-white"
            >
              Close
            </button>
          </div>

          {/* Track Selector */}
          {!hasCustomMp3 && (
            <div className="space-y-1.5">
              <div className="font-mono text-[10px] uppercase text-[#78756F] dark:text-[#A7ACB4]">
                Soundscape Selection
              </div>
              <div className="space-y-1">
                {musicConfig.tracks.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setTrackIndex(idx)}
                    className={`w-full text-left px-2.5 py-1.5 rounded border font-mono text-[11px] transition-colors ${
                      idx === trackIndex
                        ? "border-[#9E2A2B] dark:border-[#E06D53] bg-[#9E2A2B]/10 dark:bg-[#E06D53]/15 text-[#9E2A2B] dark:text-[#E06D53] font-semibold"
                        : "border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#14181D] text-[#52504C] dark:text-[#A7ACB4]"
                    }`}
                  >
                    <div className="truncate">{t.title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Volume Control */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#78756F] dark:text-[#A7ACB4]">
              <span>Volume Level</span>
              <span>{isMuted ? "Muted" : `${Math.round(volume * 100)}%`}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded border border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#14181D]"
                aria-label="Toggle Mute"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-[#9E2A2B]" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#161615] dark:text-[#ECE8E1]" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setIsMuted(false);
                  setVolume(parseFloat(e.target.value));
                }}
                className="w-full accent-[#9E2A2B] dark:accent-[#E06D53] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Compact Editorial Audio Pill */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 pl-3 rounded-full border border-[#DED8C8] dark:border-[#272D37] bg-white/95 dark:bg-[#181C22]/95 backdrop-blur-md shadow-lg">
        {/* Animated Equalizer Indicator */}
        <div className="flex items-end gap-0.5 h-3 w-3.5 shrink-0" aria-hidden="true">
          <span
            className={`w-0.5 bg-[#9E2A2B] dark:bg-[#E06D53] rounded-full transition-all duration-300 ${
              isPlaying ? "h-3 animate-pulse" : "h-1"
            }`}
          />
          <span
            className={`w-0.5 bg-[#9E2A2B] dark:bg-[#E06D53] rounded-full transition-all duration-300 ${
              isPlaying ? "h-2 animate-bounce" : "h-1"
            }`}
          />
          <span
            className={`w-0.5 bg-[#9E2A2B] dark:bg-[#E06D53] rounded-full transition-all duration-300 ${
              isPlaying ? "h-2.5 animate-pulse" : "h-1"
            }`}
          />
        </div>

        <button
          onClick={togglePlay}
          className="text-left font-mono text-[11px] text-[#161615] dark:text-[#ECE8E1] hover:text-[#9E2A2B] dark:hover:text-[#E06D53] transition-colors flex items-center gap-1.5 pr-1"
          title={isPlaying ? "Pause ambient audio" : "Play ambient audio"}
        >
          <span className="hidden xs:inline max-w-[140px] sm:max-w-[180px] truncate">
            {isPlaying ? currentTrack.title : "Ambient Study Audio"}
          </span>
          <span className="xs:hidden">Audio</span>
        </button>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="w-7 h-7 rounded-full bg-[#9E2A2B] dark:bg-[#E06D53] text-white dark:text-[#0D0F12] flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          aria-label="Audio settings"
          className="w-7 h-7 rounded-full border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] text-[#52504C] dark:text-[#A7ACB4] hover:text-[#161615] dark:hover:text-white flex items-center justify-center transition-colors shrink-0"
          title="Audio & Track Controls"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
