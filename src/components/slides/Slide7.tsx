"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { SLIDE_7_DATA } from "@/data/presentationData";
import { playSuccessSound, playErrorSound, playChirpSound } from "@/utils/audio";
import { Radio, CheckCircle2, XCircle, RotateCcw, Send, HelpCircle, Sparkles } from "lucide-react";

interface Slide7Props {
  onRestartPresentation: () => void;
}

export const Slide7: React.FC<Slide7Props> = ({ onRestartPresentation }) => {
  // Demo simulation state
  const [demoMessage, setDemoMessage] = useState<string>("Hello from Node 1");
  const [isDemoTransmitting, setIsDemoTransmitting] = useState<boolean>(false);
  const [displayedOnRx, setDisplayedOnRx] = useState<string>("Received by Node 2");

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = SLIDE_7_DATA.quizQuestions[currentQIndex];

  const handleRunDemo = () => {
    if (isDemoTransmitting) return;
    setIsDemoTransmitting(true);
    playChirpSound(300, 500, 2200);

    setTimeout(() => {
      setDisplayedOnRx(`Received: "${demoMessage}"`);
      setIsDemoTransmitting(false);
      playSuccessSound();
    }, 900);
  };

  const handleSelectQuizOption = (idx: number) => {
    if (userAnswers[currentQ.id] !== undefined) return;

    const isCorrect = idx === currentQ.correctIndex;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));

    if (isCorrect) {
      playSuccessSound();
      setQuizScore((prev) => prev + 1);
    } else {
      playErrorSound();
    }
  };

  const handleNextQuiz = () => {
    if (currentQIndex < SLIDE_7_DATA.quizQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 80,
        spread: 70,
        colors: ["#0071E3", "#38BDF8", "#E0F2FE", "#0F172A"],
      });
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setQuizScore(0);
    setCurrentQIndex(0);
    setQuizFinished(false);
  };

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
          Slide {SLIDE_7_DATA.slideNumber} • {SLIDE_7_DATA.title}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">Demonstration, Quiz</em>
          &amp; Conclusion.
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 max-w-4xl leading-relaxed">
          {SLIDE_7_DATA.subtitle} — testing comprehension and reviewing live 2-node wireless reception.
        </p>
      </motion.div>

      {/* 2. Main Body: Mini Demonstration (Left) + Interactive 3-Question Quiz (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 my-auto py-3 items-start w-full">
        {/* Left: Mini Transmitter-Receiver Demonstration (6 cols) */}
        <div className="lg:col-span-6 p-6 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between min-h-[440px] w-full">
          <div>
            <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-mono text-[#0F172A]">
              <span className="font-semibold flex items-center gap-2">
                <Radio size={16} className="text-[#0071E3]" />
                Two-Node LoRa Demonstration
              </span>
              <span className="text-[#64748B]">SPI + 433 MHz RF</span>
            </div>

            {/* Input & Transmit */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={demoMessage}
                onChange={(e) => setDemoMessage(e.target.value)}
                maxLength={24}
                className="flex-1 px-4 py-2.5 rounded-2xl border border-[#E2EBF5] bg-[#F4F8FC] font-mono text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0071E3]"
                placeholder="Type message to transmit"
              />
              <button
                onClick={handleRunDemo}
                disabled={isDemoTransmitting}
                className="px-6 py-2.5 rounded-2xl bg-[#0071E3] text-white hover:bg-[#0369A1] font-sans text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all interactive-hover disabled:opacity-50 shadow-xs"
              >
                <Send size={14} />
                <span>{isDemoTransmitting ? "Sending..." : "Transmit"}</span>
              </button>
            </div>

            {/* Visual Two Modules Communicating with Message on Receiver */}
            <div className="p-5 rounded-2xl bg-[#F4F8FC] border border-[#E2EBF5]">
              <div className="flex items-center justify-between relative">
                {/* Node 1 Module */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#E2EBF5] text-center w-32 shadow-xs">
                  <Radio size={20} className="text-[#0071E3] mx-auto mb-1" />
                  <span className="font-mono text-xs font-bold text-[#0F172A] block">
                    SX1278 (TX)
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">Transmitter</span>
                </div>

                {/* RF Wave Packet flying */}
                <div className="flex-1 mx-4 relative flex items-center justify-center">
                  <div className="w-full border-b border-dashed border-[#CBD5E1]" />
                  {isDemoTransmitting && (
                    <motion.div
                      initial={{ left: "0%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute -top-3.5 px-2.5 py-0.5 rounded-full bg-[#0071E3] text-white font-mono text-[9px] font-bold shadow-md shadow-[#0071E3]/40 flex items-center gap-1"
                    >
                      <Sparkles size={10} className="animate-spin" />
                      <span>RF Chirp</span>
                    </motion.div>
                  )}
                </div>

                {/* Node 2 Module with OLED Screen */}
                <div className="p-3.5 rounded-2xl bg-[#0F172A] text-white text-center w-36 shadow-xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#38BDF8] font-bold block mb-1">
                    SX1278 (RX)
                  </span>
                  <div className="p-1.5 rounded bg-[#1E293B] font-mono text-xs text-[#38BDF8] truncate">
                    {displayedOnRx}
                  </div>
                  <span className="text-[9px] font-mono text-[#94A3B8] block mt-1">OLED Display</span>
                </div>
              </div>
            </div>

            {/* 3 Recap Takeaways */}
            <div className="space-y-2 mt-4 pt-3 border-t border-[#E2EBF5]">
              {SLIDE_7_DATA.recapPoints.map((recap, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#0F172A]">
                  <CheckCircle2 size={16} className="text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{recap}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2EBF5] flex justify-between items-center text-xs font-mono text-[#64748B]">
            <span>Status: Two nodes linked over 433 MHz</span>
            <span className="text-[#0071E3] font-bold">Signal Active</span>
          </div>
        </div>

        {/* Right: Interactive 3-Question Quiz (6 cols) */}
        <div className="lg:col-span-6 p-6 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between min-h-[440px] w-full">
          {!quizFinished ? (
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2EBF5] text-xs font-mono text-[#64748B]">
                <span className="text-[#0071E3] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle size={15} /> Question {currentQIndex + 1} of 3
                </span>
                <span className="font-bold">Score: {quizScore}</span>
              </div>

              <h3 className="font-serif text-2xl lg:text-3xl text-[#0F172A] leading-tight mb-5">
                {currentQ.question}
              </h3>

              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const userChoice = userAnswers[currentQ.id];
                  const hasAnswered = userChoice !== undefined;
                  const isCorrect = idx === currentQ.correctIndex;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all interactive-hover flex items-center justify-between ${
                        hasAnswered
                          ? isCorrect
                            ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-medium"
                            : userChoice === idx
                            ? "bg-rose-50 border-rose-300 text-rose-950"
                            : "bg-[#F4F8FC] border-[#E2EBF5] text-[#94A3B8]"
                          : "bg-[#F4F8FC] border-[#E2EBF5] hover:border-[#0071E3] text-[#0F172A]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#64748B]">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span>{opt}</span>
                      </div>
                      {hasAnswered && isCorrect && <CheckCircle2 size={18} className="text-emerald-600" />}
                      {hasAnswered && userChoice === idx && !isCorrect && <XCircle size={18} className="text-rose-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation when answered */}
              <AnimatePresence>
                {userAnswers[currentQ.id] !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3.5 rounded-2xl bg-[#E0F2FE] border border-[#0071E3]/25 text-xs sm:text-sm text-[#0369A1] leading-relaxed"
                  >
                    <strong>Explanation: </strong>
                    {currentQ.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {userAnswers[currentQ.id] !== undefined && (
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={handleNextQuiz}
                    className="px-6 py-2.5 rounded-full bg-[#0071E3] text-white hover:bg-[#0369A1] font-sans text-xs sm:text-sm font-semibold transition-all interactive-hover shadow-xs"
                  >
                    {currentQIndex < 2 ? "Next Question →" : "View Results & Finish →"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Score Card */
            <div className="text-center py-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-bold">
                Knowledge Quiz Complete
              </span>
              <h3 className="font-serif text-6xl lg:text-7xl text-[#0F172A] mt-2">
                {quizScore} / 3
              </h3>
              <p className="text-sm sm:text-base text-[#64748B] font-sans mt-3 max-w-sm mx-auto leading-relaxed">
                {quizScore === 3
                  ? "Outstanding! You have mastered the fundamentals of LoRa range trade-offs, SPI connections, and bandwidth limitations."
                  : "Great effort! Review the SPI connections and CSS frequency sweep concepts."}
              </p>

              <div className="mt-8 flex justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="px-5 py-2.5 rounded-full border border-[#E2EBF5] bg-white text-xs sm:text-sm font-mono text-[#0F172A] hover:border-[#0071E3] interactive-hover"
                >
                  <RotateCcw size={14} className="inline mr-1.5" /> Retake Quiz
                </button>
                <button
                  onClick={onRestartPresentation}
                  className="px-6 py-2.5 rounded-full bg-[#0F172A] text-white hover:bg-[#0071E3] text-xs sm:text-sm font-mono font-semibold interactive-hover shadow-xs"
                >
                  Restart Presentation ↺
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Footer */}
      <div className="w-full flex items-center justify-between border-t border-[#E2EBF5] pt-4">
        <p className="font-mono text-xs sm:text-sm text-[#64748B]">
          Thank you for listening. LoRa Wireless Module Presentation.
        </p>
        <button
          onClick={onRestartPresentation}
          className="text-xs sm:text-sm font-mono text-[#0071E3] hover:underline interactive-hover font-semibold"
        >
          Restart (Slide 01)
        </button>
      </div>
    </div>
  );
};
