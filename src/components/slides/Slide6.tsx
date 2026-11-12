"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SLIDE_6_DATA } from "@/data/presentationData";
import { playChirpSound, playSuccessSound } from "@/utils/audio";
import { Send, Terminal, Radio, ArrowRight, Wifi } from "lucide-react";

interface Slide6Props {
  onNextSlide: () => void;
}

export const Slide6: React.FC<Slide6Props> = ({ onNextSlide }) => {
  const [activeTab, setActiveTab] = useState<"sender" | "receiver">("sender");
  const [payloadText, setPayloadText] = useState<string>("SOIL: 42.5%");
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [receivedMessage, setReceivedMessage] = useState<string>("SOIL: 42.5%");
  const [packetRssi, setPacketRssi] = useState<number>(-89);

  const activeCodeData = SLIDE_6_DATA.codeTabs[activeTab];

  const handleTransmit = () => {
    if (isTransmitting) return;
    setIsTransmitting(true);
    playChirpSound(280, 500, 2200);

    setTimeout(() => {
      setReceivedMessage(payloadText);
      setPacketRssi(-85 - Math.floor(Math.random() * 12));
      setIsTransmitting(false);
      playSuccessSound();
    }, 1000);
  };

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
          {SLIDE_6_DATA.badge}
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#0F172A] leading-tight tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-2">
            {SLIDE_6_DATA.headlineItalic}
          </em>
          {SLIDE_6_DATA.headlineRest}
        </h1>
        <p className="text-sm text-[#64748B] font-sans mt-1.5 max-w-2xl leading-relaxed">
          Clean Arduino C++ API to serialize bytes, initiate frequency chirps, and parse packets.
        </p>
      </motion.div>

      {/* 2. Split Screen: Code Panel vs Transceiver Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-start">
        {/* Code Panel (6 cols) */}
        <div className="lg:col-span-6 keynote-card p-5 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EBF2]">
              <span className="font-mono text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                <Terminal size={14} className="text-[#0071E3]" />
                {activeCodeData.name}
              </span>

              <div className="flex items-center gap-1 bg-[#EDF4F9] p-1 rounded-xl border border-[#E2EBF2] text-xs font-mono">
                <button
                  onClick={() => setActiveTab("sender")}
                  className={`px-3 py-1 rounded-lg transition-colors interactive-hover ${
                    activeTab === "sender" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
                  }`}
                >
                  Sender
                </button>
                <button
                  onClick={() => setActiveTab("receiver")}
                  className={`px-3 py-1 rounded-lg transition-colors interactive-hover ${
                    activeTab === "receiver" ? "bg-white text-[#0071E3] font-bold shadow-xs" : "text-[#64748B]"
                  }`}
                >
                  Receiver
                </button>
              </div>
            </div>

            {/* Clean Code Block */}
            <div className="mt-4 bg-[#0F172A] text-[#F8FAFC] p-4 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
              <pre>{activeCodeData.code}</pre>
            </div>
          </div>

          <div className="mt-3 text-xs font-mono text-[#64748B]">
            Library: <code>sandeepmistry/arduino-LoRa</code>
          </div>
        </div>

        {/* Transceiver Simulator (6 cols) */}
        <div className="lg:col-span-6 keynote-card p-5 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0071E3] font-semibold">
                Live Simulated Radio Link
              </span>
              <span className="font-mono text-xs text-[#64748B]">433.00 MHz</span>
            </div>

            {/* Message input & Send button */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={payloadText}
                onChange={(e) => setPayloadText(e.target.value)}
                maxLength={24}
                className="flex-1 px-3 py-2 rounded-xl border border-[#E2EBF2] bg-white font-mono text-xs text-[#0F172A] focus:outline-none focus:border-[#0071E3]"
                placeholder="Sensor message"
              />
              <button
                onClick={handleTransmit}
                disabled={isTransmitting}
                className="px-5 py-2 rounded-xl bg-[#0071E3] text-white hover:bg-[#0369A1] font-sans text-xs font-semibold flex items-center gap-1.5 transition-colors interactive-hover disabled:opacity-50"
              >
                <Send size={13} />
                <span>{isTransmitting ? "Chirping..." : "Send Packet"}</span>
              </button>
            </div>

            {/* Visual Node Diagram */}
            <div className="relative p-5 rounded-2xl bg-[#EDF4F9] border border-[#E2EBF2] overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                {/* Node A */}
                <div className="p-3 rounded-2xl bg-white border border-[#E2EBF2] text-center w-24 shadow-xs">
                  <Radio size={18} className="text-[#0071E3] mx-auto mb-1" />
                  <span className="font-mono text-[10px] font-bold text-[#0F172A] block">
                    Node A (TX)
                  </span>
                  <span className="text-[9px] font-mono text-[#64748B]">Sensor Probe</span>
                </div>

                {/* Flying Packet */}
                <div className="flex-1 mx-4 relative flex items-center justify-center">
                  <div className="w-full border-b border-dashed border-[#CBD5E1]" />
                  {isTransmitting && (
                    <motion.div
                      initial={{ left: "0%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                      className="absolute -top-3 px-2 py-0.5 rounded-full bg-[#0071E3] text-white font-mono text-[9px] font-bold shadow-md shadow-[#0071E3]/40 flex items-center gap-1"
                    >
                      <Wifi size={10} className="animate-spin" />
                      <span>CSS</span>
                    </motion.div>
                  )}
                </div>

                {/* Node B */}
                <div className="p-3 rounded-2xl bg-[#0F172A] text-white text-center w-28 shadow-xs">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#38BDF8] font-bold block mb-0.5">
                    Node B (RX)
                  </span>
                  <div className="p-1 rounded bg-[#1E293B] font-mono text-[9px] text-[#38BDF8] truncate mb-0.5">
                    {receivedMessage}
                  </div>
                  <span className="text-[9px] font-mono text-[#94A3B8]">Gateway</span>
                </div>
              </div>

              {/* RSSI Signal Telemetry */}
              <div className="mt-4 pt-3 border-t border-[#E2EBF2] flex items-center justify-between font-mono text-xs">
                <span className="text-[#64748B]">Received Signal:</span>
                <span className="font-bold text-[#0071E3]">{packetRssi} dBm (Clean Decoded)</span>
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs font-mono text-[#64748B]">
            Classroom Demo: Plug in USB serial terminal at 115200 baud for real-time packets.
          </div>
        </div>
      </div>

      {/* 3. Footer */}
      <div className="flex items-center justify-between border-t border-[#E2EBF2] pt-3">
        <p className="font-mono text-xs text-[#64748B]">
          No connection handshake required; simply transmit and return to deep sleep.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0071E3] hover:text-[#0369A1] transition-colors interactive-hover"
        >
          <span>Wrap-Up & Quiz</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
