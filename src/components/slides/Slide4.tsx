"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_4_DATA } from "@/data/presentationData";
import { playSuccessSound, playErrorSound } from "@/utils/audio";
import { Layers, Radio, Network, ArrowRight, CheckCircle2, RotateCcw, ShieldCheck } from "lucide-react";

interface Slide4Props {
  onNextSlide: () => void;
}

export const Slide4: React.FC<Slide4Props> = ({ onNextSlide }) => {
  // Mini-game state: assignments of chips to buckets ("lora" | "lorawan")
  const [assignments, setAssignments] = useState<Record<string, "lora" | "lorawan">>({});
  const [activeChipId, setActiveChipId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; correct: boolean; text: string } | null>(null);

  // Architecture packet pulse index (0: Node, 1: Gateway, 2: Server, 3: App)
  const [packetHop, setPacketHop] = useState<number>(0);

  // Step simulation interval for traveling orange packet
  React.useEffect(() => {
    const timer = setInterval(() => {
      setPacketHop((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const handleAssign = (chipId: string, targetBucket: "lora" | "lorawan") => {
    const chip = SLIDE_4_DATA.gameChips.find((c) => c.id === chipId);
    if (!chip) return;

    const isCorrect = chip.target === targetBucket;
    if (isCorrect) {
      playSuccessSound();
      setAssignments((prev) => ({ ...prev, [chipId]: targetBucket }));
      setFeedback({ id: chipId, correct: true, text: `Correct! ${chip.explanation}` });
      setActiveChipId(null);
    } else {
      playErrorSound();
      setFeedback({
        id: chipId,
        correct: false,
        text: `Incorrect: ${chip.label} belongs to ${chip.target === "lora" ? "LoRa (PHY)" : "LoRaWAN (MAC/Network)"}.`,
      });
    }
  };

  const handleResetGame = () => {
    setAssignments({});
    setActiveChipId(null);
    setFeedback(null);
  };

  const assignedCount = Object.keys(assignments).length;
  const isGameCompleted = assignedCount === SLIDE_4_DATA.gameChips.length;

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-y-auto">
      {/* 1. Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-semibold">
            {SLIDE_4_DATA.badge}
          </span>
          <span className="text-xs font-mono text-[#8A847C]">•</span>
          <span className="text-xs font-mono text-[#161412]">Physical Radio vs Protocol Cloud</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#161412] leading-[1.05] tracking-tight mt-1">
          <em className="italic text-[#FF5A1F] font-normal mr-2">
            {SLIDE_4_DATA.headlineItalic}
          </em>
          {SLIDE_4_DATA.headlineRest}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#8A847C] font-sans mt-2 max-w-3xl leading-relaxed">
          {SLIDE_4_DATA.intro}
        </p>
      </motion.div>

      {/* 2. Top Banner: Animated Packet Flow Architecture */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="my-3 keynote-card p-4 sm:p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#161412]">
            <Network size={15} className="text-[#FF5A1F]" />
            <span>End-to-End LoRaWAN Network Topology</span>
          </div>
          <span className="font-mono text-[11px] text-[#8A847C]">
            RF Chirp ➔ IP / Cloud Backhaul
          </span>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-2 items-center">
          {SLIDE_4_DATA.architectureSteps.map((step, idx) => {
            const isHopActive = packetHop === idx;

            return (
              <div key={step.id} className="relative flex flex-col items-center">
                <div
                  className={`w-full p-3 rounded-2xl border text-center transition-all ${
                    isHopActive
                      ? "bg-[#FFE9DD] border-[#FF5A1F] shadow-md shadow-[#FF5A1F]/20 scale-[1.02]"
                      : "bg-[#F9F7F4] border-[#E8E3DD]"
                  }`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#FF5A1F] font-semibold">
                    Step 0{idx + 1}
                  </div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-[#161412] mt-0.5">
                    {step.label}
                  </h4>
                  <span className="font-mono text-[10px] text-[#8A847C] block mb-1">
                    {step.type}
                  </span>
                  <p className="text-[11px] text-[#8A847C] leading-snug line-clamp-2">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow connector between steps (desktop) */}
                {idx < 3 && (
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#FF5A1F]">
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                    >
                      ➔
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Moving glowing packet indicator bar */}
        <div className="mt-3 w-full bg-[#E8E3DD]/60 h-1.5 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full w-1/4 bg-[#FF5A1F] rounded-full shadow-[0_0_10px_#FF5A1F]"
            animate={{ left: `${packetHop * 25}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{ position: "relative" }}
          />
        </div>
      </motion.div>

      {/* 3. Interactive Area: "Spot the Layer" Mini-Game */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-2 items-start">
        {/* Chips pool to classify (5 cols) */}
        <div className="lg:col-span-5 keynote-card p-4 sm:p-5 flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF5A1F] font-semibold">
                Interactive Challenge
              </span>
              <span className="font-mono text-xs font-bold text-[#161412]">
                Score: <strong className="text-[#FF5A1F]">{assignedCount}</strong> / {SLIDE_4_DATA.gameChips.length}
              </span>
            </div>

            <h3 className="font-serif text-xl text-[#161412] mb-1">
              Spot the Layer Game
            </h3>
            <p className="text-xs text-[#8A847C] mb-3">
              Select a technical concept below, then assign it to either the <strong>LoRa (PHY)</strong> or <strong>LoRaWAN (Network)</strong> bucket:
            </p>

            {/* Unassigned Chips */}
            <div className="flex flex-wrap gap-2">
              {SLIDE_4_DATA.gameChips.map((chip) => {
                const isAssigned = !!assignments[chip.id];
                const isSelected = activeChipId === chip.id;

                if (isAssigned) return null;

                return (
                  <motion.button
                    key={chip.id}
                    onClick={() => setActiveChipId(chip.id)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all interactive-hover border ${
                      isSelected
                        ? "bg-[#161412] text-white border-[#161412] shadow-md ring-2 ring-[#FF5A1F]"
                        : "bg-white text-[#161412] border-[#E8E3DD] hover:border-[#FF5A1F]/50 shadow-xs"
                    }`}
                  >
                    {chip.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback message */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-4 p-2.5 rounded-xl border text-xs font-sans ${
                    feedback.correct
                      ? "bg-[#FFE9DD]/70 border-[#FF5A1F]/40 text-[#C23B0A]"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  {feedback.text}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reset button when completed */}
          {isGameCompleted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex items-center justify-between pt-3 border-t border-[#E8E3DD]"
            >
              <span className="text-xs font-mono text-[#C23B0A] font-semibold flex items-center gap-1">
                <CheckCircle2 size={15} /> All items correctly assigned!
              </span>
              <button
                onClick={handleResetGame}
                className="flex items-center gap-1 text-xs font-mono text-[#8A847C] hover:text-[#161412] interactive-hover"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </motion.div>
          )}
        </div>

        {/* The Two Buckets (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Bucket 1: LoRa (Physical Layer) */}
          <div
            onClick={() => activeChipId && handleAssign(activeChipId, "lora")}
            className={`keynote-card p-4 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[260px] ${
              activeChipId
                ? "border-[#FF5A1F]/60 bg-[#FFE9DD]/30 cursor-pointer hover:bg-[#FFE9DD]/60"
                : "border-[#E8E3DD]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF5A1F] font-bold">
                  Physical Layer (PHY)
                </span>
                <Radio size={16} className="text-[#FF5A1F]" />
              </div>
              <h3 className="font-serif text-2xl text-[#161412]">
                LoRa
              </h3>
              <p className="text-[11px] text-[#8A847C] mt-0.5">
                The hardware radio modulation & silicon transceiver (Semtech).
              </p>

              {/* Assigned chips inside LoRa bucket */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {SLIDE_4_DATA.gameChips
                  .filter((c) => assignments[c.id] === "lora")
                  .map((chip) => (
                    <span
                      key={chip.id}
                      className="px-2.5 py-1 rounded-lg bg-[#FFE9DD] border border-[#FF5A1F]/30 text-[#C23B0A] font-mono text-[11px] font-semibold flex items-center gap-1"
                    >
                      <CheckCircle2 size={12} />
                      {chip.label}
                    </span>
                  ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E8E3DD]/70 text-[10px] font-mono text-[#8A847C]">
              {activeChipId ? (
                <span className="text-[#FF5A1F] font-semibold animate-pulse">
                  Click here to assign selected chip to LoRa ➔
                </span>
              ) : (
                "Scope: RF Chirps, Frequency, Antenna, SX1278"
              )}
            </div>
          </div>

          {/* Bucket 2: LoRaWAN (Network Layer) */}
          <div
            onClick={() => activeChipId && handleAssign(activeChipId, "lorawan")}
            className={`keynote-card p-4 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[260px] ${
              activeChipId
                ? "border-[#FF5A1F]/60 bg-[#FFE9DD]/30 cursor-pointer hover:bg-[#FFE9DD]/60"
                : "border-[#E8E3DD]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#161412] font-bold">
                  Network & MAC Protocol
                </span>
                <Layers size={16} className="text-[#161412]" />
              </div>
              <h3 className="font-serif text-2xl text-[#161412]">
                LoRaWAN
              </h3>
              <p className="text-[11px] text-[#8A847C] mt-0.5">
                The open global networking architecture, gateways, and encryption standard.
              </p>

              {/* Assigned chips inside LoRaWAN bucket */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {SLIDE_4_DATA.gameChips
                  .filter((c) => assignments[c.id] === "lorawan")
                  .map((chip) => (
                    <span
                      key={chip.id}
                      className="px-2.5 py-1 rounded-lg bg-[#F4EFEA] border border-[#E8E3DD] text-[#161412] font-mono text-[11px] font-semibold flex items-center gap-1"
                    >
                      <ShieldCheck size={12} className="text-[#FF5A1F]" />
                      {chip.label}
                    </span>
                  ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E8E3DD]/70 text-[10px] font-mono text-[#8A847C]">
              {activeChipId ? (
                <span className="text-[#FF5A1F] font-semibold animate-pulse">
                  Click here to assign selected chip to LoRaWAN ➔
                </span>
              ) : (
                "Scope: Star topology, AES-128 keys, Gateway bridges"
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Footer Continue */}
      <div className="flex items-center justify-between border-t border-[#E8E3DD]/80 pt-4">
        <p className="font-mono text-xs text-[#8A847C]">
          Summary: You can build point-to-point LoRa without LoRaWAN, but LoRaWAN requires LoRa radios.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-2 text-xs font-mono font-semibold text-[#FF5A1F] hover:text-[#C23B0A] transition-colors interactive-hover"
        >
          <span>Explore Embedded Hardware Pins</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
