"use client";

import React from "react";
import { motion } from "framer-motion";
import { SLIDE_2_DATA } from "@/data/presentationData";
import { ArrowRight } from "lucide-react";

interface Slide2Props {
  onNextSlide: () => void;
}

export const Slide2: React.FC<Slide2Props> = ({ onNextSlide }) => {
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
          {SLIDE_2_DATA.kicker}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">
            {SLIDE_2_DATA.headlineItalic}
          </em>
          {SLIDE_2_DATA.headlineRest}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 max-w-4xl leading-relaxed">
          {SLIDE_2_DATA.subtitle}
        </p>
      </motion.div>

      {/* 2. Full-Width Three Massive Minimalist Stat Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 my-auto py-4 w-full">
        {SLIDE_2_DATA.stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-8 lg:p-10 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full"
          >
            <div>
              <span className="font-mono text-6xl sm:text-8xl lg:text-9xl font-bold text-[#0071E3] tracking-tight">
                {stat.value}
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[#0F172A] ml-2 font-normal">
                {stat.unit}
              </span>
            </div>

            <div className="mt-8 pt-5 border-t border-[#E2EBF5]">
              <div className="font-sans font-semibold text-lg lg:text-xl text-[#0F172A]">
                {stat.label}
              </div>
              <div className="text-xs sm:text-sm text-[#64748B] mt-1">
                {stat.sub}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Full-Width Core Insight Card */}
      <div className="w-full p-6 lg:p-8 rounded-3xl bg-[#E0F2FE]/50 border border-[#0071E3]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-wider text-[#0071E3] font-bold block mb-1">
            The Mathematical Secret
          </span>
          <p className="font-serif italic text-lg sm:text-2xl text-[#0F172A]">
            &ldquo;{SLIDE_2_DATA.speedComparison.quote}&rdquo;
          </p>
        </div>

        <button
          onClick={onNextSlide}
          className="shrink-0 flex items-center gap-2 px-7 py-3 rounded-full bg-[#0071E3] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#0369A1] transition-all interactive-hover shadow-xs"
        >
          <span>See How Chirps Work</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
