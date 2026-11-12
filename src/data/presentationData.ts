// Clean, minimal presentation data for Apple Keynote style presentation.
// Ultra-concise copy, zero clutter.

export interface TechFailureCard {
  id: "wifi" | "ble" | "zigbee" | "gsm";
  name: string;
  tagline: string;
  rangeSpec: string;
  batteryLife: string;
  failureReason: string;
  radarRadiusScale: number;
}

export interface ComparisonRow {
  name: string;
  range: string;
  rangeScore: number;
  battery: string;
  batteryScore: number;
  cost: string;
  costScore: number;
  isLora?: boolean;
}

export interface SpreadingFactorInfo {
  sf: number;
  dataRateKbps: number;
  relativeRangeKm: number;
  timeOnAirMs: number;
  summary: string;
}

export interface PinDefinition {
  id: string;
  name: string;
  role: string;
  mcuPinUno: string;
  mcuPinEsp32: string;
  voltage: string;
  critical?: boolean;
}

export const PRESENTATION_METADATA = {
  courseTitle: "Microprocessor & Embedded Systems",
  topic: "LoRa Wireless Module",
  totalSlides: 7,
};

// SLIDE 1: The Scenario (NO mention of LoRa)
export const SLIDE_1_DATA = {
  headlineItalic: "A farmer.",
  headlineRest: "200 acres. 50 sensors.",
  subStory:
    "He needs 50 soil probes across 200 acres to run 2 years on small batteries. No power grid. No internet out there.",
  technologies: [
    {
      id: "wifi" as const,
      name: "Wi-Fi",
      tagline: "High speed, zero outdoor range",
      rangeSpec: "~50 – 100 m",
      batteryLife: "Days",
      failureReason: "Range is too short. Transceivers drain small batteries in days.",
      radarRadiusScale: 0.12,
    },
    {
      id: "ble" as const,
      name: "Bluetooth",
      tagline: "Low power, bedroom range",
      rangeSpec: "~10 – 30 m",
      batteryLife: "1 – 2 Years",
      failureReason: "Signals cannot escape the porch. Cannot cover agricultural acreage.",
      radarRadiusScale: 0.08,
    },
    {
      id: "zigbee" as const,
      name: "Zigbee",
      tagline: "Short hops, fragile mesh",
      rangeSpec: "~50 m / hop",
      batteryLife: "1 Year",
      failureReason: "Needs dozens of repeaters in the mud. If one fails, the chain breaks.",
      radarRadiusScale: 0.22,
    },
    {
      id: "gsm" as const,
      name: "Cellular 4G",
      tagline: "Long range, high cost & power",
      rangeSpec: "Kilometers",
      batteryLife: "Months",
      failureReason: "Huge transmit power kills batteries. 50 SIM subscriptions are unaffordable.",
      radarRadiusScale: 0.95,
    },
  ],
  resolutionPunchline: "We need long range. Low power. Low cost. All at once.",
};

// SLIDE 2: The Solution, LoRa
export const SLIDE_2_DATA = {
  badge: "The Solution",
  titleSerif: "LoRa",
  subtitle: "Long Range Radio",
  hook: "A physical radio modulation engineered to transmit small telemetry packets over kilometers on milliwatts.",
  stats: [
    { value: "2–15", unit: "km", label: "Real Range" },
    { value: "5–10", unit: "Years", label: "Battery Life" },
    { value: "$0", unit: "Fees", label: "License-Free" },
  ],
  guessGame: {
    prompt: "Guess LoRa's data rate:",
    revealedTitle: "0.3 to 5.5 kbps (Bytes, not Megabytes)",
    insight:
      "LoRa trades speed for range and battery. A soil reading is just 4 bytes (e.g. 42%). Why waste power sending megabytes?",
  },
  comparisonRows: [
    {
      name: "Wi-Fi",
      range: "50 – 100 m",
      rangeScore: 15,
      battery: "Days",
      batteryScore: 10,
      cost: "Medium",
      costScore: 50,
    },
    {
      name: "Bluetooth",
      range: "10 – 30 m",
      rangeScore: 10,
      battery: "1 – 2 Years",
      batteryScore: 75,
      cost: "Low",
      costScore: 80,
    },
    {
      name: "Zigbee",
      range: "50 m / hop",
      rangeScore: 25,
      battery: "1 Year",
      batteryScore: 65,
      cost: "High (repeaters)",
      costScore: 40,
    },
    {
      name: "Cellular 4G",
      range: "5 – 10 km",
      rangeScore: 80,
      battery: "Months",
      batteryScore: 35,
      cost: "$$$ / SIM",
      costScore: 20,
    },
    {
      name: "LoRa",
      range: "2 – 15 km+",
      rangeScore: 98,
      battery: "5 – 10+ Years",
      batteryScore: 98,
      cost: "Zero monthly fee",
      costScore: 95,
      isLora: true,
    },
  ],
};

