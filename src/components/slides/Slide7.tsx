"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { SLIDE_7_DATA, QuizQuestion } from "@/data/presentationData";
import { playSuccessSound, playErrorSound } from "@/utils/audio";
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, AlertOctagon, Sparkles, MessageSquare } from "lucide-react";

interface Slide7Props {
  onRestartPresentation: () => void;
}

// 50 sensors positions corresponding to Slide 1
const SENSOR_POINTS_50 = [
  { x: 120, y: 70 }, { x: 190, y: 60 }, { x: 260, y: 80 }, { x: 340, y: 55 }, { x: 420, y: 75 }, { x: 510, y: 90 },
  { x: 90, y: 130 }, { x: 160, y: 120 }, { x: 230, y: 140 }, { x: 310, y: 125 }, { x: 390, y: 135 }, { x: 470, y: 145 }, { x: 550, y: 120 },
  { x: 140, y: 185 }, { x: 210, y: 190 }, { x: 280, y: 180 }, { x: 360, y: 195 }, { x: 440, y: 185 }, { x: 520, y: 200 },
  { x: 80, y: 240 }, { x: 170, y: 245 }, { x: 240, y: 235 }, { x: 320, y: 250 }, { x: 400, y: 240 }, { x: 490, y: 255 }, { x: 560, y: 230 },
  { x: 130, y: 295 }, { x: 200, y: 300 }, { x: 270, y: 290 }, { x: 350, y: 305 }, { x: 430, y: 295 }, { x: 510, y: 310 },
  { x: 90, y: 350 }, { x: 165, y: 360 }, { x: 245, y: 345 }, { x: 325, y: 365 }, { x: 405, y: 355 }, { x: 485, y: 370 }, { x: 555, y: 340 },
  { x: 120, y: 395 }, { x: 210, y: 405 }, { x: 290, y: 390 }, { x: 375, y: 400 }, { x: 450, y: 395 }, { x: 530, y: 385 },
  { x: 180, y: 155 }, { x: 300, y: 90 }, { x: 460, y: 105 }, { x: 260, y: 360 }, { x: 390, y: 325 }
];

