"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_6_DATA } from "@/data/presentationData";
import { playChirpSound, playSuccessSound } from "@/utils/audio";
import { Send, Terminal, Radio, ArrowRight, CheckCircle, HelpCircle, Wifi } from "lucide-react";

interface Slide6Props {
  onNextSlide: () => void;
}

export const Slide6: React.FC<Slide6Props> = ({ onNextSlide }) => {
  const [activeTab, setActiveTab] = useState<"sender" | "receiver">("sender");
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  // RF Simulation state
  const [payloadText, setPayloadText] = useState<string>("SOIL:42.5%|T:24C");
  const [distanceKm, setDistanceKm] = useState<number>(4.2);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [receivedMessage, setReceivedMessage] = useState<string>("SOIL:42.5%|T:24C");
  const [packetRssi, setPacketRssi] = useState<number>(-96);
  const [packetSnr, setPacketSnr] = useState<number>(8.5);
  const [txCounter, setTxCounter] = useState<number>(1);

  const activeCodeData = SLIDE_6_DATA.codeTabs[activeTab];

  const handleTransmit = () => {
    if (isTransmitting) return;
    setIsTransmitting(true);
    playChirpSound(320, 500, 2200);

    // Calculate simulated RSSI based on log-distance path loss
    // RSSI = -40 - (10 * 3.0 * log10(d_km)) - random jitter
    const calculatedRssi = Math.round(-45 - 28 * Math.log10(Math.max(0.2, distanceKm)) - Math.random() * 4);
    const calculatedSnr = Number((12 - 3.2 * distanceKm + Math.random() * 2).toFixed(1));

    setTimeout(() => {
      setReceivedMessage(payloadText);
      setPacketRssi(calculatedRssi);
      setPacketSnr(calculatedSnr);
      setTxCounter((prev) => prev + 1);
      setIsTransmitting(false);
      playSuccessSound();
    }, 1200);
  };

  const currentAnnotation = activeCodeData.annotations.find(
    (a) => a.line === selectedLine
  );

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
            {SLIDE_6_DATA.badge}
          </span>
          <span className="text-xs font-mono text-[#8A847C]">•</span>
          <span className="text-xs font-mono text-[#161412] font-semibold">
            Arduino-LoRa Driver API
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#161412] leading-[1.05] tracking-tight mt-1">
          <em className="italic text-[#FF5A1F] font-normal mr-2">
            {SLIDE_6_DATA.headlineItalic}
          </em>
          {SLIDE_6_DATA.headlineRest}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#8A847C] font-sans mt-2 max-w-3xl leading-relaxed">
          Clean C++ driver calls to serialize sensor bytes into the SX1278 FIFO register, initiate chirp modulation, and parse telemetry on the receiver.
        </p>
      </motion.div>

      {/* 2. Main Split Layout: Code Panel vs 2-Node Transceiver Demo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-start">
        {/* Left Side: Code Panel with Line Annotations (6 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-6 keynote-card p-4 sm:p-5 flex flex-col justify-between min-h-[440px]"
        >
          <div>
            {/* Tabs Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DD]">
              <div className="flex items-center gap-2">
                <Terminal size={15} className="text-[#FF5A1F]" />
                <span className="font-mono text-xs font-bold text-[#161412]">
                  Firmware Sketch
                </span>
              </div>

              <div className="flex items-center gap-1 bg-[#F4EFEA] p-1 rounded-xl border border-[#E8E3DD] text-xs font-mono">
                <button
                  onClick={() => {
                    setActiveTab("sender");
                    setSelectedLine(null);
                  }}
                  className={`px-3 py-1 rounded-lg transition-colors interactive-hover ${
                    activeTab === "sender"
                      ? "bg-white text-[#FF5A1F] font-bold shadow-xs"
                      : "text-[#8A847C]"
                  }`}
                >
                  Transmitter (Node A)
                </button>
                <button
                  onClick={() => {
                    setActiveTab("receiver");
                    setSelectedLine(null);
                  }}
                  className={`px-3 py-1 rounded-lg transition-colors interactive-hover ${
                    activeTab === "receiver"
                      ? "bg-white text-[#FF5A1F] font-bold shadow-xs"
                      : "text-[#8A847C]"
                  }`}
                >
                  Receiver (Node B)
                </button>
              </div>
            </div>

            {/* Code Body with click-to-explain */}
            <div className="mt-3 bg-[#1C1A18] text-[#FAF8F5] p-3 sm:p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-[300px] leading-relaxed">
              <div className="text-[10px] text-[#8A847C] mb-2">
                // Click highlighted line numbers to inspect register behavior:
              </div>
              {activeCodeData.code.split("\n").map((line, idx) => {
                const lineNum = idx + 1;
                const hasAnnotation = activeCodeData.annotations.some(
                  (a) => a.line === lineNum
                );
                const isSelected = selectedLine === lineNum;

                return (
                  <div
                    key={idx}
                    onClick={() => hasAnnotation && setSelectedLine(lineNum)}
                    className={`flex items-start px-2 py-0.5 rounded transition-colors ${
                      hasAnnotation ? "cursor-pointer hover:bg-white/10" : ""
                    } ${isSelected ? "bg-[#FF5A1F]/30 ring-1 ring-[#FF5A1F]" : ""}`}
                  >
                    <span
                      className={`w-6 shrink-0 select-none text-right mr-3 text-[10px] ${
                        hasAnnotation
                          ? "text-[#FF5A1F] font-bold underline"
                          : "text-[#8A847C]/40"
                      }`}
                    >
                      {lineNum}
                    </span>
                    <span className="whitespace-pre">{line}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Line Annotation Drawer */}
          <div className="mt-3 p-3 rounded-xl bg-[#F4EFEA] border border-[#E8E3DD] text-xs">
            {currentAnnotation ? (
              <div className="flex items-start gap-2">
                <HelpCircle size={15} className="text-[#FF5A1F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono font-bold text-[#FF5A1F]">
                    Line {currentAnnotation.line} breakdown:
                  </span>
                  <p className="text-[#161412] mt-0.5 font-sans leading-relaxed">
                    {currentAnnotation.text}
                  </p>
                </div>
              </div>
            ) : (
              <span className="font-mono text-[11px] text-[#8A847C]">
                Tip: Click underlined line numbers (e.g. 12, 17, 26, 30) to see what happens on the radio hardware.
              </span>
            )}
          </div>
        </motion.div>

        {/* Right Side: Interactive 2-Node RF Simulator (6 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="lg:col-span-6 keynote-card p-5 flex flex-col justify-between min-h-[440px]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF5A1F] font-semibold">
                Live Virtual Transceiver
              </span>
              <span className="font-mono text-xs text-[#8A847C]">
                Tx Packets: #{txCounter}
              </span>
            </div>

            {/* Config controls: Message payload + Distance slider */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-[#161412] mb-1">
                  Sensor Payload to Transmit:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={payloadText}
                    onChange={(e) => setPayloadText(e.target.value)}
                    maxLength={32}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-[#E8E3DD] bg-white font-mono text-xs text-[#161412] focus:outline-none focus:border-[#FF5A1F]"
                    placeholder="Payload string"
                  />
                  <button
                    onClick={handleTransmit}
                    disabled={isTransmitting}
                    className="px-4 py-1.5 rounded-xl bg-[#FF5A1F] text-white hover:bg-[#C23B0A] font-sans text-xs font-semibold flex items-center gap-1.5 transition-colors interactive-hover disabled:opacity-50"
                  >
                    <Send size={13} />
                    <span>{isTransmitting ? "TX Chirping..." : "Transmit"}</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-1">
                  <span className="text-[#8A847C]">Simulated Distance:</span>
                  <span className="font-bold text-[#FF5A1F]">{distanceKm.toFixed(1)} km</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="15.0"
                  step="0.5"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full accent-[#FF5A1F] cursor-pointer"
                />
              </div>
            </div>

            {/* Two Node Graphical Representation with Animated Travelling Packet */}
            <div className="relative p-4 rounded-2xl bg-[#F4EFEA] border border-[#E8E3DD] overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                {/* Node A (Transmitter) */}
                <div className="flex flex-col items-center">
                  <div className="relative p-3 rounded-2xl bg-white border border-[#E8E3DD] shadow-xs text-center w-24">
                    <Radio size={20} className="text-[#FF5A1F] mx-auto mb-1" />
                    <span className="font-mono text-[10px] font-bold text-[#161412] block">
                      Node A (TX)
                    </span>
                    <span className="text-[9px] font-mono text-[#8A847C]">ESP32+Ra02</span>
                  </div>
                  {/* Wave pulse animation when transmitting */}
                  {isTransmitting && (
                    <motion.div
                      animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="absolute top-4 left-6 w-12 h-12 rounded-full border-2 border-[#FF5A1F] pointer-events-none"
                    />
                  )}
                </div>

                {/* Animated Flying Packet in Mid-air */}
                <div className="flex-1 mx-3 relative flex items-center justify-center">
                  <div className="w-full h-0.5 bg-dashed border-b border-dashed border-[#8A847C]/40" />

                  {isTransmitting && (
                    <motion.div
                      initial={{ left: "0%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 1.1, ease: "easeInOut" }}
                      className="absolute -top-3 px-2 py-0.5 rounded-full bg-[#FF5A1F] text-white font-mono text-[9px] font-bold shadow-md shadow-[#FF5A1F]/50 flex items-center gap-1"
                    >
                      <Wifi size={10} className="animate-spin" />
                      <span>CSS RF</span>
                    </motion.div>
                  )}
                </div>

                {/* Node B (Receiver / Base Station) */}
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-2xl bg-[#161412] border border-[#161412] shadow-xs text-center w-28 text-white">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#FF5A1F] font-bold block mb-0.5">
                      Node B (RX)
                    </span>
                    {/* Simulated OLED Mini Screen */}
                    <div className="p-1 rounded bg-[#0A1A12] border border-[#1A3828] text-left font-mono text-[9px] text-[#4EFE90] truncate mb-1">
                      {receivedMessage}
                    </div>
                    <span className="text-[9px] font-mono text-[#8A847C]">OLED Listener</span>
                  </div>
                </div>
              </div>

              {/* Telemetry Footer inside graphic */}
              <div className="mt-4 pt-3 border-t border-[#E8E3DD] grid grid-cols-2 gap-2 text-center font-mono text-xs">
                <div className="p-2 rounded-lg bg-white border border-[#E8E3DD]">
                  <span className="text-[10px] text-[#8A847C] block">Received Signal (RSSI)</span>
                  <span className="font-bold text-[#161412]">{packetRssi} dBm</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-[#E8E3DD]">
                  <span className="text-[10px] text-[#8A847C] block">Signal-to-Noise (SNR)</span>
                  <span className="font-bold text-[#FF5A1F]">+{packetSnr} dB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Classroom Live Hardware Demo Placeholder */}
          <div className="mt-3 p-3 rounded-xl bg-white border border-[#E8E3DD] text-[11px] font-mono text-[#8A847C] flex items-center justify-between">
            <span>📡 <strong>Hardware Demo:</strong> Connect physical nodes via COM port @ 115200 baud to view real chirps.</span>
            <span className="text-[#FF5A1F] font-semibold">Active Ready</span>
          </div>
        </motion.div>
      </div>

      {/* 3. Footer Continue */}
      <div className="flex items-center justify-between border-t border-[#E8E3DD]/80 pt-4">
        <p className="font-mono text-xs text-[#8A847C]">
          Up next: Real-world applications, hard physical limitations, and student closing quiz.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-2 text-xs font-mono font-semibold text-[#FF5A1F] hover:text-[#C23B0A] transition-colors interactive-hover"
        >
          <span>Wrap-Up & Knowledge Quiz</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