// SLIDE 3: How LoRa Works
export const SLIDE_3_DATA = {
  badge: "Physical Modulation",
  headlineItalic: "A signal",
  headlineRest: "that sweeps.",
  analogy:
    "Like a bird chirp sweeping from low to high pitch to cut through noise, LoRa continuously sweeps radio frequencies.",
  cssName: "Chirp Spread Spectrum (CSS)",
  spreadingFactors: [
    { sf: 7, dataRateKbps: 5.47, relativeRangeKm: 3.5, timeOnAirMs: 41, summary: "Fastest data, lowest latency." },
    { sf: 8, dataRateKbps: 3.12, relativeRangeKm: 5.0, timeOnAirMs: 72, summary: "Balanced suburban reach." },
    { sf: 9, dataRateKbps: 1.76, relativeRangeKm: 7.5, timeOnAirMs: 144, summary: "Medium range with obstacles." },
    { sf: 10, dataRateKbps: 0.98, relativeRangeKm: 10.0, timeOnAirMs: 288, summary: "Long rural distance." },
    { sf: 11, dataRateKbps: 0.54, relativeRangeKm: 12.5, timeOnAirMs: 578, summary: "Deep foliage penetration." },
    { sf: 12, dataRateKbps: 0.29, relativeRangeKm: 15.0, timeOnAirMs: 991, summary: "Max range. Decodes below noise floor." },
  ],
  goldenRule: "Higher SF = longer range, slower data.",
};

// SLIDE 4: LoRa vs LoRaWAN
export const SLIDE_4_DATA = {
  badge: "Network Architecture",
  headlineItalic: "The radio",
  headlineRest: "vs the network.",
  intro:
    "LoRa is the physical radio modulation (the PHY). LoRaWAN is the networking protocol on top (gateways, routing, encryption).",
  architectureSteps: [
    { label: "1. Sensor Node", desc: "Transmits RF chirp" },
    { label: "2. Gateway", desc: "Bridges RF to Internet" },
    { label: "3. Network Server", desc: "Deduplicates & encrypts" },
    { label: "4. Application", desc: "Displays dashboard" },
  ],
  gameChips: [
    { id: "c1", label: "Chirp Modulation (CSS)", target: "lora" as const },
    { id: "c2", label: "AES-128 Encryption", target: "lorawan" as const },
    { id: "c3", label: "Spreading Factor (SF)", target: "lora" as const },
    { id: "c4", label: "8-Channel Gateway", target: "lorawan" as const },
    { id: "c5", label: "SX1278 Radio Silicon", target: "lora" as const },
    { id: "c6", label: "Over-the-Air Activation", target: "lorawan" as const },
  ],
};

