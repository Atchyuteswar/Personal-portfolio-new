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
// 5 DISTINCT GENERATIVE MUSICAL COMPOSITIONS (OFFLINE WAV SYNTHESIZER)
// ============================================================================
// Renders each composition via OfflineAudioContext into an in-memory stereo WAV
// stream played through a native HTML5 <audio autoPlay loop playsInline> element
// so autoplay works reliably on page visit without AudioContext suspension bugs.
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

// Convert an AudioBuffer to a standard 16-bit PCM WAV Blob URL
function audioBufferToWavUrl(buffer: AudioBuffer): string {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const numFrames = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataSize = numFrames * blockAlign;
  const arrayBuffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(arrayBuffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true); // PCM chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // 16-bit
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  const channels: Float32Array[] = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(buffer.getChannelData(c));
  }

  let offset = 44;
  for (let i = 0; i < numFrames; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]));
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true
      );
      offset += 2;
    }
  }

  const blob = new Blob([arrayBuffer], { type: "audio/wav" });
  return URL.createObjectURL(blob);
}

// Schedule a single bar into an OfflineAudioContext at `barStart`
function scheduleBar(
  ctx: OfflineAudioContext,
  destination: AudioNode,
  mode: string,
  step: number,
  barStart: number
) {
  if (mode === "chords") {
    const chord = TRACK1_CHORDS[step % TRACK1_CHORDS.length];
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(860, barStart);
    filter.connect(destination);

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, barStart);
      osc.detune.setValueAtTime((idx - 2) * 3.5, barStart);

      const st = barStart + idx * 0.06;
      gain.gain.setValueAtTime(0.0001, st);
      gain.gain.linearRampToValueAtTime(0.11, st + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.0001, st + 3.6);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(st);
      osc.stop(st + 3.65);
    });

    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bellOsc.type = "sine";
    bellOsc.frequency.setValueAtTime(
      TRACK1_BELLS[step % TRACK1_BELLS.length],
      barStart + 0.75
    );
    bellGain.gain.setValueAtTime(0.0001, barStart + 0.75);
    bellGain.gain.linearRampToValueAtTime(0.065, barStart + 0.9);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, barStart + 3.1);
    bellOsc.connect(bellGain);
    bellGain.connect(filter);
    bellOsc.start(barStart + 0.75);
    bellOsc.stop(barStart + 3.15);
  } else if (mode === "arpeggio") {
    const arpNotes = TRACK2_ARPS[step % TRACK2_ARPS.length];
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, barStart);
    filter.connect(destination);

    arpNotes.forEach((freq, idx) => {
      const noteTime = barStart + idx * 0.42;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, noteTime);

      const peak = idx === 0 ? 0.14 : 0.095;
      const sustain = idx === 0 ? 3.1 : 1.35;

      gain.gain.setValueAtTime(0.0001, noteTime);
      gain.gain.linearRampToValueAtTime(peak, noteTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + sustain);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(noteTime);
      osc.stop(noteTime + sustain + 0.04);
    });
  } else if (mode === "lofi") {
    const chord = TRACK3_LOFI_CHORDS[step % TRACK3_LOFI_CHORDS.length];
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(680, barStart);
    filter.connect(destination);

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, barStart);
      osc.detune.setValueAtTime((idx % 2 === 0 ? 1 : -1) * 5, barStart);

      gain.gain.setValueAtTime(0.0001, barStart);
      gain.gain.linearRampToValueAtTime(idx === 0 ? 0.13 : 0.08, barStart + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0001, barStart + 3.45);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(barStart);
      osc.stop(barStart + 3.5);
    });

    // Soft Kick on beat 1 and beat 3
    [0, 1.8].forEach((offset) => {
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.type = "sine";
      kickOsc.frequency.setValueAtTime(115, barStart + offset);
      kickOsc.frequency.exponentialRampToValueAtTime(42, barStart + offset + 0.18);

      kickGain.gain.setValueAtTime(0.0001, barStart + offset);
      kickGain.gain.linearRampToValueAtTime(0.2, barStart + offset + 0.015);
      kickGain.gain.exponentialRampToValueAtTime(0.0001, barStart + offset + 0.28);

      kickOsc.connect(kickGain);
      kickGain.connect(destination);
      kickOsc.start(barStart + offset);
      kickOsc.stop(barStart + offset + 0.3);
    });

    // Soft Rim/Snare harmonic tap on beat 2 and 4
    [0.9, 2.7].forEach((offset) => {
      const tapOsc = ctx.createOscillator();
      const tapGain = ctx.createGain();
      const tapFilter = ctx.createBiquadFilter();
      tapFilter.type = "bandpass";
      tapFilter.frequency.setValueAtTime(950, barStart + offset);

      tapOsc.type = "triangle";
      tapOsc.frequency.setValueAtTime(310, barStart + offset);
      tapOsc.frequency.exponentialRampToValueAtTime(140, barStart + offset + 0.07);

      tapGain.gain.setValueAtTime(0.0001, barStart + offset);
      tapGain.gain.linearRampToValueAtTime(0.085, barStart + offset + 0.008);
      tapGain.gain.exponentialRampToValueAtTime(0.0001, barStart + offset + 0.09);

      tapOsc.connect(tapFilter);
      tapFilter.connect(tapGain);
      tapGain.connect(destination);
      tapOsc.start(barStart + offset);
      tapOsc.stop(barStart + offset + 0.1);
    });
  } else if (mode === "cosmos") {
    const chord = TRACK4_COSMOS_CHORDS[step % TRACK4_COSMOS_CHORDS.length];
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(520, barStart);
    filter.frequency.linearRampToValueAtTime(980, barStart + 2.2);
    filter.frequency.linearRampToValueAtTime(480, barStart + 4.4);
    filter.connect(destination);

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx < 2 ? "sine" : "sawtooth";
      osc.frequency.setValueAtTime(freq, barStart);
      osc.detune.setValueAtTime((idx - 2.5) * 6, barStart);

      const peak = idx < 2 ? 0.11 : 0.045;
      gain.gain.setValueAtTime(0.0001, barStart);
      gain.gain.linearRampToValueAtTime(peak, barStart + 1.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, barStart + 4.5);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(barStart);
      osc.stop(barStart + 4.55);
    });

    const starOsc = ctx.createOscillator();
    const starGain = ctx.createGain();
    starOsc.type = "sine";
    starOsc.frequency.setValueAtTime(
      TRACK4_SHIMMER[step % TRACK4_SHIMMER.length],
      barStart + 1.1
    );
    starGain.gain.setValueAtTime(0.0001, barStart + 1.1);
    starGain.gain.linearRampToValueAtTime(0.04, barStart + 1.6);
    starGain.gain.exponentialRampToValueAtTime(0.0001, barStart + 4.2);
    starOsc.connect(starGain);
    starGain.connect(destination);
    starOsc.start(barStart + 1.1);
    starOsc.stop(barStart + 4.25);
  } else if (mode === "baroque") {
    const barIdx = step % TRACK5_BASS.length;
    const bassFreq = TRACK5_BASS[barIdx];
    const melodyLine = TRACK5_COUNTERPOINT[barIdx];

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1350, barStart);
    filter.connect(destination);

    [bassFreq, bassFreq * 1.5].forEach((bf, i) => {
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = "triangle";
      bassOsc.frequency.setValueAtTime(bf, barStart + i * 1.6);

      bassGain.gain.setValueAtTime(0.0001, barStart + i * 1.6);
      bassGain.gain.linearRampToValueAtTime(0.12, barStart + i * 1.6 + 0.05);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, barStart + i * 1.6 + 2.1);

      bassOsc.connect(bassGain);
      bassGain.connect(filter);
      bassOsc.start(barStart + i * 1.6);
      bassOsc.stop(barStart + i * 1.6 + 2.15);
    });

    melodyLine.forEach((mFreq, idx) => {
      const noteStart = barStart + idx * 0.54;
      const mOsc = ctx.createOscillator();
      const mGain = ctx.createGain();
      mOsc.type = "triangle";
      mOsc.frequency.setValueAtTime(mFreq, noteStart);

      mGain.gain.setValueAtTime(0.0001, noteStart);
      mGain.gain.linearRampToValueAtTime(0.09, noteStart + 0.02);
      mGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.9);

      mOsc.connect(mGain);
      mGain.connect(filter);
      mOsc.start(noteStart);
      mOsc.stop(noteStart + 0.95);
    });
  }
}

