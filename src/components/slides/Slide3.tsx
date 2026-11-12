"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SLIDE_3_DATA } from "@/data/presentationData";
import { playChirpSound } from "@/utils/audio";
import { Volume2, ArrowRight, Activity } from "lucide-react";

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

      // Clean trail
      ctx.fillStyle = "rgba(237, 244, 249, 0.3)";
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = "rgba(226, 235, 242, 0.6)";
      ctx.lineWidth = 1;
      for (let y = 30; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Frequency sweep (Up-chirp)
      const period = (Math.pow(2, selectedSF - 6) * 18);
      const phase = (time * 60) % period;
      const progress = phase / period;

      const currentFreqY = height - 20 - progress * (height - 40);
      const sweepX = progress * (width - 40) + 20;

      // Draw chirp curve
      ctx.beginPath();
      ctx.strokeStyle = "#0071E3";
      ctx.lineWidth = 3;
      ctx.shadowColor = "rgba(0, 113, 227, 0.4)";
      ctx.shadowBlur = 8;

      const numPoints = 60;
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

      // Beacon dot
      ctx.beginPath();
      ctx.arc(sweepX, currentFreqY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#0071E3";
      ctx.fill();

      // Mini RF oscillation
      ctx.beginPath();
      ctx.strokeStyle = "rgba(15, 23, 42, 0.3)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 4) {
        const freqInstant = 0.05 + (progress * 0.18);
        const y = height - 12 + Math.sin(x * freqInstant + time * 10) * 6;
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
    const duration = Math.min(500, Math.max(140, currentSFData.timeOnAirMs * 0.4));
    playChirpSound(duration, 400, 2400);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-y-auto">
      {/* 1. Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-semibold">
          {SLIDE_3_DATA.badge}
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#0F172A] leading-tight tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-2">
            {SLIDE_3_DATA.headlineItalic}
          </em>
          {SLIDE_3_DATA.headlineRest}
        </h1>
        <p className="text-sm text-[#64748B] font-sans mt-1.5 max-w-2xl leading-relaxed">
          {SLIDE_3_DATA.analogy}
        </p>
      </motion.div>

      {/* 2. Main Visual Canvas + Spreading Factor Slider */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-center">
        {/* Left: Spectrogram Canvas (7 cols) */}
        <div className="lg:col-span-7 keynote-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F172A]">
              <Activity size={16} className="text-[#0071E3]" />
              <span>Chirp Spread Spectrum (CSS) Waterfall</span>
            </div>

            <button
              onClick={handlePlayChirp}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F2FE] hover:bg-[#0071E3] text-[#0071E3] hover:text-white transition-all text-xs font-mono font-medium interactive-hover"
            >
              <Volume2 size={13} />
              <span>Hear Chirp</span>
            </button>
          </div>

          <div className="relative w-full h-[220px] bg-[#EDF4F9] rounded-2xl border border-[#E2EBF2] overflow-hidden">
            <canvas ref={canvasRef} width={540} height={220} className="w-full h-full block" />
            <div className="absolute top-2 left-3 font-mono text-[10px] text-[#64748B]">
              ▲ Frequency (+125 kHz)
            </div>
            <div className="absolute bottom-2 right-3 font-mono text-[10px] text-[#64748B]">
              Time ▶
            </div>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-[#E0F2FE] border border-[#0071E3]/20 flex items-center justify-between">
            <p className="font-sans text-xs text-[#0F172A]">
              <strong className="text-[#0369A1]">Rule of Thumb: </strong>
              {SLIDE_3_DATA.goldenRule}
            </p>
          </div>
        </div>

        {/* Right: Spreading Factor Tuning (5 cols) */}
        <div className="lg:col-span-5 keynote-card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0071E3] font-semibold">
              Spreading Factor
            </span>
            <span className="font-mono text-base font-bold text-[#0071E3]">
              SF{selectedSF}
            </span>
          </div>

          <label className="block text-xs text-[#64748B] mb-2">
            Drag to adjust Spreading Factor (SF7 to SF12):
          </label>
          <input
            type="range"
            min="7"
            max="12"
            step="1"
            value={selectedSF}
            onChange={(e) => setSelectedSF(Number(e.target.value))}
            className="w-full accent-[#0071E3] cursor-pointer mb-3"
          />

          <div className="flex justify-between font-mono text-[10px] text-[#64748B] mb-5">
            <span>SF7 (Fastest)</span>
            <span>SF9</span>
            <span>SF12 (Longest Range)</span>
          </div>

          {/* 2 Clean Key Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2EBF2] text-center">
              <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                Data Rate
              </span>
              <span className="font-mono text-lg font-bold text-[#0F172A]">
                {currentSFData.dataRateKbps} <span className="text-xs font-normal">kbps</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2EBF2] text-center">
              <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                Estimated Range
              </span>
              <span className="font-mono text-lg font-bold text-[#0071E3]">
                ~{currentSFData.relativeRangeKm} <span className="text-xs font-normal">km</span>
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#EDF4F9] border border-[#E2EBF2] text-xs">
            <span className="font-mono text-[10px] text-[#64748B] uppercase block mb-0.5">
              Ideal Usage:
            </span>
            <p className="text-[#0F172A] font-sans">
              {currentSFData.summary}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Footer */}
      <div className="flex items-center justify-between border-t border-[#E2EBF2] pt-3">
        <p className="font-mono text-xs text-[#64748B]">
          ISM Bands: 433 MHz (Asia), 868 MHz (EU), 915 MHz (US) — all license-free.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0071E3] hover:text-[#0369A1] transition-colors interactive-hover"
        >
          <span>LoRa vs LoRaWAN</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
