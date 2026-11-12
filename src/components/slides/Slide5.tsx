"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SLIDE_5_DATA } from "@/data/presentationData";
import { Cpu, AlertTriangle, ArrowRight, Zap } from "lucide-react";

interface Slide5Props {
  onNextSlide: () => void;
}

export const Slide5: React.FC<Slide5Props> = ({ onNextSlide }) => {
  const [selectedPin, setSelectedPin] = useState(SLIDE_5_DATA.pins[0]);
  const [mcuTarget, setMcuTarget] = useState<"esp32" | "uno">("esp32");

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
          {SLIDE_5_DATA.kicker}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">
            {SLIDE_5_DATA.headlineItalic}
          </em>
          {SLIDE_5_DATA.headlineRest}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 max-w-4xl leading-relaxed">
          {SLIDE_5_DATA.subtitle}
        </p>
      </motion.div>

      {/* 2. Full-Width Hardware Graphic + Wiring Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 my-auto py-3 items-start w-full">
        {/* Module Illustration (6 cols) */}
        <div className="lg:col-span-6 p-7 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full">
          <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-mono">
            <span className="font-semibold text-[#0F172A] flex items-center gap-2">
              <Cpu size={18} className="text-[#0071E3]" />
              SX1278 / Ra-02 Header (SPI)
            </span>
            <span className="text-[#64748B]">Click pin to inspect</span>
          </div>

          <div className="relative w-full aspect-[4/3] bg-[#F4F8FC] rounded-2xl border border-[#E2EBF5] p-6 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 460 340" className="w-full h-full max-h-[300px]" preserveAspectRatio="xMidYMid meet">
              <rect x="70" y="30" width="320" height="280" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="3" />
              <text x="230" y="60" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="13" fontWeight="bold">
                Ai-Thinker Ra-02 (SX1278)
              </text>
              <text x="230" y="76" textAnchor="middle" fill="#94A3B8" fontFamily="monospace" fontSize="9">
                433MHz • SPI BUS
              </text>

              {/* Metal Can */}
              <rect x="145" y="95" width="170" height="150" rx="8" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="230" cy="170" r="22" fill="#E2E8F0" />
              <text x="230" y="174" textAnchor="middle" fill="#0F172A" fontFamily="monospace" fontSize="10" fontWeight="bold">
                SEMTECH
              </text>

              {/* Antenna Terminal */}
              <g onClick={() => setSelectedPin(SLIDE_5_DATA.pins[7])} className="cursor-pointer">
                <circle cx="360" cy="55" r="14" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
                <path d="M 374 55 Q 395 40 405 55 T 425 55" fill="none" stroke="#38BDF8" strokeWidth="3" />
                <text x="360" y="85" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="9" fontWeight="bold">
                  ANT
                </text>
              </g>

              {/* Left Header Pins */}
              {[0, 1, 2, 3].map((idx) => {
                const pin = SLIDE_5_DATA.pins[idx];
                const y = 95 + idx * 50;
                const isSelected = selectedPin.id === pin.id;
                return (
                  <g key={pin.id} onClick={() => setSelectedPin(pin)} className="cursor-pointer">
                    <rect x="70" y={y} width="35" height="24" rx="4" fill={isSelected ? "#0071E3" : "#38BDF8"} />
                    <rect x="8" y={y - 1} width="54" height="26" rx="6" fill={isSelected ? "#0071E3" : "#FFFFFF"} stroke={isSelected ? "#0369A1" : "#E2EBF5"} />
                    <text x="35" y={y + 16} textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill={isSelected ? "#FFFFFF" : "#0F172A"}>
                      {pin.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}

              {/* Right Header Pins */}
              {[4, 5, 6].map((idx) => {
                const pin = SLIDE_5_DATA.pins[idx];
                const y = 95 + (idx - 4) * 60;
                const isSelected = selectedPin.id === pin.id;
                return (
                  <g key={pin.id} onClick={() => setSelectedPin(pin)} className="cursor-pointer">
                    <rect x="355" y={y} width="35" height="24" rx="4" fill={isSelected ? "#0071E3" : "#38BDF8"} />
                    <rect x="398" y={y - 1} width="54" height="26" rx="6" fill={isSelected ? "#0071E3" : "#FFFFFF"} stroke={isSelected ? "#0369A1" : "#E2EBF5"} />
                    <text x="425" y={y + 16} textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill={isSelected ? "#FFFFFF" : "#0F172A"}>
                      {pin.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-[#F4F8FC] border border-[#E2EBF5] flex items-center justify-between">
            <span className="font-mono text-xs sm:text-sm font-bold text-[#0071E3] flex items-center gap-1.5">
              <Zap size={15} /> {selectedPin.name}
            </span>
            <span className="text-xs sm:text-sm text-[#64748B]">{selectedPin.function}</span>
          </div>
        </div>

        {/* Wiring Table & Warnings (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-5 w-full">
          <div className="p-7 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-2xl lg:text-3xl text-[#0F172A]">Microcontroller Wiring</h3>
              <div className="flex items-center gap-1 bg-[#F4F8FC] p-1 rounded-xl border border-[#E2EBF5] text-xs font-mono">
                <button
                  onClick={() => setMcuTarget("esp32")}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors interactive-hover ${
                    mcuTarget === "esp32" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
                  }`}
                >
                  ESP32 (3.3V)
                </button>
                <button
                  onClick={() => setMcuTarget("uno")}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors interactive-hover ${
                    mcuTarget === "uno" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
                  }`}
                >
                  Arduino Uno (5V)
                </button>
              </div>
            </div>

            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead>
                <tr className="border-b border-[#E2EBF5] text-[#64748B]">
                  <th className="pb-2 font-medium">Pin</th>
                  <th className="pb-2 font-medium">Function</th>
                  <th className="pb-2 font-medium">Target MCU Pin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2EBF5]/60">
                {SLIDE_5_DATA.pins.map((pin) => (
                  <tr
                    key={pin.id}
                    onClick={() => setSelectedPin(pin)}
                    className={`cursor-pointer transition-colors ${
                      selectedPin.id === pin.id ? "bg-[#E0F2FE]/50" : "hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <td className="py-2 font-bold text-[#0F172A]">{pin.name}</td>
                    <td className="py-2 text-[#64748B]">{pin.function}</td>
                    <td className="py-2 text-[#0071E3] font-semibold">
                      {mcuTarget === "esp32" ? pin.esp32 : pin.uno}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 w-full">
            {SLIDE_5_DATA.warnings.map((w, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white border border-[#E2EBF5] text-xs sm:text-sm text-[#0F172A] flex items-start gap-3 shadow-xs"
              >
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#0F172A] mb-0.5">{w.title}</strong>
                  <span className="text-[#64748B]">{w.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Footer */}
      <div className="w-full flex items-center justify-between border-t border-[#E2EBF5] pt-4">
        <p className="font-mono text-xs sm:text-sm text-[#64748B]">
          DIO0 fires a hardware interrupt on RxDone, allowing the MCU to sleep at ~10 µA.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#0071E3] hover:text-[#0369A1] transition-colors interactive-hover"
        >
          <span>Live Transceiver Demo</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