async function synthesizeTrackWavUrl(mode: string): Promise<string> {
  const barSec =
    mode === "cosmos"
      ? 4.6
      : mode === "chords"
      ? 3.7
      : mode === "lofi"
      ? 3.6
      : mode === "arpeggio"
      ? 3.36
      : 3.3;
  const numBars = 4;
  const totalSec = barSec * numBars;
  const sampleRate = 22050; // Fast rendering, warm analog bandwidth
  const offlineCtx = new OfflineAudioContext(
    2,
    Math.ceil(totalSec * sampleRate),
    sampleRate
  );

  const master = offlineCtx.createGain();
  master.gain.setValueAtTime(0.85, 0);
  master.connect(offlineCtx.destination);

  for (let bar = 0; bar < numBars; bar++) {
    scheduleBar(offlineCtx, master, mode, bar, bar * barSec);
  }

  const rendered = await offlineCtx.startRendering();
  return audioBufferToWavUrl(rendered);
}

export default function AmbientMusicPlayer() {
  const { musicConfig } = portfolioData.profile;
  const totalTracks = musicConfig.tracks.length;

  const [isPlaying, setIsPlaying] = useState(false);
  const [waitingForInteraction, setWaitingForInteraction] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(musicConfig.defaultVolume ?? 0.35);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [expanded, setExpanded] = useState(false);

  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const wavCacheRef = useRef<Record<string, string>>({});
  const userManuallyPausedRef = useRef(false);
  const unlockedRef = useRef(false);
  const isMutedRef = useRef(isMuted);
  const volumeRef = useRef(volume);
  const activeModeRef = useRef<string>(musicConfig.tracks[0]?.mode || "chords");

  isMutedRef.current = isMuted;
  volumeRef.current = volume;

  const currentTrack = musicConfig.tracks[trackIndex] || musicConfig.tracks[0];
  activeModeRef.current = currentTrack.mode || "chords";

  const hasCustomMp3 = Boolean(
    musicConfig.customMp3Url && musicConfig.customMp3Url.trim() !== ""
  );

  // Load and play a given track mode in the native <audio> element
  const loadAndPlayTrack = useCallback(
    async (mode: string) => {
      const audio = audioElRef.current;
      if (!audio) return false;

      try {
        let srcUrl = musicConfig.customMp3Url;
        if (!hasCustomMp3) {
          if (!wavCacheRef.current[mode]) {
            wavCacheRef.current[mode] = await synthesizeTrackWavUrl(mode);
          }
          srcUrl = wavCacheRef.current[mode];
        }

        if (audio.src !== srcUrl) {
          audio.src = srcUrl;
          audio.load();
        }

        audio.loop = true;
        audio.muted = isMutedRef.current;
        audio.volume = isMutedRef.current ? 0 : volumeRef.current;

        await audio.play();
        unlockedRef.current = true;
        setIsPlaying(true);
        setWaitingForInteraction(false);
        return true;
      } catch {
        setIsPlaying(false);
        setWaitingForInteraction(true);
        return false;
      }
    },
    [hasCustomMp3, musicConfig.customMp3Url]
  );

  // Sync volume & mute changes directly to the <audio> element
  useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  // Atomic mount effect: pick a random track on visit & immediately autoplay
  useEffect(() => {
    if (!musicConfig.enabled) return;

    let initialIdx = 0;
    if (musicConfig.randomizeOnVisit && totalTracks > 1) {
      initialIdx = Math.floor(Math.random() * totalTracks);
      setTrackIndex(initialIdx);
    }

    const initialMode = musicConfig.tracks[initialIdx]?.mode || "chords";
    activeModeRef.current = initialMode;

    if (!musicConfig.autoplayOnVisit) return;

    let isAttempting = false;

    const tryAutoPlay = async () => {
      if (unlockedRef.current || userManuallyPausedRef.current || isAttempting) {
        return;
      }
      isAttempting = true;
      const ok = await loadAndPlayTrack(activeModeRef.current);
      isAttempting = false;
      if (ok) {
        cleanupListeners();
      }
    };

    const events = [
      "pointerdown",
      "mousedown",
      "touchstart",
      "keydown",
      "click",
      "wheel",
      "scroll",
      "mousemove",
    ] as const;

    const cleanupListeners = () => {
      events.forEach((evt) =>
        window.removeEventListener(evt, tryAutoPlay as EventListener, true)
      );
    };

    events.forEach((evt) =>
      window.addEventListener(evt, tryAutoPlay as EventListener, {
        capture: true,
        passive: true,
      })
    );

    // Attempt immediate autoplay on visit
    tryAutoPlay();

    return () => {
      cleanupListeners();
    };
  }, [
    musicConfig.enabled,
    musicConfig.autoplayOnVisit,
    musicConfig.randomizeOnVisit,
    musicConfig.tracks,
    totalTracks,
    loadAndPlayTrack,
  ]);

  const togglePlay = async () => {
    const audio = audioElRef.current;
    if (!audio) return;

    if (isPlaying) {
      userManuallyPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      userManuallyPausedRef.current = false;
      audio.muted = isMuted;
      await loadAndPlayTrack(currentTrack.mode || "chords");
    }
  };

  const selectAndPlayIndex = (nextIdx: number) => {
    userManuallyPausedRef.current = false;
    setTrackIndex(nextIdx);
    const nextMode = musicConfig.tracks[nextIdx]?.mode || "chords";
    activeModeRef.current = nextMode;
    loadAndPlayTrack(nextMode);
  };

  const nextTrack = () => {
    const nextIdx = (trackIndex + 1) % totalTracks;
    selectAndPlayIndex(nextIdx);
  };

  const pickRandomTrack = () => {
    if (totalTracks <= 1) return;
    let nextIdx = Math.floor(Math.random() * totalTracks);
    if (nextIdx === trackIndex) {
      nextIdx = (trackIndex + 1) % totalTracks;
    }
    selectAndPlayIndex(nextIdx);
  };

  if (!musicConfig.enabled) return null;

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2 max-w-[calc(100vw-1.5rem)]">
      {/* Hidden Native HTML5 Audio Element for Browser Autoplay */}
      <audio
        ref={audioElRef}
        autoPlay
        loop
        playsInline
        preload="auto"
        className="hidden"
      />

      {/* Subtle prompt if browser is waiting for first gesture to unmute audio */}
      {waitingForInteraction && !isPlaying && (
        <button
          onClick={() => {
            userManuallyPausedRef.current = false;
            loadAndPlayTrack(currentTrack.mode || "chords");
          }}
          className="px-3 py-1.5 rounded-full border border-[#9E2A2B]/40 dark:border-[#E06D53]/40 bg-[#FAF7F2]/95 dark:bg-[#181C22]/95 backdrop-blur-md shadow-md text-[11px] font-mono text-[#9E2A2B] dark:text-[#E06D53] flex items-center gap-1.5 animate-bounce"
        >
          <Sparkles className="w-3 h-3 shrink-0" />
          <span>Click to unmute {currentTrack.title.split("—")[0]}</span>
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
                    onClick={() => selectAndPlayIndex(idx)}
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
