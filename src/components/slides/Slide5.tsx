"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SLIDE_5_DATA, PinDefinition } from "@/data/presentationData";
import { Cpu, AlertTriangle, ArrowRight, Zap } from "lucide-react";

interface Slide5Props {
  onNextSlide: () => void;
}

export const Slide5: React.FC<Slide5Props> = ({ onNextSlide }) => {
  const [selectedPin, setSelectedPin] = useState<PinDefinition>(SLIDE_5_DATA.pins[0]);
  const [mcuTarget, setMcuTarget] = useState<"esp32" | "uno">("esp32");

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
          {SLIDE_5_DATA.badge}
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#0F172A] leading-tight tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-2">
            {SLIDE_5_DATA.headlineItalic}
          </em>
          {SLIDE_5_DATA.headlineRest}
        </h1>
        <p className="text-sm text-[#64748B] font-sans mt-1.5 max-w-2xl leading-relaxed">
          {SLIDE_5_DATA.subtext}
        </p>
      </motion.div>

      {/* 2. Hardware Layout: Module Graphic + Wiring Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-start">
        {/* Module SVG Graphic (6 cols) */}
        <div className="lg:col-span-6 keynote-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-semibold text-[#0F172A] flex items-center gap-1.5">
              <Cpu size={15} className="text-[#0071E3]" />
              SX1278 / Ra-02 Header (SPI)
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">Click a pin to inspect</span>
          </div>

          <div className="relative w-full aspect-[4/3] bg-[#EDF4F9] rounded-2xl border border-[#E2EBF2] p-4 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 460 340" className="w-full h-full max-h-[280px]" preserveAspectRatio="xMidYMid meet">
              {/* PCB */}
              <rect x="70" y="30" width="320" height="280" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="3" />
              <text x="230" y="60" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="13" fontWeight="bold">
                Ai-Thinker Ra-02 (SX1278)
              </text>
              <text x="230" y="76" textAnchor="middle" fill="#94A3B8" fontFamily="monospace" fontSize="9">
                433MHz • SPI BUS
              </text>

              {/* Shielding Can */}
              <rect x="145" y="95" width="170" height="150" rx="8" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="230" cy="170" r="22" fill="#E2E8F0" />
              <text x="230" y="174" textAnchor="middle" fill="#0F172A" fontFamily="monospace" fontSize="10" fontWeight="bold">
                SEMTECH
              </text>

              {/* Antenna Terminal (Top Right) */}
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
                    <rect
                      x="70"
                      y={y}
                      width="35"
                      height="24"
                      rx="4"
                      fill={isSelected ? "#0071E3" : "#38BDF8"}
                    />
                    <rect
                      x="8"
                      y={y - 1}
                      width="54"
                      height="26"
                      rx="6"
                      fill={isSelected ? "#0071E3" : "#FFFFFF"}
                      stroke={isSelected ? "#0369A1" : "#E2EBF2"}
                    />
                    <text
                      x="35"
                      y={y + 16}
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontSize="9"
                      fontWeight="bold"
                      fill={isSelected ? "#FFFFFF" : "#0F172A"}
                    >
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
                    <rect
                      x="355"
                      y={y}
                      width="35"
                      height="24"
                      rx="4"
                      fill={isSelected ? "#0071E3" : "#38BDF8"}
                    />
                    <rect
                      x="398"
                      y={y - 1}
                      width="54"
                      height="26"
                      rx="6"
                      fill={isSelected ? "#0071E3" : "#FFFFFF"}
                      stroke={isSelected ? "#0369A1" : "#E2EBF2"}
                    />
                    <text
                      x="425"
                      y={y + 16}
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontSize="9"
                      fontWeight="bold"
                      fill={isSelected ? "#FFFFFF" : "#0F172A"}
                    >
                      {pin.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Pin Tooltip */}
          <div className="mt-3 p-3 rounded-xl bg-white border border-[#E2EBF2] flex items-center justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-[#0071E3] flex items-center gap-1">
                <Zap size={13} /> {selectedPin.name}
              </span>
              <p className="text-xs text-[#64748B] mt-0.5">{selectedPin.role}</p>
            </div>
            <span className="font-mono text-xs bg-[#E0F2FE] text-[#0071E3] px-2 py-0.5 rounded font-semibold">
              {selectedPin.voltage}
            </span>
          </div>
        </div>

        {/* Wiring Table & Warnings (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="keynote-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-xl text-[#0F172A]">Microcontroller Wiring</h3>
              <div className="flex items-center gap-1 bg-[#EDF4F9] p-1 rounded-xl border border-[#E2EBF2] text-xs font-mono">
                <button
                  onClick={() => setMcuTarget("esp32")}
                  className={`px-3 py-1 rounded-lg transition-colors interactive-hover ${
                    mcuTarget === "esp32" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
                  }`}
                >
                  ESP32 (3.3V)
                </button>
                <button
                  onClick={() => setMcuTarget("uno")}
                  className={`px-3 py-1 rounded-lg transition-colors interactive-hover ${
                    mcuTarget === "uno" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
                  }`}
                >
                  Arduino Uno (5V)
                </button>
              </div>
            </div>

            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#E2EBF2] text-[#64748B]">
                  <th className="pb-1.5 font-medium">Module Pin</th>
                  <th className="pb-1.5 font-medium">Function</th>
                  <th className="pb-1.5 font-medium">Target MCU Pin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2EBF2]/60">
                {SLIDE_5_DATA.pins.map((pin) => (
                  <tr
                    key={pin.id}
                    onClick={() => setSelectedPin(pin)}
                    className={`cursor-pointer transition-colors ${
                      selectedPin.id === pin.id ? "bg-[#E0F2FE]/50" : "hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <td className="py-1 font-bold text-[#0F172A]">{pin.name}</td>
                    <td className="py-1 text-[#64748B]">{pin.role}</td>
                    <td className="py-1 text-[#0071E3] font-semibold">
                      {mcuTarget === "esp32" ? pin.mcuPinEsp32 : pin.mcuPinUno}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Minimal Warnings */}
          <div className="space-y-2">
            {SLIDE_5_DATA.warnings.map((warn, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white border border-[#E2EBF2] text-xs text-[#0F172A] flex items-start gap-2 shadow-xs"
              >
                <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                <span>{warn}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Footer */}
      <div className="flex items-center justify-between border-t border-[#E2EBF2] pt-3">
        <p className="font-mono text-xs text-[#64748B]">
          DIO0 fires a hardware interrupt when a packet arrives, allowing deep sleep.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0071E3] hover:text-[#0369A1] transition-colors interactive-hover"
        >
          <span>Firmware & Live Demo</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
