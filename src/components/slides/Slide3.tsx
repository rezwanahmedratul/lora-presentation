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

      // Soft clear
      ctx.fillStyle = "rgba(244, 248, 252, 0.35)";
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = "rgba(226, 235, 245, 0.6)";
      ctx.lineWidth = 1;
      for (let y = 30; y < height; y += 45) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Frequency Sweep
      const period = Math.pow(2, selectedSF - 6) * 16;
      const phase = (time * 60) % period;
      const progress = phase / period;

      const currentFreqY = height - 20 - progress * (height - 40);
      const sweepX = progress * (width - 40) + 20;

      // Main Chirp Curve
      ctx.beginPath();
      ctx.strokeStyle = "#0071E3";
      ctx.lineWidth = 3.5;
      ctx.shadowColor = "rgba(0, 113, 227, 0.35)";
      ctx.shadowBlur = 10;

      const numPoints = 80;
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        if (t > progress) continue;
        const x = t * (width - 40) + 20;
        const y = height - 20 - t * (height - 40);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Beacon Dot
      ctx.beginPath();
      ctx.arc(sweepX, currentFreqY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#0071E3";
      ctx.fill();

      // Mini RF oscillation
      ctx.beginPath();
      ctx.strokeStyle = "rgba(15, 23, 42, 0.25)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 4) {
        const freqInstant = 0.05 + progress * 0.18;
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
    playChirpSound(280, 400, 2400);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-14 pb-20 px-8 sm:px-14 lg:px-20 xl:px-24 overflow-y-auto">
      {/* 1. Full-Width Headline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-semibold">
          {SLIDE_3_DATA.kicker}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">
            {SLIDE_3_DATA.headlineItalic}
          </em>
          {SLIDE_3_DATA.headlineRest}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 max-w-4xl leading-relaxed">
          {SLIDE_3_DATA.subtitle}
        </p>
      </motion.div>

      {/* 2. Full-Width Visual Waterfall Canvas + Minimal SF Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 my-auto py-4 items-center w-full">
        {/* Waterfall Canvas (7 cols) */}
        <div className="lg:col-span-7 p-7 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold text-[#0F172A] flex items-center gap-2">
              <Activity size={18} className="text-[#0071E3]" />
              CSS Frequency Waterfall (Time vs Frequency)
            </span>

            <button
              onClick={handlePlayChirp}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E0F2FE] hover:bg-[#0071E3] text-[#0071E3] hover:text-white transition-all text-xs font-mono font-medium interactive-hover"
            >
              <Volume2 size={14} />
              <span>Hear Chirp</span>
            </button>
          </div>

          <div className="relative w-full h-[240px] bg-[#F4F8FC] rounded-2xl border border-[#E2EBF5] overflow-hidden">
            <canvas ref={canvasRef} width={720} height={240} className="w-full h-full block" />
            <span className="absolute top-3 left-4 font-mono text-xs text-[#64748B]">▲ Frequency (125 kHz)</span>
            <span className="absolute bottom-3 right-4 font-mono text-xs text-[#64748B]">Time ▶</span>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2EBF5] text-xs sm:text-sm font-mono text-[#0071E3] font-semibold">
            {SLIDE_3_DATA.goldenRule}
          </div>
        </div>

        {/* Minimal Controller (5 cols) */}
        <div className="lg:col-span-5 p-7 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#0071E3] font-semibold">
                Spreading Factor Tuning
              </span>
              <span className="font-mono text-2xl font-bold text-[#0071E3]">
                SF{selectedSF}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#64748B] mb-5">
              Slide to adjust the duration of frequency sweeps:
            </p>

            <input
              type="range"
              min="7"
              max="12"
              step="1"
              value={selectedSF}
              onChange={(e) => setSelectedSF(Number(e.target.value))}
              className="w-full accent-[#0071E3] cursor-pointer mb-2"
            />

            <div className="flex justify-between font-mono text-xs text-[#64748B] mb-6">
              <span>SF7 (Fastest)</span>
              <span>SF9</span>
              <span>SF12 (Longest)</span>
            </div>

            {/* Live Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="p-5 rounded-2xl bg-[#F4F8FC] border border-[#E2EBF5] text-center">
                <span className="text-xs font-mono text-[#64748B] uppercase block">
                  Net Bitrate
                </span>
                <span className="font-mono text-2xl lg:text-3xl font-bold text-[#0F172A]">
                  {currentSFData.dataRate}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#F4F8FC] border border-[#E2EBF5] text-center">
                <span className="text-xs font-mono text-[#64748B] uppercase block">
                  Est. Reach
                </span>
                <span className="font-mono text-2xl lg:text-3xl font-bold text-[#0071E3]">
                  {currentSFData.reach}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#E0F2FE]/60 border border-[#0071E3]/20 text-xs sm:text-sm text-[#0F172A]">
            <strong>Deployment: </strong>{currentSFData.desc}
          </div>
        </div>
      </div>

      {/* 3. Footer */}
      <div className="w-full flex items-center justify-between border-t border-[#E2EBF5] pt-4">
        <p className="font-mono text-xs sm:text-sm text-[#64748B]">
          Sub-GHz frequencies (433/868/915 MHz) bend around obstacles far better than 2.4 GHz.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#0071E3] hover:text-[#0369A1] transition-colors interactive-hover"
        >
          <span>Radio vs Network</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
