"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_6_DATA } from "@/data/presentationData";
import { playSuccessSound, playErrorSound } from "@/utils/audio";
import { ArrowRight, HelpCircle, CheckCircle2, XCircle, AlertOctagon, Check } from "lucide-react";

interface Slide6Props {
  onNextSlide: () => void;
}

export const Slide6: React.FC<Slide6Props> = ({ onNextSlide }) => {
  const [selectedTech, setSelectedTech] = useState<number | null>(null);

  const handleTechClick = (idx: number) => {
    setSelectedTech(idx);
    if (SLIDE_6_DATA.farmTechChoices[idx].correct) {
      playSuccessSound();
    } else {
      playErrorSound();
    }
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
          {SLIDE_6_DATA.title}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">Real-World Applications</em>
          &amp; Limitations.
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 max-w-4xl leading-relaxed">
          {SLIDE_6_DATA.subtitle} — understanding the practical deployment sweet spot.
        </p>
      </motion.div>

      {/* 2. Applications Grid + Limitations Box + Interactive Farm Technology Quiz */}
      <div className="my-auto py-3 space-y-5 w-full">
        {/* Applications Grid: 5 Domains */}
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#0071E3] font-bold block mb-2.5">
            5 Key Real-World Applications:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 w-full">
            {SLIDE_6_DATA.applications.map((app) => (
              <div
                key={app.title}
                className="p-5 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#0F172A]">{app.title}</h4>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-2 leading-relaxed">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations Row + Interactive Question (Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full items-start">
          {/* Limitations Row (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold text-rose-600">
              <AlertOctagon size={16} />
              <span>Hard Limitations (What LoRa is NOT designed for)</span>
            </div>

            <div className="space-y-2.5">
              {SLIDE_6_DATA.limitations.map((lim, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#F4F8FC] border border-[#E2EBF5] text-xs sm:text-sm">
                  <strong className="text-[#0F172A] block mb-0.5">✕ {lim.title}</strong>
                  <span className="text-[#64748B]">{lim.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Question Card (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-[#E0F2FE] text-[#0071E3]">
                  <HelpCircle size={15} />
                </span>
                <span className="font-mono text-xs font-bold text-[#0071E3] uppercase tracking-wider">
                  Interactive Decision
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#0F172A] mb-3">
                &ldquo;{SLIDE_6_DATA.interactiveQuestion}&rdquo;
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {SLIDE_6_DATA.farmTechChoices.map((choice, idx) => {
                  const isSelected = selectedTech === idx;
                  return (
                    <button
                      key={choice.name}
                      onClick={() => handleTechClick(idx)}
                      className={`p-3 rounded-2xl border text-xs sm:text-sm font-sans transition-all interactive-hover flex items-center justify-between ${
                        isSelected
                          ? choice.correct
                            ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-medium"
                            : "bg-rose-50 border-rose-300 text-rose-950"
                          : "bg-[#F4F8FC] border-[#E2EBF5] hover:border-[#0071E3] text-[#0F172A]"
                      }`}
                    >
                      <span className="font-semibold">{choice.name}</span>
                      {isSelected && (
                        choice.correct ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-rose-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {selectedTech !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3.5 p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                      SLIDE_6_DATA.farmTechChoices[selectedTech].correct
                        ? "bg-[#E0F2FE] border-[#0071E3]/30 text-[#0369A1]"
                        : "bg-amber-50 border-amber-200 text-amber-900"
                    }`}
                  >
                    {SLIDE_6_DATA.farmTechChoices[selectedTech].why}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E2EBF5] flex justify-end">
              <button
                onClick={onNextSlide}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#0071E3] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#0369A1] transition-all interactive-hover shadow-xs"
              >
                <span>Next: Quiz & Conclusion</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