export const Slide7: React.FC<Slide7Props> = ({ onRestartPresentation }) => {
  const [activeTab, setActiveTab] = useState<"summary" | "quiz" | "questions">("summary");

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = SLIDE_7_DATA.quizQuestions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentQ.id] !== undefined) return;

    const isCorrect = optionIndex === currentQ.correctIndex;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));

    if (isCorrect) {
      playSuccessSound();
      setQuizScore((prev) => prev + 1);
    } else {
      playErrorSound();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < SLIDE_7_DATA.quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      if (quizScore + (selectedAnswers[currentQ.id] === currentQ.correctIndex ? 0 : 0) >= 2) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FF5A1F", "#FFE9DD", "#C23B0A", "#161412"],
        });
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizScore(0);
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-y-auto">
      {/* 1. Header with View Toggle (Summary vs Quiz vs Questions?) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#E8E3DD]/80 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-semibold">
            {SLIDE_7_DATA.badge}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#161412] leading-[1.05] tracking-tight mt-1">
            <em className="italic text-[#FF5A1F] font-normal mr-2">
              {SLIDE_7_DATA.headlineItalic}
            </em>
            {SLIDE_7_DATA.headlineRest}
          </h1>
        </motion.div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#F4EFEA] p-1 rounded-xl border border-[#E8E3DD] text-xs font-mono shrink-0">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-3 py-1.5 rounded-lg transition-colors interactive-hover ${
              activeTab === "summary"
                ? "bg-white text-[#FF5A1F] font-bold shadow-xs"
                : "text-[#8A847C]"
            }`}
          >
            Resolution & Impact
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-3 py-1.5 rounded-lg transition-colors interactive-hover ${
              activeTab === "quiz"
                ? "bg-white text-[#FF5A1F] font-bold shadow-xs"
                : "text-[#8A847C]"
            }`}
          >
            Closing Quiz ({quizScore}/3)
          </button>
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-3 py-1.5 rounded-lg transition-colors interactive-hover ${
              activeTab === "questions"
                ? "bg-white text-[#FF5A1F] font-bold shadow-xs"
                : "text-[#8A847C]"
            }`}
          >
            Questions?
          </button>
        </div>
      </div>

      {/* 2. Main Content Body based on Active Tab */}
      <div className="my-auto py-3">
        <AnimatePresence mode="wait">
          {/* TAB 1: Summary, Farmer Callback, Applications & Limitations */}
          {activeTab === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Farmer Problem Solved: Map with all 50 glowing dots */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                {/* Visual Farm Map with 50 connected nodes */}
                <div className="lg:col-span-5 keynote-card p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#FF5A1F] flex items-center gap-1.5">
                      <Sparkles size={14} /> 200 Acres Fully Covered
                    </span>
                    <span className="font-mono text-[10px] text-[#8A847C]">50/50 Linked</span>
                  </div>

                  <div className="relative w-full aspect-[16/9] bg-[#F4EFEA] rounded-xl border border-[#E8E3DD] overflow-hidden">
                    <svg viewBox="0 0 620 420" className="w-full h-full">
                      {/* Central Gateway */}
                      <circle cx="40" cy="40" r="28" fill="#FF5A1F" fillOpacity="0.15" />
                      <circle cx="40" cy="40" r="7" fill="#FF5A1F" />

                      {/* Concentric LoRa Coverage Circle covering whole map */}
                      <circle cx="40" cy="40" r="620" fill="none" stroke="#FF5A1F" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />

                      {/* 50 sensor probes glowing bright orange with connecting lines */}
                      {SENSOR_POINTS_50.map((pt, i) => (
                        <g key={i}>
                          <line
                            x1="40"
                            y1="40"
                            x2={pt.x}
                            y2={pt.y}
                            stroke="#FF5A1F"
                            strokeWidth="0.8"
                            strokeOpacity="0.18"
                          />
                          <circle cx={pt.x} cy={pt.y} r="5" fill="#FF5A1F" />
                          <circle cx={pt.x} cy={pt.y} r="9" fill="none" stroke="#FF5A1F" strokeWidth="1" strokeOpacity="0.5" />
                        </g>
                      ))}
                    </svg>

                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-[#161412] font-semibold border border-[#E8E3DD]">
                      1 LoRa Gateway covers all 50 probes
                    </div>
                  </div>
                </div>

                {/* Farmer Resolution Text & 3 Key Takeaways */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFE9DD] to-white border border-[#FF5A1F]/30 mb-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#161412]">
                      {SLIDE_7_DATA.farmerClosure.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#161412] font-sans mt-1 leading-relaxed">
                      {SLIDE_7_DATA.farmerClosure.body}
                    </p>
                  </div>

                  {/* 3 Key Takeaways */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {SLIDE_7_DATA.keyTakeaways.map((takeaway) => (
                      <div
                        key={takeaway.number}
                        className="p-3 rounded-xl bg-white border border-[#E8E3DD] flex flex-col justify-between"
                      >
                        <span className="font-mono text-xs font-bold text-[#FF5A1F] block mb-1">
                          {takeaway.number}
                        </span>
                        <h4 className="font-sans font-bold text-xs text-[#161412]">
                          {takeaway.title}
                        </h4>
                        <p className="text-[11px] text-[#8A847C] mt-1 leading-snug">
                          {takeaway.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Application Domains Horizontal Cards */}
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#8A847C] font-semibold block mb-2">
                  Key Application Verticals:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {SLIDE_7_DATA.applications.map((app) => (
                    <div
                      key={app.title}
                      className="p-3 rounded-xl bg-white border border-[#E8E3DD] keynote-card-hover flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="font-sans font-bold text-xs text-[#161412]">
                          {app.title}
                        </h4>
                        <p className="text-[10px] text-[#8A847C] mt-1 line-clamp-3">
                          {app.desc}
                        </p>
                      </div>
                      <span className="font-mono text-[9px] text-[#FF5A1F] font-semibold mt-2 block">
                        {app.metric}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hard Physical Limitations */}
              <div className="p-3.5 rounded-2xl bg-[#F9F7F4] border border-[#E8E3DD]">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#C23B0A] mb-2">
                  <AlertOctagon size={14} />
                  <span>Physical Limitations (When NOT to use LoRa)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {SLIDE_7_DATA.limitations.map((lim) => (
                    <div key={lim.title}>
                      <span className="font-semibold text-[#161412] block">✕ {lim.title}</span>
                      <p className="text-[11px] text-[#8A847C] mt-0.5 leading-snug font-sans">
                        {lim.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Interactive 3-Question Closing Quiz */}
          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto keynote-card p-6 sm:p-8"
            >
              {!quizFinished ? (
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E3DD]">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#FF5A1F] font-bold flex items-center gap-1.5">
                      <HelpCircle size={15} /> Question {currentQuestionIndex + 1} of {SLIDE_7_DATA.quizQuestions.length}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#8A847C]">
                      Current Score: {quizScore}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#161412] mb-5 leading-tight">
                    {currentQ.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {currentQ.options.map((option, idx) => {
                      const userChoice = selectedAnswers[currentQ.id];
                      const isSelected = userChoice === idx;
                      const hasAnswered = userChoice !== undefined;
                      const isCorrect = idx === currentQ.correctIndex;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          disabled={hasAnswered}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-sans transition-all interactive-hover flex items-center justify-between ${
                            hasAnswered
                              ? isCorrect
                                ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-medium"
                                : isSelected
                                ? "bg-red-50 border-red-300 text-red-900"
                                : "bg-white border-[#E8E3DD] text-[#8A847C] opacity-60"
                              : "bg-white border-[#E8E3DD] hover:border-[#FF5A1F]/50 text-[#161412]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-[#8A847C] w-5">
                              {String.fromCharCode(65 + idx)}.
                            </span>
                            <span>{option}</span>
                          </div>

                          {hasAnswered && isCorrect && (
                            <CheckCircle2 size={17} className="text-emerald-600 shrink-0" />
                          )}
                          {hasAnswered && isSelected && !isCorrect && (
                            <XCircle size={17} className="text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation drawer when answered */}
                  {selectedAnswers[currentQ.id] !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3.5 rounded-xl bg-[#FFE9DD]/70 border border-[#FF5A1F]/30 text-xs text-[#161412]"
                    >
                      <strong className="text-[#C23B0A] font-mono block mb-1">
                        Technical Explanation:
                      </strong>
                      <p className="leading-relaxed">{currentQ.explanation}</p>
                    </motion.div>
                  )}

                  {/* Next question button */}
                  {selectedAnswers[currentQ.id] !== undefined && (
                    <div className="mt-5 flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className="px-5 py-2 rounded-full bg-[#FF5A1F] text-white hover:bg-[#C23B0A] font-sans text-xs font-semibold tracking-wide transition-colors interactive-hover"
                      >
                        {currentQuestionIndex < SLIDE_7_DATA.quizQuestions.length - 1
                          ? "Next Question →"
                          : "View Final Results →"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Final Score Screen */
                <div className="text-center py-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-bold">
                    Quiz Complete
                  </span>
                  <h3 className="font-serif text-5xl sm:text-6xl text-[#161412] mt-2">
                    {quizScore} / {SLIDE_7_DATA.quizQuestions.length}
                  </h3>
                  <p className="text-sm text-[#8A847C] font-sans mt-2 max-w-md mx-auto">
                    {quizScore === 3
                      ? "Outstanding! You have mastered the embedded fundamentals of LoRa CSS modulation, Spreading Factors, and SPI interfacing."
                      : "Great effort! Review the Chirp Spread Spectrum and 3.3V logic rules to lock in full mastery."}
                  </p>

                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      onClick={handleResetQuiz}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E3DD] bg-white text-xs font-mono text-[#161412] hover:border-[#FF5A1F] interactive-hover"
                    >
                      <RotateCcw size={14} />
                      <span>Retake Quiz</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("questions")}
                      className="px-5 py-2 rounded-full bg-[#FF5A1F] text-white hover:bg-[#C23B0A] text-xs font-mono font-semibold interactive-hover"
                    >
                      Proceed to Q&A Screen →
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: Big Keynote "Questions?" End Screen */}
          {activeTab === "questions" && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12 max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-semibold bg-[#FFE9DD] px-3.5 py-1.5 rounded-full mb-4">
                <MessageSquare size={14} /> Open Floor Discussion
              </div>

              <h2 className="text-7xl sm:text-9xl font-serif text-[#161412] tracking-tight leading-none">
                Questions<em className="text-[#FF5A1F] not-italic">?</em>
              </h2>

              <p className="text-base sm:text-xl font-serif italic text-[#8A847C] mt-4 max-w-xl mx-auto">
                &ldquo;Microprocessor, Microcontroller and Embedded Systems&rdquo;
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#161412]">
                <div className="px-4 py-2 rounded-xl bg-white border border-[#E8E3DD]">
                  Topic: <strong>LoRa Wireless Transceiver</strong>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white border border-[#E8E3DD]">
                  Module: <strong>SX1278 / Ra-02 (SPI)</strong>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white border border-[#E8E3DD]">
                  Modulation: <strong>Chirp Spread Spectrum</strong>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onRestartPresentation}
                  className="px-6 py-2.5 rounded-full bg-[#161412] text-white hover:bg-[#FF5A1F] font-mono text-xs font-semibold tracking-wider transition-colors interactive-hover shadow-sm"
                >
                  Restart Presentation From Slide 01 ↺
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Footer Takeaway */}
      <div className="flex items-center justify-between border-t border-[#E8E3DD]/80 pt-4">
        <p className="font-mono text-xs text-[#8A847C]">
          Thank you for listening! Embedded Systems LoRa Presentation.
        </p>
        <button
          onClick={onRestartPresentation}
          className="text-xs font-mono text-[#FF5A1F] hover:underline interactive-hover"
        >
          Slide 01
        </button>
      </div>
    </div>
  );
};
