"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_7_DATA } from "@/data/presentationData";
import { MessageSquare } from "lucide-react";

interface Slide7Props {
  onRestartPresentation: () => void;
}

export const Slide7: React.FC<Slide7Props> = ({ onRestartPresentation }) => {
  const [showQuestions, setShowQuestions] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-14 pb-20 px-8 sm:px-14 lg:px-20 xl:px-24 overflow-y-auto">
      {/* 1. Full-Width Headline */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#E2EBF5] pb-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-semibold">
            {SLIDE_7_DATA.kicker}
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
            <em className="italic text-[#0071E3] font-normal mr-3">
              {SLIDE_7_DATA.headlineItalic}
            </em>
            {SLIDE_7_DATA.headlineRest}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 leading-relaxed">
            {SLIDE_7_DATA.subtitle}
          </p>
        </motion.div>

        {/* View Toggle */}
        <button
          onClick={() => setShowQuestions(!showQuestions)}
          className="px-5 py-2.5 rounded-full border border-[#E2EBF5] bg-white text-xs sm:text-sm font-mono text-[#0071E3] hover:border-[#0071E3] flex items-center gap-2 interactive-hover shadow-xs shrink-0"
        >
          <MessageSquare size={15} />
          <span>{showQuestions ? "Show Summary" : "Q&A Screen"}</span>
        </button>
      </div>

      {/* 2. Full-Width Main Body */}
      <div className="my-auto py-4 w-full">
        <AnimatePresence mode="wait">
          {!showQuestions ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6 w-full"
            >
              {/* 3 Verticals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {SLIDE_7_DATA.verticals.map((vert) => (
                  <div
                    key={vert.title}
                    className="p-7 lg:p-9 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between min-h-[190px] w-full"
                  >
                    <div>
                      <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#0071E3] font-bold block mb-1">
                        {vert.metric}
                      </span>
                      <h4 className="font-serif text-2xl lg:text-3xl text-[#0F172A]">{vert.title}</h4>
                      <p className="text-xs sm:text-sm text-[#64748B] mt-2.5 leading-relaxed">{vert.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3 Key Takeaways */}
              <div className="w-full p-7 lg:p-9 rounded-3xl bg-[#E0F2FE]/50 border border-[#0071E3]/20">
                <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#0071E3] font-bold block mb-3">
                  Summary for Embedded Systems Engineers
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm font-sans text-[#0F172A]">
                  {SLIDE_7_DATA.takeaways.map((takeaway, i) => (
                    <div key={i} className="leading-relaxed font-medium">
                      {takeaway}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Big Minimalist "Questions?" Keynote Screen */
            <motion.div
              key="questions"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 w-full mx-auto"
            >
              <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#0071E3] bg-[#E0F2FE] px-4 py-1.5 rounded-full font-semibold">
                Open Floor Discussion
              </span>

              <h2 className="text-8xl sm:text-9xl lg:text-[11rem] font-serif text-[#0F172A] tracking-tight leading-none mt-6">
                Questions<em className="text-[#0071E3] not-italic">?</em>
              </h2>

              <p className="text-xl sm:text-2xl font-serif italic text-[#64748B] mt-5">
                &ldquo;Microprocessor & Embedded Systems&rdquo;
              </p>

              <div className="mt-10">
                <button
                  onClick={onRestartPresentation}
                  className="px-8 py-3 rounded-full bg-[#0F172A] text-white hover:bg-[#0071E3] font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors interactive-hover shadow-xs"
                >
                  Restart Presentation (Slide 01) ↺
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Footer */}
      <div className="w-full flex items-center justify-between border-t border-[#E2EBF5] pt-4">
        <p className="font-mono text-xs sm:text-sm text-[#64748B]">
          Thank you for listening. LoRa Wireless Module.
        </p>
        <button
          onClick={onRestartPresentation}
          className="text-xs sm:text-sm font-mono text-[#0071E3] hover:underline interactive-hover font-semibold"
        >
          Slide 01
        </button>
      </div>
    </div>
  );
};
