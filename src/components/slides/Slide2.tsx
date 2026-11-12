"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_2_DATA } from "@/data/presentationData";
import { playSuccessSound } from "@/utils/audio";
import { Sparkles, HelpCircle, ArrowRight, Check } from "lucide-react";

interface Slide2Props {
  onNextSlide: () => void;
}

export const Slide2: React.FC<Slide2Props> = ({ onNextSlide }) => {
  const [guessValue, setGuessValue] = useState<number>(50); // Slider 0 to 100
  const [hasRevealedDataRate, setHasRevealedDataRate] = useState<boolean>(false);
  const [activeMetric, setActiveMetric] = useState<"range" | "battery" | "dataRate" | "cost">("range");

  // Number counting effect on reveal
  const [rangeNum, setRangeNum] = useState<number>(0);
  const [yearsNum, setYearsNum] = useState<number>(0);

  useEffect(() => {
    const timer1 = setInterval(() => {
      setRangeNum((prev) => (prev < 15 ? prev + 1 : 15));
    }, 45);
    const timer2 = setInterval(() => {
      setYearsNum((prev) => (prev < 10 ? prev + 1 : 10));
    }, 60);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  const handleReveal = () => {
    setHasRevealedDataRate(true);
    playSuccessSound();
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-y-auto">
      {/* 1. Dramatic Reveal Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-[#E8E3DD]/80 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-semibold flex items-center gap-1.5">
              <Sparkles size={14} />
              {SLIDE_2_DATA.badge}
            </span>
          </div>

          <div className="flex items-baseline gap-4 flex-wrap">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif text-[#161412] leading-none tracking-tight">
              {SLIDE_2_DATA.titleSerif}
            </h1>
            <span className="font-serif italic text-2xl sm:text-4xl text-[#FF5A1F] font-normal">
              {SLIDE_2_DATA.subtitle}
            </span>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-[#8A847C] font-sans mt-2 max-w-2xl">
            {SLIDE_2_DATA.hook}
          </p>
        </motion.div>

        {/* 3 Headline Counting Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0 w-full md:w-auto"
        >
          <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E8E3DD] shadow-sm">
            <div className="font-mono text-xl sm:text-3xl font-bold text-[#FF5A1F]">
              2–{rangeNum} <span className="text-xs sm:text-sm font-normal text-[#161412]">km</span>
            </div>
            <div className="text-xs font-semibold text-[#161412] mt-0.5">Real Range</div>
            <div className="text-[10px] text-[#8A847C] font-mono mt-0.5">Rural / LoS</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E8E3DD] shadow-sm">
            <div className="font-mono text-xl sm:text-3xl font-bold text-[#FF5A1F]">
              {yearsNum}+ <span className="text-xs sm:text-sm font-normal text-[#161412]">Years</span>
            </div>
            <div className="text-xs font-semibold text-[#161412] mt-0.5">Battery Life</div>
            <div className="text-[10px] text-[#8A847C] font-mono mt-0.5">AA / Coin cell</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E8E3DD] shadow-sm">
            <div className="font-mono text-xl sm:text-3xl font-bold text-[#161412]">
              $0
            </div>
            <div className="text-xs font-semibold text-[#161412] mt-0.5">Monthly Fee</div>
            <div className="text-[10px] text-[#FF5A1F] font-mono mt-0.5">License-Free ISM</div>
          </div>
        </motion.div>
      </div>

      {/* 2. Interactive Area: Guess Data Rate Widget & Comparison Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4 items-start">
        {/* Interactive "Guess the data rate" slider (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="lg:col-span-5 keynote-card p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-[#FFE9DD] text-[#FF5A1F]">
                <HelpCircle size={16} />
              </span>
              <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-wider">
                Interactive Intuition Test
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#161412]">
              {SLIDE_2_DATA.guessGame.prompt}
            </h3>
            <p className="text-xs text-[#8A847C] mt-1">
              {SLIDE_2_DATA.guessGame.subtitle}
            </p>

            {/* Slider */}
            <div className="mt-6 mb-4">
              <div className="flex justify-between items-baseline mb-2 font-mono text-xs">
                <span className="text-[#8A847C]">Your Guess:</span>
                <span className="text-lg font-bold text-[#FF5A1F]">
                  {guessValue < 15
                    ? `${(guessValue * 50).toFixed(0)} bps (Tiny bytes)`
                    : guessValue < 40
                    ? `${(guessValue * 2).toFixed(0)} kbps (Audio-like)`
                    : guessValue < 75
                    ? `${(guessValue * 0.1).toFixed(1)} Mbps (Wi-Fi/4G)`
                    : `${guessValue} Mbps (Broadband)`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={guessValue}
                onChange={(e) => setGuessValue(Number(e.target.value))}
                className="w-full accent-[#FF5A1F] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#8A847C] mt-1">
                <span>100 bps</span>
                <span>10 kbps</span>
                <span>1 Mbps</span>
                <span>100 Mbps</span>
              </div>
            </div>

            {!hasRevealedDataRate ? (
              <button
                onClick={handleReveal}
                className="w-full mt-2 py-3 rounded-xl bg-[#161412] text-white hover:bg-[#FF5A1F] font-sans text-xs font-semibold tracking-wide transition-all interactive-hover"
              >
                Reveal The Reality
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-[#FFE9DD]/70 border border-[#FF5A1F]/30"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C23B0A]">
                  <Check size={16} />
                  <span>Reality: {SLIDE_2_DATA.guessGame.revealedTitle}</span>
                </div>
                <p className="text-xs text-[#161412] mt-2 leading-relaxed">
                  {SLIDE_2_DATA.guessGame.insight}
                </p>
              </motion.div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-[#E8E3DD]/80">
            <span className="font-mono text-[11px] text-[#8A847C] uppercase tracking-wider block mb-1">
              Core Design Rule:
            </span>
            <p className="font-serif italic text-base text-[#161412]">
              &ldquo;LoRa trades speed for range and battery life.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Animated Comparison Table (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="lg:col-span-7 keynote-card p-5 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF5A1F] font-semibold">
                Comparative Landscape
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#161412]">
                Wireless Trade-Offs Matrix
              </h3>
            </div>

            {/* Metric Selector Tabs */}
            <div className="flex items-center gap-1 bg-[#F4EFEA] p-1 rounded-xl border border-[#E8E3DD] text-[11px] font-mono">
              <button
                onClick={() => setActiveMetric("range")}
                className={`px-2.5 py-1 rounded-lg transition-colors interactive-hover ${
                  activeMetric === "range" ? "bg-white text-[#FF5A1F] font-bold shadow-xs" : "text-[#8A847C]"
                }`}
              >
                Range
              </button>
              <button
                onClick={() => setActiveMetric("battery")}
                className={`px-2.5 py-1 rounded-lg transition-colors interactive-hover ${
                  activeMetric === "battery" ? "bg-white text-[#FF5A1F] font-bold shadow-xs" : "text-[#8A847C]"
                }`}
              >
                Battery
              </button>
              <button
                onClick={() => setActiveMetric("dataRate")}
                className={`px-2.5 py-1 rounded-lg transition-colors interactive-hover ${
                  activeMetric === "dataRate" ? "bg-white text-[#FF5A1F] font-bold shadow-xs" : "text-[#8A847C]"
                }`}
              >
                Data Rate
              </button>
              <button
                onClick={() => setActiveMetric("cost")}
                className={`px-2.5 py-1 rounded-lg transition-colors interactive-hover ${
                  activeMetric === "cost" ? "bg-white text-[#FF5A1F] font-bold shadow-xs" : "text-[#8A847C]"
                }`}
              >
                Cost
              </button>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-3">
            {SLIDE_2_DATA.comparisonRows.map((row, idx) => {
              const score =
                activeMetric === "range"
                  ? row.rangeScore
                  : activeMetric === "battery"
                  ? row.batteryScore
                  : activeMetric === "dataRate"
                  ? row.dataRateScore
                  : row.costScore;

              const metricText =
                activeMetric === "range"
                  ? row.range
                  : activeMetric === "battery"
                  ? row.battery
                  : activeMetric === "dataRate"
                  ? row.dataRate
                  : row.cost;

              return (
                <div
                  key={row.name}
                  className={`p-3 rounded-2xl transition-all ${
                    row.isLora
                      ? "bg-gradient-to-r from-[#FFE9DD]/90 to-white border-2 border-[#FF5A1F] shadow-sm"
                      : "bg-[#F9F7F4]/60 border border-[#E8E3DD]/70"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-1.5">
                    <span className={`flex items-center gap-2 ${row.isLora ? "font-bold text-[#161412]" : "text-[#161412]"}`}>
                      {row.name}
                      {row.isLora && (
                        <span className="font-mono text-[10px] uppercase tracking-wider bg-[#FF5A1F] text-white px-2 py-0.5 rounded-full font-semibold">
                          Winner
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-xs text-[#8A847C]">
                      {metricText}
                    </span>
                  </div>

                  {/* Animated Bar */}
                  <div className="w-full h-2 rounded-full bg-[#E8E3DD]/60 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        row.isLora
                          ? "bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.5)]"
                          : "bg-[#8A847C]/40"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* 3. Footer Takeaway & Continue */}
      <div className="flex items-center justify-between border-t border-[#E8E3DD]/80 pt-4">
        <p className="font-mono text-xs text-[#8A847C]">
          Up next: The mathematical secret behind 15 km transmission on milliwatts.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-2 text-xs font-mono font-semibold text-[#FF5A1F] hover:text-[#C23B0A] transition-colors interactive-hover"
        >
          <span>See How LoRa Works</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
