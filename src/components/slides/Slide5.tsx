"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SLIDE_5_DATA } from "@/data/presentationData";
import { playChirpSound, playSuccessSound } from "@/utils/audio";
import { Send, ArrowRight, Radio, Cpu, Monitor, Wifi, Sparkles, CheckCircle2 } from "lucide-react";

interface Slide5Props {
  onNextSlide: () => void;
}

export const Slide5: React.FC<Slide5Props> = ({ onNextSlide }) => {
  const [inputText, setInputText] = useState<string>("Hello from Node 1");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [receivedMsg, setReceivedMsg] = useState<string>("Received by Node 2");
  const [exchangeCount, setExchangeCount] = useState<number>(1);

  const handleSendExchange = () => {
    if (isSending) return;
    setIsSending(true);
    setActiveStep(1);

    // Step through the pipeline: Sensor(1) -> MCU(2) -> LoRa TX(3) -> RF(4) -> LoRa RX(5) -> MCU(6) -> Display(7)
    const timers = [
      setTimeout(() => setActiveStep(2), 300),
      setTimeout(() => {
        setActiveStep(3);
        playChirpSound(300, 500, 2200);
      }, 700),
      setTimeout(() => setActiveStep(4), 1100),
      setTimeout(() => setActiveStep(5), 1500),
      setTimeout(() => setActiveStep(6), 1900),
      setTimeout(() => {
        setActiveStep(7);
        setReceivedMsg(`Received: "${inputText}"`);
        setExchangeCount((prev) => prev + 1);
        setIsSending(false);
        playSuccessSound();
      }, 2300),
    ];
  };

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
          {SLIDE_5_DATA.title}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">How Two Devices</em>
          Communicate.
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2.5 max-w-4xl leading-relaxed">
          {SLIDE_5_DATA.subtitle}: Sensor → Arduino → LoRa TX → Radio Waves → LoRa RX → Arduino → Display.
        </p>
      </motion.div>

      {/* 2. Visual Left-to-Right Communication Flow + Simulated Message Exchange */}
      <div className="my-auto py-3 space-y-6 w-full">
        {/* Clean 7-Step Left-to-Right Pipeline Diagram */}
        <div className="p-6 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs w-full">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0071E3] font-semibold">
              Complete Left-to-Right Communication Pipeline
            </span>
            <span className="font-mono text-xs text-[#64748B]">
              Step: {activeStep === 0 ? "Ready" : `${activeStep} of 7`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 w-full">
            {SLIDE_5_DATA.steps.map((step) => {
              const isCurrent = activeStep === step.id;
              const hasPassed = activeStep >= step.id;

              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-2xl border transition-all text-center flex flex-col justify-between ${
                    isCurrent
                      ? "bg-[#E0F2FE] border-[#0071E3] shadow-md shadow-[#0071E3]/20 scale-[1.04]"
                      : hasPassed
                      ? "bg-[#F4F8FC] border-[#0071E3]/40 text-[#0F172A]"
                      : "bg-[#F4F8FC] border-[#E2EBF5] opacity-70"
                  }`}
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#0071E3] block">
                      Step 0{step.id}
                    </span>
                    <h4 className="font-serif text-lg text-[#0F172A] mt-1 font-bold">{step.name}</h4>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-2 leading-snug">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Simulated Message Exchange Console */}
        <div className="p-6 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#0071E3] font-semibold">
                Interactive Node Simulation
              </span>
              <h3 className="font-serif text-2xl text-[#0F172A]">
                Simulate Node 1 to Node 2 Exchange
              </h3>
            </div>

            {/* Input & Send Button */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={30}
                className="px-4 py-2 rounded-xl border border-[#E2EBF5] bg-[#F4F8FC] font-mono text-xs text-[#0F172A] focus:outline-none focus:border-[#0071E3] w-full sm:w-64"
                placeholder="Message from Node 1"
              />
              <button
                onClick={handleSendExchange}
                disabled={isSending}
                className="px-6 py-2 rounded-xl bg-[#0071E3] text-white hover:bg-[#0369A1] font-sans text-xs font-semibold flex items-center gap-1.5 transition-all interactive-hover disabled:opacity-50 shadow-xs shrink-0"
              >
                <Send size={13} />
                <span>{isSending ? "Transmitting..." : "Send"}</span>
              </button>
            </div>
          </div>

          {/* Simulated 2-Node Displays */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Node 1 Box */}
            <div className="p-5 rounded-2xl bg-[#F4F8FC] border border-[#E2EBF5]">
              <span className="font-mono text-xs font-bold text-[#0071E3] uppercase block mb-1">
                Node 1 (Transmitter)
              </span>
              <div className="p-3 rounded-xl bg-white border border-[#E2EBF5] font-mono text-xs text-[#0F172A]">
                TX Payload: &ldquo;{inputText}&rdquo;
              </div>
              <div className="mt-2 text-[11px] font-mono text-[#64748B]">
                SPI write: <code>LoRa.beginPacket(); LoRa.print(...); LoRa.endPacket();</code>
              </div>
            </div>

            {/* Node 2 Box */}
            <div className="p-5 rounded-2xl bg-[#0F172A] text-white border border-[#0F172A]">
              <span className="font-mono text-xs font-bold text-[#38BDF8] uppercase block mb-1">
                Node 2 (Receiver OLED Display)
              </span>
              <div className="p-3 rounded-xl bg-[#1E293B] font-mono text-xs text-[#38BDF8]">
                {receivedMsg}
              </div>
              <div className="mt-2 text-[11px] font-mono text-[#94A3B8] flex items-center justify-between">
                <span>RSSI: {SLIDE_5_DATA.demoExchange.telemetry.rssi}</span>
                <span>SNR: {SLIDE_5_DATA.demoExchange.telemetry.snr}</span>
                <span>{SLIDE_5_DATA.demoExchange.telemetry.freq}</span>
              </div>
            </div>
          </div>

          {/* Next slide button */}
          <div className="mt-5 pt-3 border-t border-[#E2EBF5] flex justify-end">
            <button
              onClick={onNextSlide}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0071E3] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#0369A1] transition-all interactive-hover shadow-xs"
            >
              <span>Next: Applications & Limitations</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