// SLIDE 5: Hardware & Pins
export const SLIDE_5_DATA = {
  badge: "Hardware & Interfacing",
  headlineItalic: "Silicon",
  headlineRest: "meets pins.",
  subtext: "Standard SPI interface connects the SX1278 / Ra-02 transceiver to your microcontroller.",
  pins: [
    { id: "vcc", name: "3.3V (VCC)", role: "Power (2.0V - 3.7V)", mcuPinUno: "3.3V", mcuPinEsp32: "3V3", voltage: "3.3V", critical: true },
    { id: "gnd", name: "GND", role: "System ground", mcuPinUno: "GND", mcuPinEsp32: "GND", voltage: "0V" },
    { id: "nss", name: "NSS (CS)", role: "SPI Chip Select", mcuPinUno: "D10", mcuPinEsp32: "GPIO 5", voltage: "3.3V" },
    { id: "sck", name: "SCK", role: "SPI Clock", mcuPinUno: "D13", mcuPinEsp32: "GPIO 18", voltage: "3.3V" },
    { id: "mosi", name: "MOSI", role: "SPI Data In", mcuPinUno: "D11", mcuPinEsp32: "GPIO 23", voltage: "3.3V" },
    { id: "miso", name: "MISO", role: "SPI Data Out", mcuPinUno: "D12", mcuPinEsp32: "GPIO 19", voltage: "3.3V" },
    { id: "dio0", name: "DIO0", role: "Interrupt (Rx/Tx Done)", mcuPinUno: "D2", mcuPinEsp32: "GPIO 2", voltage: "3.3V", critical: true },
    { id: "ant", name: "ANT", role: "50Ω RF Antenna", mcuPinUno: "Antenna", mcuPinEsp32: "Antenna", voltage: "RF", critical: true },
  ],
  warnings: [
    "⚠️ 3.3V Logic Only: SX1278 inputs are not 5V tolerant. Use level shifters with 5V Arduino Uno.",
    "⚠️ Mandatory Antenna: Never power or transmit without an antenna attached, or the PA will burn out.",
  ],
};

// SLIDE 6: Demo & Code
export const SLIDE_6_DATA = {
  badge: "Embedded Firmware",
  headlineItalic: "Sending bytes",
  headlineRest: "through thin air.",
  codeTabs: {
    sender: {
      name: "Sender (Arduino C++)",
      code: `LoRa.begin(433E6);          // Start radio at 433 MHz
LoRa.setSpreadingFactor(9);  // SF7 to SF12
LoRa.beginPacket();          // Open TX FIFO
LoRa.print("SOIL: 42%");     // Write payload
LoRa.endPacket();            // Transmit chirps`,
    },
    receiver: {
      name: "Receiver (Arduino C++)",
      code: `int packetSize = LoRa.parsePacket();
if (packetSize) {
  while (LoRa.available()) {
    Serial.print((char)LoRa.read());
  }
  Serial.println(LoRa.packetRssi()); // Signal dBm
}`,
    },
  },
};

// SLIDE 7: Summary & Wrap-up
export const SLIDE_7_DATA = {
  badge: "Wrap-up & Applications",
  headlineItalic: "From soil",
  headlineRest: "to orbit.",
  farmerClosure: "200 acres covered. 50 sensors running 3 years on AA batteries. $0 monthly fees.",
  applications: [
    { title: "Smart Agriculture", desc: "Soil probes, livestock tracking" },
    { title: "Smart Cities", desc: "Water meters, streetlight controls" },
    { title: "Asset Tracking", desc: "Cold-chain crates, shipping containers" },
    { title: "Environment", desc: "Flood rise, wildfire smoke alerts" },
  ],
  limitations: [
    "Low data rate: 0.3 – 5.5 kbps (no audio/video)",
    "Duty-cycle laws: 1% transmission time limits",
    "High latency: Packets take ~0.5 - 1s on-air",
  ],
  keyTakeaways: [
    { num: "01", title: "CSS Modulation", desc: "Chirps penetrate noise below the thermal floor." },
    { num: "02", title: "Bytes, Not Megabytes", desc: "Giving up high data rate yields 15 km range." },
    { num: "03", title: "SPI to the MCU", desc: "SX1278 connects with 4 SPI lines + 1 interrupt pin." },
  ],
  quizQuestions: [
    {
      id: 1,
      question: "What physical modulation gives LoRa its extreme range?",
      options: ["Chirp Spread Spectrum (CSS)", "Frequency Shift Keying (FSK)", "QAM-64", "OFDM"],
      correctIndex: 0,
    },
    {
      id: 2,
      question: "If your sensor is 10 km away in dense trees, what should you do with SF?",
      options: ["Lower to SF7 for speed", "Increase to SF12 for max sensitivity", "Switch to Wi-Fi", "Disable antenna"],
      correctIndex: 1,
    },
    {
      id: 3,
      question: "What happens if you transmit with an SX1278 without an antenna?",
      options: ["The signal goes further", "Reflected RF burns the Power Amplifier", "Data rate doubles", "Nothing"],
      correctIndex: 1,
    },
  ],
};
