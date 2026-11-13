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
  SkipForward,
  Shuffle,
} from "lucide-react";

// ============================================================================
// 5 DISTINCT GENERATIVE MUSICAL COMPOSITIONS (WEB AUDIO API)
// ============================================================================

// Track 1 ('chords'): Warm Fmaj9 -> Em7 -> Dm9 -> Cmaj9 Rhodes + Bell Chimes
const TRACK1_CHORDS = [
  [174.61, 220.0, 261.63, 329.63, 392.0],
  [164.81, 196.0, 246.94, 293.66, 392.0],
  [146.83, 174.61, 220.0, 261.63, 329.63],
  [130.81, 164.81, 196.0, 246.94, 293.66],
];
const TRACK1_BELLS = [523.25, 587.33, 659.25, 783.99, 880.0, 659.25, 587.33, 523.25];

// Track 2 ('arpeggio'): Minimalist Glass/Richter Flowing Arpeggios (Am9 -> Fmaj7 -> Cmaj7 -> G6)
const TRACK2_ARPS = [
  [110.0, 220.0, 261.63, 329.63, 392.0, 493.88, 392.0, 329.63], // Am9
  [87.31, 174.61, 220.0, 261.63, 329.63, 440.0, 329.63, 261.63], // Fmaj7
  [130.81, 196.0, 246.94, 261.63, 329.63, 392.0, 329.63, 246.94], // Cmaj7
  [98.0, 196.0, 246.94, 293.66, 329.63, 392.0, 329.63, 246.94], // G6
];

// Track 3 ('lofi'): Midnight Thesis Neo-Soul / Lo-Fi Beat (Fm9 -> Bb13 -> Ebmaj9 -> Cm11)
const TRACK3_LOFI_CHORDS = [
  [87.31, 174.61, 207.65, 261.63, 311.13, 392.0], // Fm9
  [116.54, 207.65, 233.08, 293.66, 349.23, 440.0], // Bb13
  [77.78, 155.56, 196.0, 233.08, 293.66, 349.23], // Ebmaj9
  [65.41, 130.81, 155.56, 196.0, 233.08, 293.66], // Cm11
];

// Track 4 ('cosmos'): Observatory D Lydian Shimmering Space Pad (Dmaj9#11 -> Bm11 -> Gmaj9 -> A6)
const TRACK4_COSMOS_CHORDS = [
  [73.42, 146.83, 220.0, 277.18, 329.63, 369.99], // Dmaj9(#11)
  [61.74, 123.47, 185.0, 220.0, 293.66, 369.99], // Bm11
  [98.0, 146.83, 196.0, 246.94, 293.66, 369.99], // Gmaj9
  [110.0, 164.81, 220.0, 277.18, 329.63, 440.0], // A6
];
const TRACK4_SHIMMER = [1108.73, 1174.66, 1318.51, 1479.98, 987.77, 1108.73];

// Track 5 ('baroque'): Classical Chamber Counterpoint (G -> D/F# -> Em7 -> Cmaj7)
const TRACK5_BASS = [98.0, 92.5, 82.41, 65.41];
const TRACK5_COUNTERPOINT = [
  [392.0, 493.88, 587.33, 493.88, 659.25, 587.33],
  [369.99, 440.0, 587.33, 440.0, 523.25, 493.88],
  [329.63, 392.0, 493.88, 392.0, 587.33, 493.88],
  [261.63, 329.63, 392.0, 493.88, 440.0, 392.0],
];

