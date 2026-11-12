"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SLIDE_3_DATA } from "@/data/presentationData";
import { playChirpSound } from "@/utils/audio";
import { Volume2, ArrowRight, Activity, Radio, Cpu, Layers } from "lucide-react";

interface Slide3Props {
  onNextSlide: () => void;
}

export const Slide3: React.FC<Slide3Props> = ({ onNextSlide }) => {
  const [selectedSF, setSelectedSF] = useState<number>(9);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const currentSFData =
    SLIDE_3_DATA.spreadingFactors.find((item) => item.sf === selectedSF) ||
    SLIDE_3_DATA.spreadingFactors[2];

  // Dynamic spectrogram waterfall canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const render = () => {
      time += 0.035;
      const width = canvas.width;
      const height = canvas.height;

      // Subtle fade background for waterfall trail
      ctx.fillStyle = "rgba(244, 239, 234, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // Draw Spectrogram Grid Lines
      ctx.strokeStyle = "rgba(232, 227, 221, 0.4)";
      ctx.lineWidth = 1;
      for (let y = 30; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Chirp Frequency Sweep (Up-Chirp)
      // Cycle duration is proportional to 2^SF
      const period = (Math.pow(2, selectedSF - 6) * 18);
      const phase = (time * 60) % period;
      const progress = phase / period; // 0 to 1

      // Frequency swept from bottom (f_min) to top (f_max)
      const currentFreqY = height - 20 - progress * (height - 40);
      const sweepX = progress * (width - 40) + 20;

      // Draw chirping waveform trail
      ctx.beginPath();
      ctx.strokeStyle = "#FF5A1F";
      ctx.lineWidth = 3;
      ctx.shadowColor = "rgba(255, 90, 31, 0.5)";
      ctx.shadowBlur = 8;

      const numPoints = 80;
      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints);
        if (t > progress) continue;
        const x = t * (width - 40) + 20;
        const y = height - 20 - t * (height - 40);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Head of the chirp (Bright beacon)
      ctx.beginPath();
      ctx.arc(sweepX, currentFreqY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FF5A1F";
      ctx.fill();

      // Mini RF oscillation wave at the bottom
      ctx.beginPath();
      ctx.strokeStyle = "rgba(22, 20, 18, 0.4)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 3) {
        // Frequency increases along x
        const freqInstant = 0.05 + (progress * 0.2);
        const y = height - 12 + Math.sin(x * freqInstant + time * 10) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [selectedSF]);

  const handlePlayChirp = () => {
    // Play chirp with duration inversely related to data rate
    const duration = Math.min(600, Math.max(120, currentSFData.timeOnAirMs * 0.45));
    playChirpSound(duration, 400, 2400);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-y-auto">
      {/* 1. Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-semibold">
            {SLIDE_3_DATA.badge}
          </span>
          <span className="text-xs font-mono text-[#8A847C]">•</span>
          <span className="text-xs font-mono text-[#161412] font-semibold">
            {SLIDE_3_DATA.cssName}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#161412] leading-[1.05] tracking-tight mt-1">
          <em className="italic text-[#FF5A1F] font-normal mr-2">
            {SLIDE_3_DATA.headlineItalic}
          </em>
          {SLIDE_3_DATA.headlineRest}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#8A847C] font-sans mt-2 max-w-3xl leading-relaxed">
          {SLIDE_3_DATA.analogy}
        </p>
      </motion.div>

      {/* 2. Main Visual Canvas + Spreading Factor Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-center">
        {/* Left: Spectrogram / Chirp Sweep Canvas (7 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-7 keynote-card p-5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#FF5A1F]" />
              <span className="font-mono text-xs font-semibold text-[#161412]">
                Real-Time CSS Spectrogram (Frequency vs Time)
              </span>
            </div>

            {/* Acoustic Audio Demo Button */}
            <button
              onClick={handlePlayChirp}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE9DD] hover:bg-[#FF5A1F] text-[#FF5A1F] hover:text-white transition-all text-xs font-mono font-medium interactive-hover shadow-xs"
              title="Audibly synthesize this chirp tone using Web Audio"
            >
              <Volume2 size={13} />
              <span>Hear Chirp (Audio)</span>
            </button>
          </div>

          {/* Canvas Spectrogram */}
          <div className="relative w-full h-[220px] bg-[#F4EFEA] rounded-2xl border border-[#E8E3DD] overflow-hidden">
            <canvas
              ref={canvasRef}
              width={540}
              height={220}
              className="w-full h-full block"
            />

            {/* Labels overlay */}
            <div className="absolute top-2 left-3 font-mono text-[10px] text-[#8A847C]">
              ▲ Frequency (+125 kHz max)
            </div>
            <div className="absolute bottom-2 right-3 font-mono text-[10px] text-[#8A847C]">
              Time (Duration: {currentSFData.timeOnAirMs.toFixed(0)} ms) ▶
            </div>
            <div className="absolute top-2 right-3 font-mono text-[11px] bg-white/90 px-2 py-0.5 rounded border border-[#E8E3DD] text-[#161412] font-semibold">
              Chips: {currentSFData.chipsPerSymbol} / symbol
            </div>
          </div>

          {/* Takeaway Golden Rule Banner */}
          <div className="mt-3 p-3 rounded-xl bg-[#FFE9DD]/60 border border-[#FF5A1F]/30 flex items-center justify-between">
            <p className="font-sans text-xs text-[#161412]">
              <strong className="text-[#C23B0A]">Key Law: </strong>
              Higher Spreading Factor spreads energy over longer time, enabling reception{" "}
              <span className="font-mono font-bold text-[#FF5A1F]">
                {Math.abs(currentSFData.snrLimitDb)} dB BELOW
              </span>{" "}
              the background noise floor!
            </p>
          </div>
        </motion.div>

        {/* Right: Interactive Spreading Factor Slider & Telemetry (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="lg:col-span-5 keynote-card p-5 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#FF5A1F] font-semibold">
              Parameter Tuning
            </span>
            <span className="font-mono text-xs font-bold text-[#161412]">
              SF: <strong className="text-[#FF5A1F] text-base">{selectedSF}</strong>
            </span>
          </div>

          <label className="block text-xs font-medium text-[#161412] mb-1">
            Adjust Spreading Factor (SF7 to SF12):
          </label>
          <input
            type="range"
            min="7"
            max="12"
            step="1"
            value={selectedSF}
            onChange={(e) => setSelectedSF(Number(e.target.value))}
            className="w-full accent-[#FF5A1F] cursor-pointer mb-4"
          />

          <div className="flex justify-between font-mono text-[10px] text-[#8A847C] mb-4">
            <span className="text-[#161412] font-semibold">SF7 (Fastest)</span>
            <span>SF8</span>
            <span>SF9</span>
            <span>SF10</span>
            <span>SF11</span>
            <span className="text-[#FF5A1F] font-semibold">SF12 (Longest Range)</span>
          </div>

          {/* Live Updating Telemetry Cards */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div className="p-2.5 rounded-xl bg-[#F9F7F4] border border-[#E8E3DD]">
              <span className="text-[10px] font-mono text-[#8A847C] uppercase block">
                Net Bitrate
              </span>
              <span className="font-mono text-base font-bold text-[#161412]">
                {currentSFData.dataRateKbps} <span className="text-xs font-normal">kbps</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#F9F7F4] border border-[#E8E3DD]">
              <span className="text-[10px] font-mono text-[#8A847C] uppercase block">
                Time-on-Air (20B)
              </span>
              <span className="font-mono text-base font-bold text-[#FF5A1F]">
                {currentSFData.timeOnAirMs} <span className="text-xs font-normal">ms</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#F9F7F4] border border-[#E8E3DD]">
              <span className="text-[10px] font-mono text-[#8A847C] uppercase block">
                RX Sensitivity
              </span>
              <span className="font-mono text-base font-bold text-[#161412]">
                {currentSFData.sensitivityDbm} <span className="text-xs font-normal">dBm</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#F9F7F4] border border-[#E8E3DD]">
              <span className="text-[10px] font-mono text-[#8A847C] uppercase block">
                Relative Reach
              </span>
              <span className="font-mono text-base font-bold text-[#FF5A1F]">
                ~{currentSFData.relativeRangeKm} <span className="text-xs font-normal">km</span>
              </span>
            </div>
          </div>

          {/* Best for recommendation */}
          <div className="p-2.5 rounded-xl bg-[#F4EFEA] border border-[#E8E3DD] text-xs">
            <span className="font-mono text-[10px] text-[#8A847C] uppercase block mb-0.5">
              Ideal Deployment Use:
            </span>
            <p className="text-[#161412] leading-tight font-sans">
              {currentSFData.bestFor}
            </p>
          </div>
        </motion.div>
      </div>

      {/* 3. Small Plain-Words Chips: Bandwidth, Coding Rate, Frequency Bands */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-[#E8E3DD]/80 pt-3">
        {SLIDE_3_DATA.specChips.map((chip) => (
          <div
            key={chip.title}
            className="p-3 rounded-xl bg-white/70 border border-[#E8E3DD] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-semibold text-[#161412]">{chip.title}</span>
              <span className="font-mono text-[11px] text-[#FF5A1F] bg-[#FFE9DD] px-2 py-0.5 rounded-md font-bold">
                {chip.value}
              </span>
            </div>
            <p className="text-[11px] text-[#8A847C] mt-1 leading-snug">
              {chip.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
