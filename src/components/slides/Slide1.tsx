"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_1_DATA } from "@/data/presentationData";
import { playErrorSound, playSuccessSound } from "@/utils/audio";
import { ArrowRight, Wifi, Bluetooth, Radio } from "lucide-react";

interface Slide1Props {
  onNextSlide: () => void;
}

export const Slide1: React.FC<Slide1Props> = ({ onNextSlide }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);
  const [testedMap, setTestedMap] = useState<Record<number, boolean>>({});

  const handleCardClick = (idx: number) => {
    setSelectedIdx(idx);
    playErrorSound();
    setTestedMap((prev) => {
      const next = { ...prev, [idx]: true };
      if (Object.keys(next).length === SLIDE_1_DATA.trilemmaCards.length) {
        setTimeout(() => playSuccessSound(), 350);
      }
      return next;
    });
  };

  const allTested = Object.keys(testedMap).length === SLIDE_1_DATA.trilemmaCards.length;

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-14 pb-20 px-8 sm:px-14 lg:px-20 xl:px-24 overflow-y-auto">
      {/* 1. Full-Width Clean Headline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-semibold">
          {SLIDE_1_DATA.kicker}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">
            {SLIDE_1_DATA.headlineItalic}
          </em>
          {SLIDE_1_DATA.headlineRest}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 max-w-4xl leading-relaxed">
          {SLIDE_1_DATA.subtitle}
        </p>
      </motion.div>

      {/* 2. Full-Width Three Expansive Trilemma Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 my-auto py-4 w-full">
        {SLIDE_1_DATA.trilemmaCards.map((card, idx) => {
          const isSelected = selectedIdx === idx;
          const isTested = !!testedMap[idx];

          return (
            <motion.div
              key={card.name}
              onClick={() => handleCardClick(idx)}
              whileHover={{ y: -4 }}
              className={`p-7 lg:p-9 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between min-h-[280px] w-full ${
                isSelected
                  ? "bg-white border-[#0071E3] shadow-xl shadow-[#0071E3]/8 ring-1 ring-[#0071E3]/20"
                  : "bg-white/85 border-[#E2EBF5] hover:border-[#0071E3]/40 shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-[#E0F2FE] text-[#0071E3]">
                    {idx === 0 && <Wifi size={24} />}
                    {idx === 1 && <Bluetooth size={24} />}
                    {idx === 2 && <Radio size={24} />}
                  </div>

                  {isTested ? (
                    <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                      ✕ {card.failsBecause}
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-[#0071E3] bg-[#E0F2FE] px-3 py-1 rounded-full font-medium">
                      Test Trade-off
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-3xl lg:text-4xl text-[#0F172A]">{card.name}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-medium">{card.tagline}</p>
                <p className="text-xs sm:text-sm text-[#0F172A] mt-4 leading-relaxed">{card.flaw}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2EBF5] flex items-center justify-between text-xs sm:text-sm font-mono text-[#64748B]">
                <span>Reach: <strong className="text-[#0F172A]">{card.range}</strong></span>
                <span>Power: <strong className="text-[#0F172A]">{card.battery}</strong></span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Full-Width Resolution Banner */}
      <div className="w-full min-h-[56px] flex items-center justify-between">
        <AnimatePresence>
          {allTested ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-[#0071E3]/30 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0071E3] animate-ping" />
                <p className="font-serif italic text-lg sm:text-2xl text-[#0F172A]">
                  &ldquo;{SLIDE_1_DATA.resolution}&rdquo;
                </p>
              </div>

              <button
                onClick={onNextSlide}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0071E3] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#0369A1] transition-all interactive-hover shadow-xs shrink-0"
              >
                <span>Discover LoRa</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ) : (
            <p className="text-xs sm:text-sm font-mono text-[#64748B] mx-auto text-center">
              Click each wireless protocol to evaluate traditional IoT trade-offs.
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
