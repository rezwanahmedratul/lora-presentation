"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SLIDE_4_DATA } from "@/data/presentationData";
import { playSuccessSound, playErrorSound } from "@/utils/audio";
import { Radio, Layers, ArrowRight, RotateCcw } from "lucide-react";

interface Slide4Props {
  onNextSlide: () => void;
}

export const Slide4: React.FC<Slide4Props> = ({ onNextSlide }) => {
  const [activeChipId, setActiveChipId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, "lora" | "lorawan">>({});
  const [packetHop, setPacketHop] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPacketHop((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const handleAssign = (chipId: string, bucket: "lora" | "lorawan") => {
    const chip = SLIDE_4_DATA.classificationItems.find((c) => c.id === chipId);
    if (!chip) return;

    if (chip.bucket === bucket) {
      playSuccessSound();
      setAssignments((prev) => ({ ...prev, [chipId]: bucket }));
      setActiveChipId(null);
    } else {
      playErrorSound();
    }
  };

  const handleReset = () => {
    setAssignments({});
    setActiveChipId(null);
  };

  const score = Object.keys(assignments).length;

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
          {SLIDE_4_DATA.kicker}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">
            {SLIDE_4_DATA.headlineItalic}
          </em>
          {SLIDE_4_DATA.headlineRest}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 max-w-4xl leading-relaxed">
          {SLIDE_4_DATA.subtitle}
        </p>
      </motion.div>

      {/* 2. Full-Width Sleek Pipeline Visual */}
      <div className="my-2 p-6 lg:p-7 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {SLIDE_4_DATA.pipeline.map((item, idx) => {
            const isActive = packetHop === idx;
            return (
              <div
                key={item.step}
                className={`p-5 rounded-2xl border transition-all text-center ${
                  isActive
                    ? "bg-[#E0F2FE] border-[#0071E3] shadow-md shadow-[#0071E3]/15 scale-[1.02]"
                    : "bg-[#F4F8FC] border-[#E2EBF5]"
                }`}
              >
                <span className="font-mono text-xs uppercase font-bold text-[#0071E3] block">
                  {item.step}
                </span>
                <h4 className="font-serif text-xl lg:text-2xl text-[#0F172A] mt-1">{item.name}</h4>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Moving packet bar */}
        <div className="mt-4 w-full bg-[#E2EBF5] h-2 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full w-1/4 bg-[#0071E3] rounded-full shadow-[0_0_12px_#0071E3]"
            animate={{ left: `${packetHop * 25}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{ position: "relative" }}
          />
        </div>
      </div>

      {/* 3. Full-Width Spot the Layer Interactive Buckets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-2 items-start w-full">
        {/* Pool (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between min-h-[220px] w-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0071E3] font-semibold">
                Spot The Layer
              </span>
              <span className="font-mono text-xs font-bold text-[#0F172A]">
                {score} / {SLIDE_4_DATA.classificationItems.length}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] mb-4">
              Tap a concept, then select its layer:
            </p>

            <div className="flex flex-wrap gap-2">
              {SLIDE_4_DATA.classificationItems.map((chip) => {
                if (assignments[chip.id]) return null;
                const isSelected = activeChipId === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setActiveChipId(chip.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono border transition-all interactive-hover ${
                      isSelected
                        ? "bg-[#0F172A] text-white border-[#0F172A]"
                        : "bg-[#F4F8FC] text-[#0F172A] border-[#E2EBF5] hover:border-[#0071E3]"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>

          {score === SLIDE_4_DATA.classificationItems.length && (
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#E2EBF5]">
              <span className="text-xs sm:text-sm font-mono text-[#0071E3] font-semibold">
                All Assigned!
              </span>
              <button
                onClick={handleReset}
                className="text-xs sm:text-sm font-mono text-[#64748B] hover:text-[#0F172A] flex items-center gap-1.5"
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          )}
        </div>

        {/* 2 Buckets (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {/* LoRa (PHY) */}
          <div
            onClick={() => activeChipId && handleAssign(activeChipId, "lora")}
            className={`p-6 rounded-3xl border-2 transition-all min-h-[220px] flex flex-col justify-between ${
              activeChipId
                ? "border-[#0071E3] bg-[#E0F2FE]/40 cursor-pointer"
                : "border-[#E2EBF5] bg-white"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#0071E3] font-bold">
                  Physical Radio (PHY)
                </span>
                <Radio size={18} className="text-[#0071E3]" />
              </div>
              <h3 className="font-serif text-3xl text-[#0F172A]">LoRa</h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                The silicon chip, frequency chirps, and RF modulation.
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {SLIDE_4_DATA.classificationItems
                  .filter((c) => assignments[c.id] === "lora")
                  .map((c) => (
                    <span
                      key={c.id}
                      className="px-3 py-1 rounded-xl bg-[#E0F2FE] text-[#0071E3] font-mono text-xs font-semibold"
                    >
                      ✓ {c.label}
                    </span>
                  ))}
              </div>
            </div>
            <span className="text-xs font-mono text-[#64748B] mt-4">
              {activeChipId ? "Tap to assign ➔" : "Scope: Chirps, SF, Frequency, Silicon"}
            </span>
          </div>

          {/* LoRaWAN (Network) */}
          <div
            onClick={() => activeChipId && handleAssign(activeChipId, "lorawan")}
            className={`p-6 rounded-3xl border-2 transition-all min-h-[220px] flex flex-col justify-between ${
              activeChipId
                ? "border-[#0071E3] bg-[#E0F2FE]/40 cursor-pointer"
                : "border-[#E2EBF5] bg-white"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#0F172A] font-bold">
                  Network Layer (MAC)
                </span>
                <Layers size={18} className="text-[#0F172A]" />
              </div>
              <h3 className="font-serif text-3xl text-[#0F172A]">LoRaWAN</h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Cloud network protocol, gateways, routing, and AES-128 encryption.
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {SLIDE_4_DATA.classificationItems
                  .filter((c) => assignments[c.id] === "lorawan")
                  .map((c) => (
                    <span
                      key={c.id}
                      className="px-3 py-1 rounded-xl bg-[#EDF4F9] text-[#0F172A] font-mono text-xs font-semibold"
                    >
                      ✓ {c.label}
                    </span>
                  ))}
              </div>
            </div>
            <span className="text-xs font-mono text-[#64748B] mt-4">
              {activeChipId ? "Tap to assign ➔" : "Scope: Gateways, Encryption, Cloud"}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Footer */}
      <div className="w-full flex items-center justify-between border-t border-[#E2EBF5] pt-4">
        <p className="font-mono text-xs sm:text-sm text-[#64748B]">
          You can build point-to-point LoRa without LoRaWAN; but LoRaWAN requires LoRa radios.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#0071E3] hover:text-[#0369A1] transition-colors interactive-hover"
        >
          <span>The Silicon & Hardware</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
