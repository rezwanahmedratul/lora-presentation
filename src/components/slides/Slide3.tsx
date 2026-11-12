"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SLIDE_3_DATA } from "@/data/presentationData";
import { playChirpSound } from "@/utils/audio";
import { ArrowRight, Volume2, Play, Radio, Activity, Sparkles } from "lucide-react";

interface Slide3Props {
  onNextSlide: () => void;
}

export const Slide3: React.FC<Slide3Props> = ({ onNextSlide }) => {
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(0);

  const handleTransmitSequence = () => {
    if (isTransmitting) return;
    setIsTransmitting(true);
    playChirpSound(350, 400, 2400);

    setTimeout(() => {
      setPulseCount((prev) => prev + 1);
      setIsTransmitting(false);
    }, 1200);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-12 pb-10 px-8 sm:px-14 lg:px-20 xl:px-24 overflow-y-auto">
      {/* 1. Full-Width Headline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-semibold">
          {SLIDE_3_DATA.title}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">Chirp Spread</em>
          Spectrum (CSS).
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 max-w-4xl leading-relaxed">
          {SLIDE_3_DATA.subtitle} — sending data via frequency-sweeping signals that pierce through background noise.
        </p>
      </motion.div>

      {/* 2. Visual CSS Diagram + Interactive TX-to-RX Animated Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 my-auto py-3 items-center w-full">
        {/* Left: Clearly Labeled CSS Chirp Diagram (6 cols) */}
        <div className="lg:col-span-6 p-6 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full">
          <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-mono text-[#0F172A]">
            <span className="font-semibold flex items-center gap-2">
              <Activity size={16} className="text-[#0071E3]" />
              CSS Up-Chirp: Frequency Increasing Over Time
            </span>
            <button
              onClick={() => playChirpSound(350, 400, 2400)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0071E3] hover:bg-[#0071E3] hover:text-white transition-all text-xs font-mono font-medium interactive-hover"
            >
              <Volume2 size={13} />
              <span>Hear Chirp</span>
            </button>
          </div>

          {/* SVG Diagram showing Frequency vs Time Up-Chirp */}
          <div className="relative w-full aspect-[16/9] bg-[#F4F8FC] rounded-2xl border border-[#E2EBF5] p-4 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 540 260" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Axes */}
              <line x1="60" y1="20" x2="60" y2="220" stroke="#0F172A" strokeWidth="2" />
              <line x1="60" y1="220" x2="500" y2="220" stroke="#0F172A" strokeWidth="2" />
              <polygon points="60,15 56,25 64,25" fill="#0F172A" />
              <polygon points="505,220 495,216 495,224" fill="#0F172A" />

              {/* Axis labels */}
              <text x="30" y="30" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#0071E3">
                Frequency (f)
              </text>
              <text x="440" y="245" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#0071E3">
                Time (t)
              </text>

              {/* Grid guide lines */}
              <line x1="60" y1="60" x2="500" y2="60" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="60" y1="140" x2="500" y2="140" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
              <text x="15" y="65" fontFamily="monospace" fontSize="10" fill="#64748B">f_max</text>
              <text x="15" y="222" fontFamily="monospace" fontSize="10" fill="#64748B">f_min</text>

              {/* Rising Chirp Slope (Frequency sweeping from bottom-left to top-right) */}
              <line x1="80" y1="205" x2="260" y2="65" stroke="#0071E3" strokeWidth="4" strokeLinecap="round" />
              <line x1="280" y1="205" x2="460" y2="65" stroke="#0071E3" strokeWidth="4" strokeLinecap="round" />

              {/* Instant reset vertical dotted lines */}
              <line x1="260" y1="65" x2="280" y2="205" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Chirp wave representation underneath */}
              <path
                d="M 80 205 Q 120 180 160 140 T 260 65"
                fill="none"
                stroke="#0071E3"
                strokeWidth="1.5"
                opacity="0.3"
              />

              <text x="120" y="105" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#0071E3">
                Up-Chirp Symbol #1
              </text>
              <text x="320" y="105" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#0071E3">
                Up-Chirp Symbol #2
              </text>
            </svg>
          </div>

          <div className="mt-3 p-3 rounded-2xl bg-[#E0F2FE]/60 border border-[#0071E3]/20 text-xs sm:text-sm text-[#0F172A]">
            <strong>The Bird Chirp Analogy: </strong>{SLIDE_3_DATA.analogy}
          </div>
        </div>

        {/* Right: Interactive Device-to-Device Transmission Sequence (6 cols) */}
        <div className="lg:col-span-6 p-6 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full min-h-[400px]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0071E3] font-semibold">
                Interactive Sequence
              </span>
              <span className="font-mono text-xs text-[#64748B]">
                Signals Sent: {pulseCount}
              </span>
            </div>

            <h3 className="font-serif text-2xl lg:text-3xl text-[#0F172A] leading-tight mb-2">
              Transmitter to Receiver Over Radio Waves
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] mb-5">
              Click the button below to trigger frequency-swept chirps traveling across the wireless medium:
            </p>

            {/* Interactive Animated Wave Display */}
            <div className="p-5 rounded-2xl bg-[#F4F8FC] border border-[#E2EBF5] relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                {/* Transmitter Device */}
                <div className="p-4 rounded-2xl bg-white border border-[#E2EBF5] text-center w-28 shadow-xs">
                  <Radio size={20} className="text-[#0071E3] mx-auto mb-1" />
                  <span className="font-mono text-xs font-bold text-[#0F172A] block">
                    Transmitter
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">Node TX</span>
                </div>

                {/* Animated Flying Wave Packet */}
                <div className="flex-1 mx-4 relative flex items-center justify-center">
                  <div className="w-full border-b border-dashed border-[#CBD5E1]" />
                  {isTransmitting && (
                    <motion.div
                      initial={{ left: "0%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 1.1, ease: "easeInOut" }}
                      className="absolute -top-3.5 px-3 py-1 rounded-full bg-[#0071E3] text-white font-mono text-[10px] font-bold shadow-md shadow-[#0071E3]/50 flex items-center gap-1.5"
                    >
                      <Sparkles size={11} className="animate-spin" />
                      <span>Chirp RF Wave</span>
                    </motion.div>
                  )}
                </div>

                {/* Receiver Device */}
                <div className="p-4 rounded-2xl bg-[#0F172A] text-white text-center w-28 shadow-xs">
                  <Radio size={20} className="text-[#38BDF8] mx-auto mb-1" />
                  <span className="font-mono text-xs font-bold text-white block">
                    Receiver
                  </span>
                  <span className="text-[10px] font-mono text-[#38BDF8]">
                    {isTransmitting ? "Receiving..." : "Listening"}
                  </span>
                </div>
              </div>

              {/* Status bar */}
              <div className="mt-4 pt-3 border-t border-[#E2EBF5] flex items-center justify-between text-xs font-mono">
                <span className="text-[#64748B]">Status:</span>
                <span className="font-bold text-[#0071E3]">
                  {isTransmitting ? "Chirps sweeping 433 MHz in air..." : "Ready for next transmission"}
                </span>
              </div>
            </div>

            {/* Trigger Button */}
            <div className="mt-5">
              <button
                onClick={handleTransmitSequence}
                disabled={isTransmitting}
                className="w-full py-3 rounded-2xl bg-[#0071E3] text-white hover:bg-[#0369A1] font-sans text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all interactive-hover disabled:opacity-50 shadow-xs"
              >
                <Play size={16} />
                <span>{isTransmitting ? "Transmitting Chirp..." : "Send Signal Sequence"}</span>
              </button>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#E2EBF5] flex justify-end">
            <button
              onClick={onNextSlide}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0071E3] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#0369A1] transition-all interactive-hover shadow-xs"
            >
              <span>Next: Hardware & Connections</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
