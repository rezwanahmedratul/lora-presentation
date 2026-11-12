"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_4_DATA } from "@/data/presentationData";
import { playSuccessSound, playErrorSound } from "@/utils/audio";
import { Cpu, CheckCircle2, ArrowRight, HelpCircle, RotateCcw } from "lucide-react";

interface Slide4Props {
  onNextSlide: () => void;
}

export const Slide4: React.FC<Slide4Props> = ({ onNextSlide }) => {
  const [identifiedSpiPins, setIdentifiedSpiPins] = useState<Record<string, boolean>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handlePinClick = (pin: (typeof SLIDE_4_DATA.spiPins)[0]) => {
    if (pin.isSPI) {
      playSuccessSound();
      setIdentifiedSpiPins((prev) => ({ ...prev, [pin.name]: true }));
      setFeedbackMsg(`✓ Correct! ${pin.name} is an active SPI bus line (${pin.role}).`);
    } else {
      playErrorSound();
      setFeedbackMsg(`✕ ${pin.name} is a Power line (${pin.role}), not an SPI data line.`);
    }
  };

  const handleReset = () => {
    setIdentifiedSpiPins({});
    setFeedbackMsg(null);
  };

  const spiCount = Object.keys(identifiedSpiPins).length;

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
          {SLIDE_4_DATA.title}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">Hardware &</em>
          Connection.
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 max-w-4xl leading-relaxed">
          {SLIDE_4_DATA.subtitle} — interfacing SX1278 with Arduino & ESP32 via Serial Peripheral Interface (SPI).
        </p>
      </motion.div>

      {/* 2. Visual Pinout Diagram + Interactive "Identify the SPI Pins" Task */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 my-auto py-3 items-start w-full">
        {/* Module SVG Pinout Illustration (7 cols) */}
        <div className="lg:col-span-7 p-6 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full">
          <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-mono text-[#0F172A]">
            <span className="font-semibold flex items-center gap-2">
              <Cpu size={16} className="text-[#0071E3]" />
              SX1278 Ra-02 Header Pinout
            </span>
            <span className="text-[#64748B]">Click pins to test your knowledge</span>
          </div>

          {/* SVG Hardware Diagram with Labeled Pins: VCC, GND, MOSI, MISO, SCK, NSS */}
          <div className="relative w-full aspect-[16/9] bg-[#F4F8FC] rounded-2xl border border-[#E2EBF5] p-5 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 560 300" className="w-full h-full max-h-[280px]" preserveAspectRatio="xMidYMid meet">
              {/* PCB */}
              <rect x="120" y="30" width="320" height="240" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="3" />
              <text x="280" y="62" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="13" fontWeight="bold">
                SX1278 / Ra-02 (SPI)
              </text>

              {/* Metal RF Shield */}
              <rect x="195" y="85" width="170" height="130" rx="8" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="280" cy="150" r="22" fill="#E2E8F0" />
              <text x="280" y="154" textAnchor="middle" fill="#0F172A" fontFamily="monospace" fontSize="11" fontWeight="bold">
                SEMTECH
              </text>

              {/* Antenna Terminal */}
              <g transform="translate(410, 50)">
                <circle cx="10" cy="10" r="12" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
                <path d="M 22 10 Q 35 0 45 10 T 65 10" fill="none" stroke="#38BDF8" strokeWidth="3" />
                <text x="10" y="36" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="9" fontWeight="bold">
                  ANT
                </text>
              </g>

              {/* Left Header Pins: VCC, GND, NSS */}
              {[0, 1, 2].map((idx) => {
                const pin = SLIDE_4_DATA.spiPins[idx];
                const y = 80 + idx * 60;
                const isIdentified = !!identifiedSpiPins[pin.name];

                return (
                  <g key={pin.name} onClick={() => handlePinClick(pin)} className="cursor-pointer group">
                    <rect x="120" y={y} width="35" height="26" rx="4" fill={isIdentified ? "#0071E3" : "#38BDF8"} />
                    <rect
                      x="20"
                      y={y - 1}
                      width="90"
                      height="28"
                      rx="6"
                      fill={isIdentified ? "#0071E3" : "#FFFFFF"}
                      stroke={isIdentified ? "#0369A1" : "#E2EBF5"}
                    />
                    <text
                      x="65"
                      y={y + 18}
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontSize="11"
                      fontWeight="bold"
                      fill={isIdentified ? "#FFFFFF" : "#0F172A"}
                    >
                      {pin.name}
                    </text>
                  </g>
                );
              })}

              {/* Right Header Pins: SCK, MOSI, MISO */}
              {[3, 4, 5].map((idx) => {
                const pin = SLIDE_4_DATA.spiPins[idx];
                const y = 80 + (idx - 3) * 60;
                const isIdentified = !!identifiedSpiPins[pin.name];

                return (
                  <g key={pin.name} onClick={() => handlePinClick(pin)} className="cursor-pointer group">
                    <rect x="405" y={y} width="35" height="26" rx="4" fill={isIdentified ? "#0071E3" : "#38BDF8"} />
                    <rect
                      x="450"
                      y={y - 1}
                      width="90"
                      height="28"
                      rx="6"
                      fill={isIdentified ? "#0071E3" : "#FFFFFF"}
                      stroke={isIdentified ? "#0369A1" : "#E2EBF5"}
                    />
                    <text
                      x="495"
                      y={y + 18}
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontSize="11"
                      fontWeight="bold"
                      fill={isIdentified ? "#FFFFFF" : "#0F172A"}
                    >
                      {pin.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Microcontroller Wiring Table */}
          <div className="mt-4 pt-3 border-t border-[#E2EBF5]">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead>
                <tr className="border-b border-[#E2EBF5] text-[#64748B]">
                  <th className="pb-1.5 font-medium">Pin</th>
                  <th className="pb-1.5 font-medium">Role</th>
                  <th className="pb-1.5 font-medium text-[#0071E3]">Arduino Uno</th>
                  <th className="pb-1.5 font-medium text-[#0071E3]">ESP32</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2EBF5]/60">
                {SLIDE_4_DATA.mcuConnections.map((row) => (
                  <tr key={row.pin} className="hover:bg-[#F4F8FC]">
                    <td className="py-1 font-bold text-[#0F172A]">{row.pin}</td>
                    <td className="py-1 text-[#64748B]">SPI Bus</td>
                    <td className="py-1 text-[#0071E3] font-semibold">{row.arduino}</td>
                    <td className="py-1 text-[#0071E3] font-semibold">{row.esp32}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Element: Identify the 4 SPI Pins (5 cols) */}
        <div className="lg:col-span-5 p-7 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full min-h-[420px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-[#E0F2FE] text-[#0071E3]">
                <HelpCircle size={16} />
              </span>
              <span className="font-mono text-xs font-bold text-[#0071E3] uppercase tracking-wider">
                Interactive Challenge
              </span>
            </div>

            <h3 className="font-serif text-2xl lg:text-3xl text-[#0F172A] leading-tight mb-2">
              Identify the SPI Pins on the Diagram
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] mb-4">
              Tap the pins on the left diagram or buttons below to find the 4 SPI bus lines (Score: <strong>{spiCount}/4</strong>):
            </p>

            {/* Quick buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {SLIDE_4_DATA.spiPins.map((pin) => {
                const isFound = !!identifiedSpiPins[pin.name];
                return (
                  <button
                    key={pin.name}
                    onClick={() => handlePinClick(pin)}
                    className={`p-3 rounded-2xl border text-xs sm:text-sm font-mono text-left transition-all interactive-hover flex items-center justify-between ${
                      isFound
                        ? "bg-[#E0F2FE] border-[#0071E3] text-[#0071E3] font-bold"
                        : "bg-[#F4F8FC] border-[#E2EBF5] text-[#0F172A] hover:border-[#0071E3]"
                    }`}
                  >
                    <span>{pin.name}</span>
                    {isFound && <CheckCircle2 size={16} className="text-[#0071E3]" />}
                  </button>
                );
              })}
            </div>

            {/* Real-Time Feedback */}
            <AnimatePresence>
              {feedbackMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-2xl bg-[#E0F2FE] border border-[#0071E3]/30 text-xs sm:text-sm text-[#0369A1] font-mono leading-relaxed"
                >
                  {feedbackMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {spiCount === 4 && (
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#E2EBF5]">
                <span className="text-xs sm:text-sm font-mono text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={16} /> All 4 SPI pins identified!
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs font-mono text-[#64748B] hover:text-[#0F172A] flex items-center gap-1"
                >
                  <RotateCcw size={13} /> Reset
                </button>
              </div>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-[#E2EBF5] flex justify-end">
            <button
              onClick={onNextSlide}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0071E3] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#0369A1] transition-all interactive-hover shadow-xs"
            >
              <span>Next: Device Communication</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
