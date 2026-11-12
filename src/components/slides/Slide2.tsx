"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SLIDE_2_DATA } from "@/data/presentationData";
import { playSuccessSound } from "@/utils/audio";
import { ArrowRight, Check } from "lucide-react";

interface Slide2Props {
  onNextSlide: () => void;
}

export const Slide2: React.FC<Slide2Props> = ({ onNextSlide }) => {
  const [guessValue, setGuessValue] = useState<number>(50);
  const [hasRevealedDataRate, setHasRevealedDataRate] = useState<boolean>(false);
  const [activeMetric, setActiveMetric] = useState<"range" | "battery" | "cost">("range");
  const [rangeNum, setRangeNum] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRangeNum((prev) => (prev < 15 ? prev + 1 : 15));
    }, 45);
    return () => clearInterval(timer);
  }, []);

  const handleReveal = () => {
    setHasRevealedDataRate(true);
    playSuccessSound();
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-y-auto">
      {/* 1. Huge Minimal Headline */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-[#E2EBF2] pb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-semibold">
            {SLIDE_2_DATA.badge}
          </span>
          <div className="flex items-baseline gap-4 flex-wrap">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif text-[#0F172A] leading-none tracking-tight">
              {SLIDE_2_DATA.titleSerif}
            </h1>
            <span className="font-serif italic text-2xl sm:text-4xl text-[#0071E3] font-normal">
              {SLIDE_2_DATA.subtitle}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] font-sans mt-1.5 max-w-xl">
            {SLIDE_2_DATA.hook}
          </p>
        </motion.div>

        {/* 3 Counting Stats */}
        <div className="grid grid-cols-3 gap-3 shrink-0 w-full md:w-auto">
          <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E2EBF2] text-center shadow-xs">
            <div className="font-mono text-xl sm:text-3xl font-bold text-[#0071E3]">
              2–{rangeNum} <span className="text-xs font-normal text-[#0F172A]">km</span>
            </div>
            <div className="text-xs font-medium text-[#0F172A] mt-0.5">Range</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E2EBF2] text-center shadow-xs">
            <div className="font-mono text-xl sm:text-3xl font-bold text-[#0071E3]">
              10+ <span className="text-xs font-normal text-[#0F172A]">Years</span>
            </div>
            <div className="text-xs font-medium text-[#0F172A] mt-0.5">Battery</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E2EBF2] text-center shadow-xs">
            <div className="font-mono text-xl sm:text-3xl font-bold text-[#0F172A]">
              $0
            </div>
            <div className="text-xs font-medium text-[#0F172A] mt-0.5">Monthly Fee</div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Area: Data Rate Intuition & Clean Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-start">
        {/* Guess Slider Card (5 cols) */}
        <div className="lg:col-span-5 keynote-card p-5 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#0071E3] font-semibold block mb-1">
              Interactive Test
            </span>
            <h3 className="font-serif text-2xl text-[#0F172A]">
              {SLIDE_2_DATA.guessGame.prompt}
            </h3>

            <div className="my-5">
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-[#64748B]">Your Guess:</span>
                <span className="font-bold text-[#0071E3]">
                  {guessValue < 20
                    ? `${(guessValue * 50).toFixed(0)} bps`
                    : guessValue < 60
                    ? `${(guessValue * 1.5).toFixed(0)} kbps`
                    : `${(guessValue * 0.1).toFixed(1)} Mbps`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={guessValue}
                onChange={(e) => setGuessValue(Number(e.target.value))}
                className="w-full accent-[#0071E3] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#64748B] mt-1">
                <span>100 bps</span>
                <span>50 kbps</span>
                <span>10 Mbps</span>
              </div>
            </div>

            {!hasRevealedDataRate ? (
              <button
                onClick={handleReveal}
                className="w-full py-2.5 rounded-xl bg-[#0F172A] text-white hover:bg-[#0071E3] font-sans text-xs font-semibold transition-colors interactive-hover"
              >
                Reveal The Reality
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-[#E0F2FE] border border-[#0071E3]/20"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0369A1]">
                  <Check size={14} />
                  <span>{SLIDE_2_DATA.guessGame.revealedTitle}</span>
                </div>
                <p className="text-xs text-[#0F172A] mt-1.5 leading-relaxed">
                  {SLIDE_2_DATA.guessGame.insight}
                </p>
              </motion.div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2EBF2] font-serif italic text-sm text-[#0F172A]">
            &ldquo;LoRa trades speed for range and battery life.&rdquo;
          </div>
        </div>

        {/* Simplified Comparison Table (7 cols) */}
        <div className="lg:col-span-7 keynote-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-2xl text-[#0F172A]">
              Wireless Trade-Offs
            </h3>

            {/* Metric Tabs */}
            <div className="flex items-center gap-1 bg-[#EDF4F9] p-1 rounded-xl border border-[#E2EBF2] text-xs font-mono">
              <button
                onClick={() => setActiveMetric("range")}
                className={`px-3 py-1 rounded-lg transition-colors interactive-hover ${
                  activeMetric === "range" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
                }`}
              >
                Range
              </button>
              <button
                onClick={() => setActiveMetric("battery")}
                className={`px-3 py-1 rounded-lg transition-colors interactive-hover ${
                  activeMetric === "battery" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
                }`}
              >
                Battery
              </button>
              <button
                onClick={() => setActiveMetric("cost")}
                className={`px-3 py-1 rounded-lg transition-colors interactive-hover ${
                  activeMetric === "cost" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
                }`}
              >
                Cost
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {SLIDE_2_DATA.comparisonRows.map((row, idx) => {
              const score =
                activeMetric === "range"
                  ? row.rangeScore
                  : activeMetric === "battery"
                  ? row.batteryScore
                  : row.costScore;

              const metricText =
                activeMetric === "range"
                  ? row.range
                  : activeMetric === "battery"
                  ? row.battery
                  : row.cost;

              return (
                <div
                  key={row.name}
                  className={`p-3 rounded-2xl transition-all ${
                    row.isLora
                      ? "bg-gradient-to-r from-[#E0F2FE] to-white border-2 border-[#0071E3]"
                      : "bg-[#F8FAFC] border border-[#E2EBF2]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-1.5">
                    <span className={`flex items-center gap-2 ${row.isLora ? "font-bold text-[#0F172A]" : "text-[#0F172A]"}`}>
                      {row.name}
                      {row.isLora && (
                        <span className="font-mono text-[10px] bg-[#0071E3] text-white px-2 py-0.5 rounded-full font-semibold">
                          Optimal
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-xs text-[#64748B]">{metricText}</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#E2EBF2] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className={`h-full rounded-full ${
                        row.isLora ? "bg-[#0071E3]" : "bg-[#94A3B8]"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Footer Continue */}
      <div className="flex items-center justify-between border-t border-[#E2EBF2] pt-3">
        <p className="font-mono text-xs text-[#64748B]">
          Up next: The physics behind Chirp Spread Spectrum modulation.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0071E3] hover:text-[#0369A1] transition-colors interactive-hover"
        >
          <span>How LoRa Works</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
