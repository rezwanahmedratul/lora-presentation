"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_4_DATA } from "@/data/presentationData";
import { playSuccessSound, playErrorSound } from "@/utils/audio";
import { Radio, Layers, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

interface Slide4Props {
  onNextSlide: () => void;
}

export const Slide4: React.FC<Slide4Props> = ({ onNextSlide }) => {
  const [assignments, setAssignments] = useState<Record<string, "lora" | "lorawan">>({});
  const [activeChipId, setActiveChipId] = useState<string | null>(null);
  const [packetHop, setPacketHop] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPacketHop((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const handleAssign = (chipId: string, targetBucket: "lora" | "lorawan") => {
    const chip = SLIDE_4_DATA.gameChips.find((c) => c.id === chipId);
    if (!chip) return;

    if (chip.target === targetBucket) {
      playSuccessSound();
      setAssignments((prev) => ({ ...prev, [chipId]: targetBucket }));
      setActiveChipId(null);
    } else {
      playErrorSound();
    }
  };

  const handleResetGame = () => {
    setAssignments({});
    setActiveChipId(null);
  };

  const assignedCount = Object.keys(assignments).length;
  const isGameCompleted = assignedCount === SLIDE_4_DATA.gameChips.length;

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-y-auto">
      {/* 1. Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-semibold">
          {SLIDE_4_DATA.badge}
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#0F172A] leading-tight tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-2">
            {SLIDE_4_DATA.headlineItalic}
          </em>
          {SLIDE_4_DATA.headlineRest}
        </h1>
        <p className="text-sm text-[#64748B] font-sans mt-1.5 max-w-2xl leading-relaxed">
          {SLIDE_4_DATA.intro}
        </p>
      </motion.div>

      {/* 2. Animated 4-Step Architecture Pipeline */}
      <div className="my-2 keynote-card p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SLIDE_4_DATA.architectureSteps.map((step, idx) => {
            const isActive = packetHop === idx;
            return (
              <div
                key={step.label}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isActive
                    ? "bg-[#E0F2FE] border-[#0071E3] shadow-md shadow-[#0071E3]/15 scale-[1.02]"
                    : "bg-[#F8FAFC] border-[#E2EBF2]"
                }`}
              >
                <div className="font-sans font-bold text-xs sm:text-sm text-[#0F172A]">
                  {step.label}
                </div>
                <div className="font-mono text-[11px] text-[#64748B] mt-0.5">
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Moving packet bar */}
        <div className="mt-2.5 w-full bg-[#E2EBF2] h-1.5 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full w-1/4 bg-[#0071E3] rounded-full shadow-[0_0_8px_#0071E3]"
            animate={{ left: `${packetHop * 25}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{ position: "relative" }}
          />
        </div>
      </div>

      {/* 3. Spot the Layer Interactive Game */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-2 items-start">
        {/* Chips pool (4 cols) */}
        <div className="lg:col-span-4 keynote-card p-4 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0071E3] font-semibold">
                Spot The Layer
              </span>
              <span className="font-mono text-xs text-[#0F172A] font-bold">
                {assignedCount} / {SLIDE_4_DATA.gameChips.length}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mb-3">
              Select a concept, then tap the correct layer bucket:
            </p>

            <div className="flex flex-wrap gap-1.5">
              {SLIDE_4_DATA.gameChips.map((chip) => {
                if (assignments[chip.id]) return null;
                const isSelected = activeChipId === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setActiveChipId(chip.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-mono border transition-all interactive-hover ${
                      isSelected
                        ? "bg-[#0F172A] text-white border-[#0F172A] shadow-sm"
                        : "bg-white text-[#0F172A] border-[#E2EBF2] hover:border-[#0071E3]"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>

          {isGameCompleted && (
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-[#E2EBF2]">
              <span className="text-xs font-mono text-[#0071E3] font-semibold flex items-center gap-1">
                <CheckCircle2 size={13} /> Complete!
              </span>
              <button
                onClick={handleResetGame}
                className="flex items-center gap-1 text-xs font-mono text-[#64748B] hover:text-[#0F172A]"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>
          )}
        </div>

        {/* Buckets (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* LoRa (PHY) */}
          <div
            onClick={() => activeChipId && handleAssign(activeChipId, "lora")}
            className={`keynote-card p-4 border-2 transition-all min-h-[220px] flex flex-col justify-between ${
              activeChipId
                ? "border-[#0071E3] bg-[#E0F2FE]/30 cursor-pointer hover:bg-[#E0F2FE]/50"
                : "border-[#E2EBF2]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#0071E3] font-bold">
                  Physical Radio (PHY)
                </span>
                <Radio size={16} className="text-[#0071E3]" />
              </div>
              <h3 className="font-serif text-2xl text-[#0F172A]">LoRa</h3>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                The silicon chip, RF modulation, and frequency chirps.
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {SLIDE_4_DATA.gameChips
                  .filter((c) => assignments[c.id] === "lora")
                  .map((chip) => (
                    <span
                      key={chip.id}
                      className="px-2 py-0.5 rounded-lg bg-[#E0F2FE] text-[#0071E3] font-mono text-[11px] font-semibold border border-[#0071E3]/20"
                    >
                      ✓ {chip.label}
                    </span>
                  ))}
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#64748B]">
              {activeChipId ? "Tap to assign selected ➔" : "Scope: Chirps, SF, Frequency"}
            </span>
          </div>

          {/* LoRaWAN (Network) */}
          <div
            onClick={() => activeChipId && handleAssign(activeChipId, "lorawan")}
            className={`keynote-card p-4 border-2 transition-all min-h-[220px] flex flex-col justify-between ${
              activeChipId
                ? "border-[#0071E3] bg-[#E0F2FE]/30 cursor-pointer hover:bg-[#E0F2FE]/50"
                : "border-[#E2EBF2]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#0F172A] font-bold">
                  Network Protocol (MAC)
                </span>
                <Layers size={16} className="text-[#0F172A]" />
              </div>
              <h3 className="font-serif text-2xl text-[#0F172A]">LoRaWAN</h3>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                The open networking standard, gateways, and AES-128 encryption.
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {SLIDE_4_DATA.gameChips
                  .filter((c) => assignments[c.id] === "lorawan")
                  .map((chip) => (
                    <span
                      key={chip.id}
                      className="px-2 py-0.5 rounded-lg bg-[#EDF4F9] text-[#0F172A] font-mono text-[11px] font-semibold border border-[#CBD5E1]"
                    >
                      ✓ {chip.label}
                    </span>
                  ))}
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#64748B]">
              {activeChipId ? "Tap to assign selected ➔" : "Scope: Gateways, Encryption, Cloud"}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Footer */}
      <div className="flex items-center justify-between border-t border-[#E2EBF2] pt-3">
        <p className="font-mono text-xs text-[#64748B]">
          LoRa is the hardware wire; LoRaWAN is the network.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0071E3] hover:text-[#0369A1] transition-colors interactive-hover"
        >
          <span>Hardware Pinout</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
