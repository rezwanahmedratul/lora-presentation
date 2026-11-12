"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { SLIDE_7_DATA } from "@/data/presentationData";
import { playSuccessSound, playErrorSound } from "@/utils/audio";
import { CheckCircle2, RotateCcw, MessageSquare, Sparkles } from "lucide-react";

interface Slide7Props {
  onRestartPresentation: () => void;
}

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

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = SLIDE_7_DATA.quizQuestions[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedAnswers[currentQ.id] !== undefined) return;

    const isCorrect = idx === currentQ.correctIndex;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));

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
      confetti({
        particleCount: 70,
        spread: 60,
        colors: ["#0071E3", "#38BDF8", "#E0F2FE", "#0F172A"],
      });
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
      {/* 1. Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#E2EBF2] pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-semibold">
            {SLIDE_7_DATA.badge}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#0F172A] leading-tight tracking-tight mt-1">
            <em className="italic text-[#0071E3] font-normal mr-2">
              {SLIDE_7_DATA.headlineItalic}
            </em>
            {SLIDE_7_DATA.headlineRest}
          </h1>
        </motion.div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-[#EDF4F9] p-1 rounded-xl border border-[#E2EBF2] text-xs font-mono shrink-0">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-3 py-1.5 rounded-lg transition-colors interactive-hover ${
              activeTab === "summary" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
            }`}
          >
            Resolution
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-3 py-1.5 rounded-lg transition-colors interactive-hover ${
              activeTab === "quiz" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
            }`}
          >
            Quiz ({quizScore}/3)
          </button>
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-3 py-1.5 rounded-lg transition-colors interactive-hover ${
              activeTab === "questions" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
            }`}
          >
            Questions?
          </button>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="my-auto py-2">
        <AnimatePresence mode="wait">
          {/* TAB 1: Resolution & 3 Key Takeaways */}
          {activeTab === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Farmer callback map */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-5 keynote-card p-4 overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#0071E3] font-bold flex items-center gap-1">
                      <Sparkles size={13} /> 200 Acres Covered
                    </span>
                    <span className="text-[#64748B]">50/50 Connected</span>
                  </div>

                  <div className="relative w-full aspect-[16/9] bg-[#EDF4F9] rounded-xl border border-[#E2EBF2] overflow-hidden">
                    <svg viewBox="0 0 620 420" className="w-full h-full">
                      <circle cx="40" cy="40" r="16" fill="#0071E3" fillOpacity="0.2" />
                      <circle cx="40" cy="40" r="6" fill="#0071E3" />
                      <circle cx="40" cy="40" r="580" fill="none" stroke="#0071E3" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

                      {SENSOR_POINTS_50.map((pt, i) => (
                        <g key={i}>
                          <line x1="40" y1="40" x2={pt.x} y2={pt.y} stroke="#0071E3" strokeWidth="0.8" strokeOpacity="0.15" />
                          <circle cx={pt.x} cy={pt.y} r="4" fill="#0071E3" />
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div className="p-4 rounded-2xl bg-[#E0F2FE] border border-[#0071E3]/20 mb-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#0F172A]">
                      The Problem Solved
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0F172A] mt-1">
                      {SLIDE_7_DATA.farmerClosure}
                    </p>
                  </div>

                  {/* 3 Key Takeaways */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {SLIDE_7_DATA.keyTakeaways.map((t) => (
                      <div key={t.num} className="p-3 rounded-xl bg-white border border-[#E2EBF2]">
                        <span className="font-mono text-xs font-bold text-[#0071E3] block mb-0.5">
                          {t.num}
                        </span>
                        <h4 className="font-sans font-bold text-xs text-[#0F172A]">{t.title}</h4>
                        <p className="text-[11px] text-[#64748B] mt-0.5">{t.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Applications Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SLIDE_7_DATA.applications.map((app) => (
                  <div key={app.title} className="p-3 rounded-xl bg-white border border-[#E2EBF2]">
                    <h4 className="font-sans font-bold text-xs text-[#0F172A]">{app.title}</h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5">{app.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: Clean 3-Question Quiz */}
          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto keynote-card p-6"
            >
              {!quizFinished ? (
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#64748B] border-b border-[#E2EBF2] pb-2">
                    <span className="text-[#0071E3] font-bold">
                      Question {currentQuestionIndex + 1} of 3
                    </span>
                    <span>Score: {quizScore}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#0F172A] mb-4">
                    {currentQ.question}
                  </h3>

                  <div className="space-y-2">
                    {currentQ.options.map((opt, idx) => {
                      const userChoice = selectedAnswers[currentQ.id];
                      const isAnswered = userChoice !== undefined;
                      const isCorrect = idx === currentQ.correctIndex;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          disabled={isAnswered}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all interactive-hover flex items-center justify-between ${
                            isAnswered
                              ? isCorrect
                                ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-medium"
                                : userChoice === idx
                                ? "bg-rose-50 border-rose-300 text-rose-900"
                                : "bg-white border-[#E2EBF2] text-[#94A3B8]"
                              : "bg-white border-[#E2EBF2] hover:border-[#0071E3] text-[#0F172A]"
                          }`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isCorrect && <CheckCircle2 size={16} className="text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswers[currentQ.id] !== undefined && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className="px-5 py-2 rounded-full bg-[#0071E3] text-white hover:bg-[#0369A1] text-xs font-semibold interactive-hover"
                      >
                        {currentQuestionIndex < 2 ? "Next Question →" : "Finish Quiz →"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-bold">
                    Quiz Score
                  </span>
                  <h3 className="font-serif text-5xl text-[#0F172A] mt-1">
                    {quizScore} / 3
                  </h3>
                  <p className="text-xs text-[#64748B] mt-2">
                    {quizScore === 3 ? "Perfect score! You've mastered LoRa fundamentals." : "Great effort!"}
                  </p>
                  <div className="mt-5 flex justify-center gap-3">
                    <button
                      onClick={handleResetQuiz}
                      className="px-4 py-1.5 rounded-full border border-[#E2EBF2] bg-white text-xs font-mono interactive-hover"
                    >
                      <RotateCcw size={13} className="inline mr-1" /> Retake
                    </button>
                    <button
                      onClick={() => setActiveTab("questions")}
                      className="px-5 py-1.5 rounded-full bg-[#0071E3] text-white text-xs font-mono font-semibold interactive-hover"
                    >
                      Q&A Screen →
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: Questions? Screen */}
          {activeTab === "questions" && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#0071E3] bg-[#E0F2FE] px-3.5 py-1 rounded-full mb-3">
                <MessageSquare size={13} /> Discussion
              </div>

              <h2 className="text-7xl sm:text-9xl font-serif text-[#0F172A] tracking-tight leading-none">
                Questions<em className="text-[#0071E3] not-italic">?</em>
              </h2>

              <p className="text-base sm:text-lg font-serif italic text-[#64748B] mt-3">
                &ldquo;Microprocessor & Embedded Systems&rdquo;
              </p>

              <div className="mt-8">
                <button
                  onClick={onRestartPresentation}
                  className="px-6 py-2.5 rounded-full bg-[#0F172A] text-white hover:bg-[#0071E3] font-mono text-xs font-semibold tracking-wider transition-colors interactive-hover"
                >
                  Restart Presentation (Slide 01) ↺
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Footer */}
      <div className="flex items-center justify-between border-t border-[#E2EBF2] pt-3">
        <p className="font-mono text-xs text-[#64748B]">
          Embedded Systems LoRa Presentation.
        </p>
        <button
          onClick={onRestartPresentation}
          className="text-xs font-mono text-[#0071E3] hover:underline interactive-hover"
        >
          Slide 01
        </button>
      </div>
    </div>
  );
};
