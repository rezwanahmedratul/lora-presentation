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
  const [payload, setPayload] = useState<string>("SOIL: 42.5%");
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [receivedMsg, setReceivedMsg] = useState<string>("SOIL: 42.5%");
  const [rssi, setRssi] = useState<number>(-88);
  const [snr, setSnr] = useState<number>(9.2);

  const handleSend = () => {
    if (isTransmitting) return;
    setIsTransmitting(true);
    playChirpSound(280, 500, 2200);

    setTimeout(() => {
      setReceivedMsg(payload);
      setRssi(-80 - Math.floor(Math.random() * 15));
      setSnr(Number((8 + Math.random() * 3).toFixed(1)));
      setIsTransmitting(false);
      playSuccessSound();
    }, 1000);
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
          {SLIDE_6_DATA.kicker}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">
            {SLIDE_6_DATA.headlineItalic}
          </em>
          {SLIDE_6_DATA.headlineRest}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 max-w-4xl leading-relaxed">
          {SLIDE_6_DATA.subtitle}
        </p>
      </motion.div>

      {/* 2. Full-Width Split Screen: Code Panel vs Transceiver Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 my-auto py-3 items-start w-full">
        {/* Code Panel (6 cols) */}
        <div className="lg:col-span-6 p-7 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between min-h-[380px] w-full">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EBF5]">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Terminal size={16} className="text-[#0071E3]" />
                Transmitter Firmware (Arduino C++)
              </span>
              <span className="font-mono text-xs text-[#64748B]">LoRa.h</span>
            </div>

            <div className="mt-5 bg-[#0F172A] text-[#F8FAFC] p-5 rounded-2xl font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto shadow-inner">
              <pre>{SLIDE_6_DATA.arduinoCode}</pre>
            </div>
          </div>

          <div className="mt-4 text-xs sm:text-sm font-mono text-[#64748B]">
            Driver Library: <code>sandeepmistry/arduino-LoRa</code>
          </div>
        </div>

        {/* Transceiver Simulator (6 cols) */}
        <div className="lg:col-span-6 p-7 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between min-h-[380px] w-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#0071E3] font-semibold">
                Simulated Over-The-Air Link
              </span>
              <span className="font-mono text-xs text-[#64748B]">433.00 MHz • SF9</span>
            </div>

            {/* Input & Send */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                maxLength={24}
                className="flex-1 px-4 py-3 rounded-2xl border border-[#E2EBF5] bg-[#F4F8FC] font-mono text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0071E3]"
                placeholder="Sensor message"
              />
              <button
                onClick={handleSend}
                disabled={isTransmitting}
                className="px-7 py-3 rounded-2xl bg-[#0071E3] text-white hover:bg-[#0369A1] font-sans text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all interactive-hover disabled:opacity-50 shadow-xs"
              >
                <Send size={15} />
                <span>{isTransmitting ? "Chirping..." : "Transmit"}</span>
              </button>
            </div>

            {/* Node Visual */}
            <div className="relative p-6 rounded-2xl bg-[#F4F8FC] border border-[#E2EBF5] overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                {/* Node A */}
                <div className="p-4 rounded-2xl bg-white border border-[#E2EBF5] text-center w-32 shadow-xs">
                  <Radio size={22} className="text-[#0071E3] mx-auto mb-1.5" />
                  <span className="font-mono text-xs font-bold text-[#0F172A] block">
                    Node A (TX)
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">ESP32 Probe</span>
                </div>

                {/* Flying Packet */}
                <div className="flex-1 mx-6 relative flex items-center justify-center">
                  <div className="w-full border-b border-dashed border-[#CBD5E1]" />
                  {isTransmitting && (
                    <motion.div
                      initial={{ left: "0%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                      className="absolute -top-4 px-3 py-1 rounded-full bg-[#0071E3] text-white font-mono text-[10px] font-bold shadow-md shadow-[#0071E3]/40 flex items-center gap-1.5"
                    >
                      <Wifi size={12} className="animate-spin" />
                      <span>CSS RF</span>
                    </motion.div>
                  )}
                </div>

                {/* Node B */}
                <div className="p-4 rounded-2xl bg-[#0F172A] text-white text-center w-36 shadow-xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#38BDF8] font-bold block mb-1">
                    Node B (RX)
                  </span>
                  <div className="p-1.5 rounded bg-[#1E293B] font-mono text-xs text-[#38BDF8] truncate">
                    {receivedMsg}
                  </div>
                </div>
              </div>

              {/* Live Signal Telemetry */}
              <div className="mt-5 pt-4 border-t border-[#E2EBF5] flex items-center justify-between font-mono text-xs sm:text-sm">
                <span className="text-[#64748B]">RSSI: <strong className="text-[#0F172A]">{rssi} dBm</strong></span>
                <span className="text-[#64748B]">SNR: <strong className="text-[#0071E3]">+{snr} dB</strong></span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs sm:text-sm font-mono text-[#64748B]">
            Classroom Demo: Connect USB serial terminal at 115200 baud to view live packets.
          </div>
        </div>
      </div>

      {/* 3. Footer */}
      <div className="w-full flex items-center justify-between border-t border-[#E2EBF5] pt-4">
        <p className="font-mono text-xs sm:text-sm text-[#64748B]">
          No handshake overhead: transmit and sleep.
        </p>
        <button
          onClick={onNextSlide}
          className="flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#0071E3] hover:text-[#0369A1] transition-colors interactive-hover"
        >
          <span>Connecting the Earth</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