export default function AmbientMusicPlayer() {
  const { musicConfig } = portfolioData.profile;
  const totalTracks = musicConfig.tracks.length;

  const [isPlaying, setIsPlaying] = useState(false);
  const [waitingForInteraction, setWaitingForInteraction] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(musicConfig.defaultVolume ?? 0.35);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [expanded, setExpanded] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const userManuallyPausedRef = useRef(false);
  const stepRef = useRef(0);

  // Pick a random track out of the 5 on initial visit!
  useEffect(() => {
    if (musicConfig.randomizeOnVisit && totalTracks > 1) {
      const randomIdx = Math.floor(Math.random() * totalTracks);
      setTrackIndex(randomIdx);
    }
  }, [musicConfig.randomizeOnVisit, totalTracks]);

  const currentTrack = musicConfig.tracks[trackIndex] || musicConfig.tracks[0];
  const hasCustomMp3 = Boolean(
    musicConfig.customMp3Url && musicConfig.customMp3Url.trim() !== ""
  );

  const stopSynthLoop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Helper: Soft lo-fi sub-bass kick + brushed hat for Track 3 ('lofi')
  const scheduleLofiPulse = (ctx: AudioContext, destination: AudioNode, startTime: number) => {
    // Soft Kick on beat 1 and beat 3
    [0, 1.8].forEach((offset) => {
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.type = "sine";
      kickOsc.frequency.setValueAtTime(115, startTime + offset);
      kickOsc.frequency.exponentialRampToValueAtTime(42, startTime + offset + 0.18);

      kickGain.gain.setValueAtTime(0.0001, startTime + offset);
      kickGain.gain.linearRampToValueAtTime(0.09, startTime + offset + 0.015);
      kickGain.gain.exponentialRampToValueAtTime(0.0001, startTime + offset + 0.28);

      kickOsc.connect(kickGain);
      kickGain.connect(destination);
      kickOsc.start(startTime + offset);
      kickOsc.stop(startTime + offset + 0.3);
    });

    // Soft Rim/Snare harmonic tap on beat 2 and 4
    [0.9, 2.7].forEach((offset) => {
      const tapOsc = ctx.createOscillator();
      const tapGain = ctx.createGain();
      const tapFilter = ctx.createBiquadFilter();
      tapFilter.type = "bandpass";
      tapFilter.frequency.setValueAtTime(950, startTime + offset);

      tapOsc.type = "triangle";
      tapOsc.frequency.setValueAtTime(310, startTime + offset);
      tapOsc.frequency.exponentialRampToValueAtTime(140, startTime + offset + 0.07);

      tapGain.gain.setValueAtTime(0.0001, startTime + offset);
      tapGain.gain.linearRampToValueAtTime(0.035, startTime + offset + 0.008);
      tapGain.gain.exponentialRampToValueAtTime(0.0001, startTime + offset + 0.09);

      tapOsc.connect(tapFilter);
      tapFilter.connect(tapGain);
      tapGain.connect(destination);
      tapOsc.start(startTime + offset);
      tapOsc.stop(startTime + offset + 0.1);
    });
  };

  // Synthesize one bar/phrase of the active track mode
  const triggerCompositionStep = useCallback(
    (ctx: AudioContext, destination: AudioNode, mode: string) => {
      if (ctx.state !== "running") return;

      const now = ctx.currentTime;
      const step = stepRef.current;
      stepRef.current += 1;

      if (mode === "chords") {
        // Track 1: Warm Rhodes & Chimes
        const chord = TRACK1_CHORDS[step % TRACK1_CHORDS.length];
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(820, now);
        filter.connect(destination);

        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, now);
          osc.detune.setValueAtTime((idx - 2) * 3.5, now);

          const st = idx * 0.06;
          gain.gain.setValueAtTime(0.0001, now + st);
          gain.gain.linearRampToValueAtTime(0.042, now + st + 0.5);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + st + 3.8);

          osc.connect(gain);
          gain.connect(filter);
          osc.start(now + st);
          osc.stop(now + st + 3.9);
        });

        // Bell melody
        const bellOsc = ctx.createOscillator();
        const bellGain = ctx.createGain();
        bellOsc.type = "sine";
        bellOsc.frequency.setValueAtTime(
          TRACK1_BELLS[step % TRACK1_BELLS.length],
          now + 0.75
        );
        bellGain.gain.setValueAtTime(0.0001, now + 0.75);
        bellGain.gain.linearRampToValueAtTime(0.024, now + 0.9);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.1);
        bellOsc.connect(bellGain);
        bellGain.connect(filter);
        bellOsc.start(now + 0.75);
        bellOsc.stop(now + 3.2);
      } else if (mode === "arpeggio") {
        // Track 2: Glass Monograph — Minimalist Flowing Piano/Harp Arpeggios
        const arpNotes = TRACK2_ARPS[step % TRACK2_ARPS.length];
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1150, now);
        filter.connect(destination);

        arpNotes.forEach((freq, idx) => {
          const noteTime = now + idx * 0.42;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === 0 ? "triangle" : "sine";
          osc.frequency.setValueAtTime(freq, noteTime);

          const peak = idx === 0 ? 0.06 : 0.038;
          const sustain = idx === 0 ? 3.2 : 1.4;

          gain.gain.setValueAtTime(0.0001, noteTime);
          gain.gain.linearRampToValueAtTime(peak, noteTime + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + sustain);

          osc.connect(gain);
          gain.connect(filter);
          osc.start(noteTime);
          osc.stop(noteTime + sustain + 0.05);
        });
      } else if (mode === "lofi") {
        // Track 3: Midnight Thesis — Neo-Soul Chords + Soft Lo-Fi Beat
        const chord = TRACK3_LOFI_CHORDS[step % TRACK3_LOFI_CHORDS.length];
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(640, now);
        filter.connect(destination);

        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, now);
          // Warm tape wobble detune
          osc.detune.setValueAtTime((idx % 2 === 0 ? 1 : -1) * 5, now);

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(idx === 0 ? 0.055 : 0.032, now + 0.25);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

          osc.connect(gain);
          gain.connect(filter);
          osc.start(now);
          osc.stop(now + 3.55);
        });

        scheduleLofiPulse(ctx, destination, now);
      } else if (mode === "cosmos") {
        // Track 4: Observatory — Ethereal Lydian Pad + High Shimmer
        const chord = TRACK4_COSMOS_CHORDS[step % TRACK4_COSMOS_CHORDS.length];
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(520, now);
        filter.frequency.linearRampToValueAtTime(980, now + 2.5);
        filter.frequency.linearRampToValueAtTime(480, now + 5.2);
        filter.connect(destination);

        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx < 2 ? "sine" : "sawtooth";
          osc.frequency.setValueAtTime(freq, now);
          osc.detune.setValueAtTime((idx - 2.5) * 6, now);

          const peak = idx < 2 ? 0.045 : 0.018;
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(peak, now + 1.6);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.4);

          osc.connect(gain);
          gain.connect(filter);
          osc.start(now);
          osc.stop(now + 5.5);
        });

        // High crystalline starlight note
        const starOsc = ctx.createOscillator();
        const starGain = ctx.createGain();
        starOsc.type = "sine";
        starOsc.frequency.setValueAtTime(
          TRACK4_SHIMMER[step % TRACK4_SHIMMER.length],
          now + 1.2
        );
        starGain.gain.setValueAtTime(0.0001, now + 1.2);
        starGain.gain.linearRampToValueAtTime(0.014, now + 1.8);
        starGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);
        starOsc.connect(starGain);
        starGain.connect(destination);
        starOsc.start(now + 1.2);
        starOsc.stop(now + 4.6);
      } else if (mode === "baroque") {
        // Track 5: Courtyard Conservatory — Classical Counterpoint & Plucks
        const barIdx = step % TRACK5_BASS.length;
        const bassFreq = TRACK5_BASS[barIdx];
        const melodyLine = TRACK5_COUNTERPOINT[barIdx];

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1350, now);
        filter.connect(destination);

        // Warm cello/lute bass root + fifth
        [bassFreq, bassFreq * 1.5].forEach((bf, i) => {
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bassOsc.type = "triangle";
          bassOsc.frequency.setValueAtTime(bf, now + i * 1.6);

          bassGain.gain.setValueAtTime(0.0001, now + i * 1.6);
          bassGain.gain.linearRampToValueAtTime(0.05, now + i * 1.6 + 0.05);
          bassGain.gain.exponentialRampToValueAtTime(0.0001, now + i * 1.6 + 2.2);

          bassOsc.connect(bassGain);
          bassGain.connect(filter);
          bassOsc.start(now + i * 1.6);
          bassOsc.stop(now + i * 1.6 + 2.3);
        });

        // Plucked chamber melody
        melodyLine.forEach((mFreq, idx) => {
          const noteStart = now + idx * 0.55;
          const mOsc = ctx.createOscillator();
          const mGain = ctx.createGain();
          mOsc.type = "triangle";
          mOsc.frequency.setValueAtTime(mFreq, noteStart);

          mGain.gain.setValueAtTime(0.0001, noteStart);
          mGain.gain.linearRampToValueAtTime(0.036, noteStart + 0.02);
          mGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.95);

          mOsc.connect(mGain);
          mGain.connect(filter);
          mOsc.start(noteStart);
          mOsc.stop(noteStart + 1.0);
        });
      }
    },
    []
  );

  // Get bar interval duration in ms for each track mode
  const getLoopIntervalMs = (mode: string) => {
    switch (mode) {
      case "arpeggio":
        return 3360;
      case "lofi":
        return 3600;
      case "cosmos":
        return 4800;
      case "baroque":
        return 3300;
      case "chords":
      default:
        return 3800;
    }
  };

  // Start playback
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
        const intervalMs = getLoopIntervalMs(mode);

        triggerCompositionStep(ctx, masterGainRef.current, mode);
        intervalRef.current = setInterval(() => {
          if (audioCtxRef.current && masterGainRef.current) {
            triggerCompositionStep(audioCtxRef.current, masterGainRef.current, mode);
          }
        }, intervalMs);

        setIsPlaying(true);
        setWaitingForInteraction(false);
        return true;
      } else {
        setWaitingForInteraction(true);
        return false;
      }
    } catch {
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
    triggerCompositionStep,
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

  const nextTrack = () => {
    stepRef.current = 0;
    setTrackIndex((prev) => (prev + 1) % totalTracks);
    if (!isPlaying) {
      userManuallyPausedRef.current = false;
    }
  };

  const pickRandomTrack = () => {
    stepRef.current = 0;
    if (totalTracks <= 1) return;
    let nextIdx = Math.floor(Math.random() * totalTracks);
    if (nextIdx === trackIndex) {
      nextIdx = (trackIndex + 1) % totalTracks;
    }
    setTrackIndex(nextIdx);
  };

  // Sync volume & mute changes
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

  // Restart synth loop when track changes while playing
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

    attemptAutoStart();

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
          <span>Tap anywhere to start {currentTrack.title.split("—")[0]}</span>
        </button>
      )}

      {/* Expanded 5-Track Audio Console Popover */}
      {expanded && (
        <div className="w-72 sm:w-80 p-4 rounded-xl border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2]/95 dark:bg-[#181C22]/95 backdrop-blur-md shadow-xl space-y-3.5 text-xs">
          <div className="flex items-center justify-between border-b border-[#DED8C8] dark:border-[#272D37] pb-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#9E2A2B] dark:text-[#E06D53] font-semibold flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5" />
              <span>5-Track Academic Soundscape</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={pickRandomTrack}
                className="inline-flex items-center gap-1 font-mono text-[10px] text-[#1D3557] dark:text-[#6CA0DC] hover:underline"
                title="Pick a random track"
              >
                <Shuffle className="w-3 h-3" />
                <span>Random</span>
              </button>
              <button
                onClick={() => setExpanded(false)}
                className="font-mono text-[10px] text-[#78756F] hover:text-[#161615] dark:hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* 5-Track Selector List */}
          {!hasCustomMp3 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[#78756F] dark:text-[#A7ACB4]">
                <span>Select Track ({trackIndex + 1} of {totalTracks})</span>
                <span>Auto-Randomized</span>
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-0.5">
                {musicConfig.tracks.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      stepRef.current = 0;
                      setTrackIndex(idx);
                      if (!isPlaying) {
                        userManuallyPausedRef.current = false;
                        startPlayback();
                      }
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded border font-mono transition-colors ${
                      idx === trackIndex
                        ? "border-[#9E2A2B] dark:border-[#E06D53] bg-[#9E2A2B]/10 dark:bg-[#E06D53]/15 text-[#9E2A2B] dark:text-[#E06D53] font-semibold"
                        : "border-[#DED8C8] dark:border-[#272D37] bg-white dark:bg-[#14181D] text-[#52504C] dark:text-[#A7ACB4] hover:border-[#9E2A2B]/40"
                    }`}
                  >
                    <div className="text-[11px] truncate">{t.title}</div>
                    <div className="text-[9px] text-[#78756F] dark:text-[#A7ACB4] truncate mt-0.5">
                      {t.subtitle}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Volume Control */}
          <div className="space-y-1.5 pt-1 border-t border-[#DED8C8] dark:border-[#272D37]">
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
          <span className="hidden xs:inline max-w-[135px] sm:max-w-[185px] truncate">
            {currentTrack.title}
          </span>
          <span className="xs:hidden">Track {trackIndex + 1}/5</span>
        </button>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="w-7 h-7 rounded-full bg-[#9E2A2B] dark:bg-[#E06D53] text-white dark:text-[#0D0F12] flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        <button
          onClick={nextTrack}
          aria-label="Next track"
          className="w-7 h-7 rounded-full border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] text-[#52504C] dark:text-[#A7ACB4] hover:text-[#161615] dark:hover:text-white flex items-center justify-center transition-colors shrink-0"
          title="Next Track"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          aria-label="Audio settings & tracklist"
          className="w-7 h-7 rounded-full border border-[#DED8C8] dark:border-[#272D37] bg-[#FAF7F2] dark:bg-[#14181D] text-[#52504C] dark:text-[#A7ACB4] hover:text-[#161615] dark:hover:text-white flex items-center justify-center transition-colors shrink-0"
          title="Open 5-Track Selector & Volume"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
