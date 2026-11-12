"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_2_DATA } from "@/data/presentationData";
import { playSuccessSound, playErrorSound } from "@/utils/audio";
import { ArrowRight, HelpCircle, CheckCircle2, Battery, Zap, Radio } from "lucide-react";

interface Slide2Props {
  onNextSlide: () => void;
}

export const Slide2: React.FC<Slide2Props> = ({ onNextSlide }) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const handleChoice = (idx: number) => {
    setSelectedChoice(idx);
    if (SLIDE_2_DATA.speedVsBatteryOptions[idx].correct) {
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-12 pb-16 px-8 sm:px-14 lg:px-20 xl:px-24 overflow-y-auto">
      {/* 1. Full-Width Headline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-semibold">
          {SLIDE_2_DATA.title}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">Long Range.</em>
          Low Power.
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2 max-w-4xl leading-relaxed">
          {SLIDE_2_DATA.subtitle} — the foundational wireless standard for the Internet of Things (IoT).
        </p>
      </motion.div>

      {/* 2. Visual Module Representation + Interactive Question */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 my-auto py-2 items-center w-full">
        {/* Visual: SX1278 Hardware Module Illustration (7 cols) */}
        <div className="lg:col-span-7 p-6 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full">
          <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-mono text-[#0F172A]">
            <span className="font-semibold flex items-center gap-2">
              <Radio size={16} className="text-[#0071E3]" />
              Physical SX1278 Hardware Module + Antenna
            </span>
            <span className="text-[#64748B]">433 / 868 / 915 MHz</span>
          </div>

          {/* SVG Illustration of SX1278 with Antenna & RF Waves */}
          <div className="relative w-full aspect-[16/8] bg-[#F4F8FC] rounded-2xl border border-[#E2EBF5] p-5 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 600 240" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <rect x="60" y="30" width="220" height="180" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="3" />
              <text x="170" y="62" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="13" fontWeight="bold">
                LORA SX1278
              </text>

              <rect x="100" y="75" width="140" height="110" rx="8" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="170" cy="130" r="22" fill="#E2E8F0" />
              <text x="170" y="134" textAnchor="middle" fill="#0F172A" fontFamily="monospace" fontSize="11" fontWeight="bold">
                SEMTECH
              </text>

              {/* Antenna */}
              <g transform="translate(280, 50)">
                <line x1="0" y1="20" x2="15" y2="20" stroke="#38BDF8" strokeWidth="4" />
                <path d="M 15 20 Q 30 5 45 20 T 75 20 T 105 20 T 135 20 T 165 20" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
                <circle cx="170" cy="20" r="5" fill="#0071E3" className="animate-ping" />
              </g>

              {/* RF Waves */}
              <path d="M 470 40 A 50 50 0 0 1 470 100" fill="none" stroke="#0071E3" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
              <path d="M 490 25 A 75 75 0 0 1 490 115" fill="none" stroke="#0071E3" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" opacity="0.7" />
              <path d="M 515 10 A 105 105 0 0 1 515 130" fill="none" stroke="#0071E3" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" opacity="0.5" />
              <text x="470" y="160" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#0071E3">
                Kilometers Line-of-Sight
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-[#E2EBF5]">
            {SLIDE_2_DATA.stats.map((stat, i) => (
              <div key={i} className="p-3 rounded-2xl bg-[#F4F8FC] border border-[#E2EBF5]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#64748B] block">{stat.label}</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#0071E3] block mt-0.5">{stat.value}</span>
                <span className="text-xs text-[#0F172A] mt-1 block">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Question: Speed vs Battery (5 cols) */}
        <div className="lg:col-span-5 p-6 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full min-h-[380px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-[#E0F2FE] text-[#0071E3]">
                <HelpCircle size={16} />
              </span>
              <span className="font-mono text-xs font-bold text-[#0071E3] uppercase tracking-wider">
                Concept Check
              </span>
            </div>

            <h3 className="font-serif text-2xl lg:text-3xl text-[#0F172A] leading-tight mb-4">
              &ldquo;{SLIDE_2_DATA.interactiveQuestion}&rdquo;
            </h3>

            <div className="space-y-3">
              {SLIDE_2_DATA.speedVsBatteryOptions.map((opt, idx) => {
                const isSelected = selectedChoice === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleChoice(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all interactive-hover flex items-center justify-between ${
                      isSelected
                        ? opt.correct
                          ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-medium"
                          : "bg-rose-50 border-rose-300 text-rose-950"
                        : "bg-[#F4F8FC] border-[#E2EBF5] hover:border-[#0071E3] text-[#0F172A]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {idx === 0 ? <Zap size={18} className="text-amber-500 shrink-0" /> : <Battery size={18} className="text-emerald-500 shrink-0" />}
                      <span>{opt.choice}</span>
                    </div>

                    {isSelected && (
                      opt.correct ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> : <span className="font-mono text-xs text-rose-600 font-bold">Wrong</span>
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedChoice !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                    SLIDE_2_DATA.speedVsBatteryOptions[selectedChoice].correct
                      ? "bg-[#E0F2FE] border-[#0071E3]/30 text-[#0369A1]"
                      : "bg-amber-50 border-amber-200 text-amber-900"
                  }`}
                >
                  <strong>Why: </strong>
                  {SLIDE_2_DATA.speedVsBatteryOptions[selectedChoice].result}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-5 pt-3 border-t border-[#E2EBF5] flex justify-end">
            <button
              onClick={onNextSlide}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0071E3] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#0369A1] transition-all interactive-hover shadow-xs"
            >
              <span>Next: How Does It Work?</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
