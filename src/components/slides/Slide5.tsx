"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_5_DATA, PinDefinition } from "@/data/presentationData";
import { playSuccessSound, playErrorSound } from "@/utils/audio";
import { Cpu, AlertTriangle, Check, ArrowRight, Zap, RefreshCw, HelpCircle } from "lucide-react";

interface Slide5Props {
  onNextSlide: () => void;
}

export const Slide5: React.FC<Slide5Props> = ({ onNextSlide }) => {
  const [selectedPin, setSelectedPin] = useState<PinDefinition>(SLIDE_5_DATA.pins[0]);
  const [mcuTarget, setMcuTarget] = useState<"esp32" | "uno">("esp32");
  const [isChallengeMode, setIsChallengeMode] = useState<boolean>(false);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, string>>({});
  const [activeLabelId, setActiveLabelId] = useState<string | null>(null);

  const handlePinClickInChallenge = (pin: PinDefinition) => {
    if (!activeLabelId) {
      setSelectedPin(pin);
      return;
    }
    if (activeLabelId === pin.id) {
      playSuccessSound();
      setChallengeAnswers((prev) => ({ ...prev, [pin.id]: pin.name }));
      setActiveLabelId(null);
    } else {
      playErrorSound();
    }
  };

  const handleResetChallenge = () => {
    setChallengeAnswers({});
    setActiveLabelId(null);
  };

  const completedCount = Object.keys(challengeAnswers).length;

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
            {SLIDE_5_DATA.badge}
          </span>
          <span className="text-xs font-mono text-[#8A847C]">•</span>
          <span className="text-xs font-mono text-[#161412] font-semibold">
            {SLIDE_5_DATA.moduleName}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#161412] leading-[1.05] tracking-tight mt-1">
          <em className="italic text-[#FF5A1F] font-normal mr-2">
            {SLIDE_5_DATA.headlineItalic}
          </em>
          {SLIDE_5_DATA.headlineRest}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#8A847C] font-sans mt-2 max-w-3xl leading-relaxed">
          {SLIDE_5_DATA.subtext}
        </p>
      </motion.div>

      {/* 2. Main Hardware Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-start">
        {/* Module SVG Graphic + Pinout (6 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-6 keynote-card p-5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#161412]">
              <Cpu size={16} className="text-[#FF5A1F]" />
              <span>Ra-02 / SX1278 SMD Header Pinout</span>
            </div>

            {/* Mode Toggle: Study Mode vs Challenge Mode */}
            <button
              onClick={() => {
                setIsChallengeMode(!isChallengeMode);
                handleResetChallenge();
              }}
              className="px-2.5 py-1 rounded-full text-xs font-mono font-medium border border-[#E8E3DD] bg-white hover:border-[#FF5A1F] text-[#161412] transition-colors interactive-hover"
            >
              {isChallengeMode ? "Exit Quiz Mode" : "Test Your Pin Knowledge"}
            </button>
          </div>

          {/* SVG Hardware Board Illustration */}
          <div className="relative w-full aspect-[4/3] bg-[#F4EFEA] rounded-2xl border border-[#E8E3DD] p-4 flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 460 340"
              className="w-full h-full max-h-[300px]"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* PCB Substrate */}
              <rect x="70" y="30" width="320" height="280" rx="16" fill="#1C3829" stroke="#0D1E15" strokeWidth="3" />
              {/* Gold PCB Silk text */}
              <text x="230" y="60" textAnchor="middle" fill="#D4AF37" fontFamily="monospace" fontSize="13" fontWeight="bold">
                Ai-Thinker Ra-02 (SX1278)
              </text>
              <text x="230" y="78" textAnchor="middle" fill="#88A28E" fontFamily="monospace" fontSize="9">
                433MHz • SPI TRANSCEIVER
              </text>

              {/* Metal RF Shielding Can */}
              <rect x="140" y="95" width="180" height="150" rx="8" fill="#DCDCDC" stroke="#A8A8A8" strokeWidth="2" />
              <rect x="150" y="105" width="160" height="130" rx="4" fill="#C5C5C5" />
              <circle cx="230" cy="170" r="24" fill="#B0B0B0" />
              <text x="230" y="174" textAnchor="middle" fill="#333" fontFamily="monospace" fontSize="11" fontWeight="bold">
                SEMTECH
              </text>

              {/* Antenna Terminal (Top Right) */}
              <g
                onClick={() => handlePinClickInChallenge(SLIDE_5_DATA.pins[8])}
                className="cursor-pointer"
              >
                <circle cx="360" cy="55" r="14" fill="#D4AF37" stroke="#161412" strokeWidth="2" />
                <circle cx="360" cy="55" r="6" fill="#161412" />
                {/* Antenna coil representation */}
                <path d="M 374 55 Q 395 40 405 55 T 425 55" fill="none" stroke="#D4AF37" strokeWidth="3" />
                <text x="360" y="85" textAnchor="middle" fill="#FAF8F5" fontFamily="monospace" fontSize="9" fontWeight="bold">
                  ANT (RF)
                </text>
              </g>

              {/* Left Pin Header (VCC, GND, NSS, SCK) */}
              {[0, 1, 2, 3].map((idx) => {
                const pin = SLIDE_5_DATA.pins[idx];
                const y = 90 + idx * 50;
                const isSelected = selectedPin.id === pin.id;
                const isChallengeKnown = !!challengeAnswers[pin.id];

                return (
                  <g
                    key={pin.id}
                    onClick={() => handlePinClickInChallenge(pin)}
                    className="cursor-pointer group"
                  >
                    {/* Golden solder pad */}
                    <rect
                      x="70"
                      y={y}
                      width="35"
                      height="24"
                      rx="4"
                      fill={isSelected ? "#FF5A1F" : "#D4AF37"}
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? "2" : "1"}
                    />
                    <circle cx="87" cy={y + 12} r="5" fill="#1C3829" />

                    {/* Pin Label Box */}
                    <rect
                      x="8"
                      y={y - 1}
                      width="54"
                      height="26"
                      rx="6"
                      fill={isSelected ? "#FF5A1F" : "#FAF8F5"}
                      stroke={isSelected ? "#C23B0A" : "#E8E3DD"}
                    />
                    <text
                      x="35"
                      y={y + 16}
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontSize="9"
                      fontWeight="bold"
                      fill={isSelected ? "#FFFFFF" : "#161412"}
                    >
                      {isChallengeMode ? (isChallengeKnown ? pin.name : "?") : pin.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}

              {/* Right Pin Header (MOSI, MISO, RESET, DIO0) */}
              {[4, 5, 6, 7].map((idx) => {
                const pin = SLIDE_5_DATA.pins[idx];
                const y = 90 + (idx - 4) * 50;
                const isSelected = selectedPin.id === pin.id;
                const isChallengeKnown = !!challengeAnswers[pin.id];

                return (
                  <g
                    key={pin.id}
                    onClick={() => handlePinClickInChallenge(pin)}
                    className="cursor-pointer group"
                  >
                    {/* Golden solder pad */}
                    <rect
                      x="355"
                      y={y}
                      width="35"
                      height="24"
                      rx="4"
                      fill={isSelected ? "#FF5A1F" : "#D4AF37"}
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? "2" : "1"}
                    />
                    <circle cx="372" cy={y + 12} r="5" fill="#1C3829" />

                    {/* Pin Label Box */}
                    <rect
                      x="398"
                      y={y - 1}
                      width="54"
                      height="26"
                      rx="6"
                      fill={isSelected ? "#FF5A1F" : "#FAF8F5"}
                      stroke={isSelected ? "#C23B0A" : "#E8E3DD"}
                    />
                    <text
                      x="425"
                      y={y + 16}
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontSize="9"
                      fontWeight="bold"
                      fill={isSelected ? "#FFFFFF" : "#161412"}
                    >
                      {isChallengeMode ? (isChallengeKnown ? pin.name : "?") : pin.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Challenge Mode Label Pool */}
          {isChallengeMode && (
            <div className="mt-3 p-3 bg-white rounded-xl border border-[#E8E3DD]">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#FF5A1F] font-bold">
                  Select a label, then click its pin on the module:
                </span>
                <span>{completedCount}/8 identified</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SLIDE_5_DATA.pins.slice(0, 8).map((pin) => {
                  const isDone = !!challengeAnswers[pin.id];
                  const isSelected = activeLabelId === pin.id;
                  if (isDone) return null;

                  return (
                    <button
                      key={pin.id}
                      onClick={() => setActiveLabelId(pin.id)}
                      className={`px-2 py-1 rounded text-xs font-mono border interactive-hover ${
                        isSelected
                          ? "bg-[#161412] text-white border-[#161412]"
                          : "bg-[#F4EFEA] text-[#161412] border-[#E8E3DD] hover:border-[#FF5A1F]"
                      }`}
                    >
                      {pin.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selected Pin Tooltip Info Card */}
          <div className="mt-3 p-3.5 rounded-xl bg-white border border-[#E8E3DD] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#FF5A1F] flex items-center gap-1.5">
                <Zap size={14} />
                {selectedPin.name}
              </span>
              <span className="font-mono text-[11px] bg-[#FFE9DD] text-[#C23B0A] px-2 py-0.5 rounded font-semibold">
                {selectedPin.voltage}
              </span>
            </div>
            <p className="text-xs text-[#161412] mt-1.5 leading-relaxed font-sans">
              {selectedPin.description}
            </p>
          </div>
        </motion.div>

        {/* Right: Microcontroller Wiring Table + Critical Hardware Warnings (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Microcontroller Wiring Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="keynote-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#FF5A1F] font-semibold">
                  SPI Bus Pin Mapping
                </span>
                <h3 className="font-serif text-xl text-[#161412]">
                  Microcontroller Interface Table
                </h3>
              </div>

              {/* Board Selector Tabs: ESP32 vs Arduino Uno */}
              <div className="flex items-center gap-1 bg-[#F4EFEA] p-1 rounded-xl border border-[#E8E3DD] text-xs font-mono">
                <button
                  onClick={() => setMcuTarget("esp32")}
                  className={`px-3 py-1 rounded-lg transition-colors interactive-hover ${
                    mcuTarget === "esp32"
                      ? "bg-white text-[#FF5A1F] font-bold shadow-xs"
                      : "text-[#8A847C]"
                  }`}
                >
                  ESP32 (3.3V Native)
                </button>
                <button
                  onClick={() => setMcuTarget("uno")}
                  className={`px-3 py-1 rounded-lg transition-colors interactive-hover ${
                    mcuTarget === "uno"
                      ? "bg-white text-[#FF5A1F] font-bold shadow-xs"
                      : "text-[#8A847C]"
                  }`}
                >
                  Arduino Uno (5V)
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#E8E3DD] text-[#8A847C]">
                    <th className="pb-2 font-medium">Module Pin</th>
                    <th className="pb-2 font-medium">Function</th>
                    <th className="pb-2 font-medium">
                      Target MCU Pin ({mcuTarget === "esp32" ? "ESP32" : "Uno"})
                    </th>
                    <th className="pb-2 font-medium">Logic Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E3DD]/60">
                  {SLIDE_5_DATA.pins.slice(0, 8).map((pin) => (
                    <tr
                      key={pin.id}
                      onClick={() => setSelectedPin(pin)}
                      className={`cursor-pointer transition-colors ${
                        selectedPin.id === pin.id ? "bg-[#FFE9DD]/50" : "hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <td className="py-1.5 font-bold text-[#161412]">{pin.name}</td>
                      <td className="py-1.5 text-[#8A847C]">{pin.type}</td>
                      <td className="py-1.5 text-[#FF5A1F] font-semibold">
                        {mcuTarget === "esp32" ? pin.mcuPinEsp32 : pin.mcuPinUno}
                      </td>
                      <td className="py-1.5 text-[#161412]">{pin.voltage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Critical Hardware Warnings (Orange Alert Boxes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SLIDE_5_DATA.warnings.map((warn, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FFE9DD] to-white border-2 border-[#FF5A1F]/40 shadow-xs"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#C23B0A] mb-1">
                  <AlertTriangle size={15} />
                  <span>{warn.title}</span>
                </div>
                <p className="text-[11px] text-[#161412] leading-relaxed font-sans">
                  {warn.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Ecosystem note */}
          <div className="p-3 rounded-xl bg-white border border-[#E8E3DD] text-[11px] font-mono text-[#8A847C]">
            💡 <strong>Ecosystem Note:</strong> Some modules (e.g. RYLR896) embed an STM32 MCU so you can transmit via simple UART strings (<code>AT+SEND=...</code>) without configuring raw SPI registers.
          </div>
        </div>
      </div>

      {/* 3. Footer Continue */}
      <div className="flex items-center justify-between border-t border-[#E8E3DD]/80 pt-4">
        <p className="font-mono text-xs text-[#8A847C]">
          DIO0 is the secret to low power: MCU sleeps until the radio fires a hardware interrupt on packet reception.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-2 text-xs font-mono font-semibold text-[#FF5A1F] hover:text-[#C23B0A] transition-colors interactive-hover"
        >
          <span>See Live Code Walkthrough</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
