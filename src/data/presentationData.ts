// Centralized presentation data file for all slide content, copy, technical specs, and interactive data.
// Edit text, numbers, code, and questions here without touching UI rendering code.

export interface TechFailureCard {
  id: "wifi" | "ble" | "zigbee" | "gsm";
  name: string;
  tagline: string;
  rangeSpec: string;
  batteryLife: string;
  costSpec: string;
  failureReason: string;
  radarRadiusScale: number; // For visualization scaling (0 to 1)
  failureDetails: string[];
}

export interface ComparisonRow {
  name: string;
  range: string;
  rangeScore: number; // 1-100 for bar width
  battery: string;
  batteryScore: number;
  dataRate: string;
  dataRateScore: number;
  cost: string;
  costScore: number;
  isLora?: boolean;
}

export interface SpreadingFactorInfo {
  sf: number;
  chipsPerSymbol: number;
  dataRateKbps: number;
  timeOnAirMs: number; // for 20 bytes
  sensitivityDbm: number;
  relativeRangeKm: number;
  snrLimitDb: number;
  bestFor: string;
}

export interface PinDefinition {
  id: string;
  pinNumber: number;
  name: string;
  type: "Power" | "Ground" | "SPI" | "Control" | "Interrupt" | "RF";
  description: string;
  mcuPinUno: string;
  mcuPinEsp32: string;
  voltage: string;
  critical?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const PRESENTATION_METADATA = {
  courseTitle: "Microprocessor, Microcontroller and Embedded Systems",
  topic: "LoRa Wireless Module",
  subtitle: "Long-Range, Low-Power Embedded Radio Communication",
  totalSlides: 7,
};

// SLIDE 1: The Scenario (No mention of the word LoRa!)
export const SLIDE_1_DATA = {
  headlineItalic: "A farmer.",
  headlineRest: "200 acres. 50 sensors.",
  subStory:
    "He needs hourly soil moisture & temperature data from 50 sensors scattered across 200 acres of muddy terrain. Each node must run for 2 years on two AA batteries with zero grid electricity, no Wi-Fi router in the dirt, and no existing cellular towers nearby.",
  technologies: [
    {
      id: "wifi" as const,
      name: "Wi-Fi (802.11)",
      tagline: "High speed, zero range outdoors",
      rangeSpec: "~50 – 100 m",
      batteryLife: "Days / Weeks",
      costSpec: "Cheap routers, but useless in fields",
      failureReason: "Range too tiny. Transceivers consume ~100–300 mA, draining batteries in days.",
      radarRadiusScale: 0.12,
      failureDetails: [
        "Range collapses through crop canopy & soil moisture absorption",
        "Continuous beacon association drains AA cells in under 2 weeks",
        "Requires mains-powered access points every 70 meters",
      ],
    },
    {
      id: "ble" as const,
      name: "Bluetooth (BLE)",
      tagline: "Ultra-low power, bedroom range",
      rangeSpec: "~10 – 30 m",
      batteryLife: "Months / Year",
      costSpec: "Cheap chips",
      failureReason: "Range cannot escape the porch. 50 meters away, packets vanish into the dirt.",
      radarRadiusScale: 0.08,
      failureDetails: [
        "Transmitter power (+4 dBm) cannot penetrate 1 km of farmland",
        "Designed for smartwatches and earbuds, not agricultural acreage",
        "Requires walking right up to each sensor with a phone to read values",
      ],
    },
    {
      id: "zigbee" as const,
      name: "Zigbee / Mesh",
      tagline: "Short hops, fragile mesh",
      rangeSpec: "~30 – 80 m per hop",
      batteryLife: "6 – 18 Months",
      costSpec: "Needs dozens of repeaters",
      failureReason: "Needs dense relay nodes. If a tractor crushes one repeater node, the whole chain breaks.",
      radarRadiusScale: 0.22,
      failureDetails: [
        "Mesh routers must stay awake to forward packets, destroying battery life",
        "Farms have vast empty spaces with no physical mounts for repeaters",
        "Network route discovery overhead causes packet storms and latency",
      ],
    },
    {
      id: "gsm" as const,
      name: "4G / LTE / GSM",
      tagline: "Reaches far, drains wallets & batteries",
      rangeSpec: "Kilometers (needs cell tower)",
      batteryLife: "Months without large battery",
      costSpec: "$5 / SIM / month ($3,000 / year!)",
      failureReason: "Heavy peak current (up to 2 Amps during TX) kills AA cells. 50 SIM subscriptions are unaffordable.",
      radarRadiusScale: 0.95,
      failureDetails: [
        "50 SIM cards × $5/month = $3,000 every year in cellular carrier bills",
        "Tower connection handshake draws huge burst currents",
        "Rural valleys and fields frequently have zero cellular coverage",
      ],
    },
  ],
  resolutionPunchline: "We need long range. Low power. Low cost. All at once.",
};

// SLIDE 2: The Solution, LoRa
export const SLIDE_2_DATA = {
  badge: "The Breakthrough",
  titleSerif: "LoRa",
  subtitle: "Long Range Radio Modulation",
  hook: "A wireless physical layer engineered to transmit tiny packets across entire towns on battery power that outlasts the sensors themselves.",
  stats: [
    { value: "2–15", unit: "km", label: "Real-World Range", sub: "Line-of-sight up to 40+ km" },
    { value: "5–10+", unit: "Years", label: "Battery Lifetime", sub: "On simple AA or coin cells" },
    { value: "0", unit: "Dollars", label: "Monthly Fees", sub: "License-free sub-GHz ISM radio bands" },
  ],
  guessGame: {
    prompt: "How fast do you think LoRa transmits data?",
    subtitle: "Drag the slider to test your intuition about long-range wireless:",
    revealedTitle: "0.3 to 5.5 kbps (Bytes, not Megabytes!)",
    insight:
      "Physics dictates the trade-off: to reach 15 km on 25 milliwatts of power, you must reduce bandwidth. A soil moisture reading is just 4 bytes (e.g. 0x2A 0x18). Why burn battery transmitting megabytes when bytes are all you need?",
  },
  comparisonRows: [
    {
      name: "Wi-Fi (802.11ax)",
      range: "50 – 100 m",
      rangeScore: 12,
      battery: "Days – Weeks",
      batteryScore: 15,
      dataRate: "100+ Mbps",
      dataRateScore: 98,
      cost: "Medium",
      costScore: 60,
    },
    {
      name: "Bluetooth (BLE)",
      range: "10 – 30 m",
      rangeScore: 8,
      battery: "1 – 2 Years",
      batteryScore: 70,
      dataRate: "1 – 2 Mbps",
      dataRateScore: 75,
      cost: "Low",
      costScore: 80,
    },
    {
      name: "Zigbee (802.15.4)",
      range: "50 – 100 m",
      rangeScore: 15,
      battery: "1 – 2 Years",
      batteryScore: 65,
      dataRate: "250 kbps",
      dataRateScore: 40,
      cost: "High (mesh repeaters)",
      costScore: 35,
    },
    {
      name: "Cellular (4G LTE-M)",
      range: "5 – 10 km",
      rangeScore: 75,
      battery: "1 – 3 Years",
      batteryScore: 45,
      dataRate: "1 Mbps",
      dataRateScore: 70,
      cost: "Very High ($/month)",
      costScore: 20,
    },
    {
      name: "LoRa (CSS Modulation)",
      range: "2 – 15 km+",
      rangeScore: 96,
      battery: "5 – 10+ Years",
      batteryScore: 98,
      dataRate: "0.3 – 5.5 kbps",
      dataRateScore: 18,
      cost: "Zero fees (Sub-$5 chips)",
      costScore: 95,
      isLora: true,
    },
  ],
};

// SLIDE 3: How LoRa Works (Chirp Spread Spectrum)
export const SLIDE_3_DATA = {
  badge: "Physical Layer Physics",
  headlineItalic: "A signal",
  headlineRest: "that sweeps.",
  analogy:
    "Imagine whispering in a crowded cafeteria: nobody hears you. But whistle a rising tone—chirp!—and everyone immediately distinguishes it above the roar. LoRa does this with radio frequencies.",
  cssName: "Chirp Spread Spectrum (CSS)",
  cssDescription:
    "Instead of sitting on one fixed frequency (which gets jammed by walls and noise), LoRa modulates data by sweeping frequency continuously over time from $f_{min}$ to $f_{max}$. Originally developed for military radar and used by dolphins and bats.",
  spreadingFactors: [
    {
      sf: 7,
      chipsPerSymbol: 128,
      dataRateKbps: 5.47,
      timeOnAirMs: 41.2,
      sensitivityDbm: -123,
      relativeRangeKm: 3.5,
      snrLimitDb: -7.5,
      bestFor: "Fastest data, lowest latency, close nodes with clean line of sight.",
    },
    {
      sf: 8,
      chipsPerSymbol: 256,
      dataRateKbps: 3.12,
      timeOnAirMs: 72.2,
      sensitivityDbm: -126,
      relativeRangeKm: 5.0,
      snrLimitDb: -10.0,
      bestFor: "Balanced transmission for suburban telemetry.",
    },
    {
      sf: 9,
      chipsPerSymbol: 512,
      dataRateKbps: 1.76,
      timeOnAirMs: 144.4,
      sensitivityDbm: -129,
      relativeRangeKm: 7.5,
      snrLimitDb: -12.5,
      bestFor: "Intermediate distance with moderate building obstacles.",
    },
    {
      sf: 10,
      chipsPerSymbol: 1024,
      dataRateKbps: 0.98,
      timeOnAirMs: 288.8,
      sensitivityDbm: -132,
      relativeRangeKm: 10.0,
      snrLimitDb: -15.0,
      bestFor: "Long-distance rural sensors and deep foliage.",
    },
    {
      sf: 11,
      chipsPerSymbol: 2048,
      dataRateKbps: 0.54,
      timeOnAirMs: 577.5,
      sensitivityDbm: -134.5,
      relativeRangeKm: 12.5,
      snrLimitDb: -17.5,
      bestFor: "Challenging urban basements and non-line-of-sight.",
    },
    {
      sf: 12,
      chipsPerSymbol: 4096,
      dataRateKbps: 0.29,
      timeOnAirMs: 991.2,
      sensitivityDbm: -137,
      relativeRangeKm: 15.0,
      snrLimitDb: -20.0,
      bestFor: "Maximum range & extreme penetration. Decodes signals 20 dB BELOW the noise floor!",
    },
  ],
  specChips: [
    {
      title: "Bandwidth (BW)",
      value: "125 kHz typical",
      detail: "Wider BW (250/500 kHz) means faster data; narrower BW gives deeper sensitivity.",
    },
    {
      title: "Coding Rate (CR)",
      value: "4/5 to 4/8",
      detail: "Forward Error Correction (FEC). Adds redundant parity bits so corrupted bytes self-heal without retransmission.",
    },
    {
      title: "License-Free ISM",
      value: "433 / 868 / 915 MHz",
      detail: "Sub-GHz spectrum waves diffract around hills and punch through foliage far better than 2.4 GHz Wi-Fi.",
    },
  ],
  goldenRule: "Higher SF = 4096 chips/symbol = extreme noise resistance and range, at the cost of airtime and battery.",
};

// SLIDE 4: LoRa vs LoRaWAN
export const SLIDE_4_DATA = {
  badge: "Architecture & Stack",
  headlineItalic: "The radio",
  headlineRest: "vs the network.",
  intro:
    "Students constantly confuse LoRa and LoRaWAN. Think of LoRa as the radio hardware wire (like Ethernet cable or PHY), while LoRaWAN is the entire operating network protocol (like TCP/IP and the internet).",
  stack: {
    lora: {
      layer: "Physical Layer (PHY)",
      owner: "Semtech Proprietary Modulation",
      duties: ["Chirp Spread Spectrum (CSS)", "RF Frequency (433/868/915 MHz)", "Spreading Factor & Bandwidth", "Raw RF transceiver chip (SX1276/78)"],
    },
    lorawan: {
      layer: "MAC & Network Layer",
      owner: "LoRa Alliance Open Standard",
      duties: ["Star-of-stars network topology", "Gateway packet forwarding to cloud", "End-to-end AES-128 encryption", "Device join & activation (OTAA / ABP)", "Adaptive Data Rate (ADR) algorithms"],
    },
  },
  architectureSteps: [
    { id: "node", label: "End Node", type: "Sensor + MCU", desc: "Collects analog sensor readings, wraps in LoRa chirps, sleeps 99.9% of time." },
    { id: "gateway", label: "LoRa Gateway", type: "8-Channel Concentrator", desc: "Listens to all SFs simultaneously. Bridges RF chirps to IP backhaul (Ethernet/Cellular)." },
    { id: "server", label: "Network Server", type: "Cloud (TTN / ChirpStack)", desc: "Deduplicates packets, checks MIC signatures, manages encryption keys, handles ADR." },
    { id: "app", label: "Application", type: "Web / Dashboard", desc: "Stores time-series data, triggers farm irrigation valves, displays graphs." },
  ],
  gameChips: [
    { id: "c1", label: "Chirp Spread Spectrum", target: "lora" as const, explanation: "CSS is the analog RF modulation occurring strictly inside the radio transceiver." },
    { id: "c2", label: "AES-128 Encryption", target: "lorawan" as const, explanation: "Network session and app keys encrypt payloads at the LoRaWAN MAC layer." },
    { id: "c3", label: "Multi-Channel Gateway", target: "lorawan" as const, explanation: "Gateways are network infrastructure routing packets from RF to Cloud." },
    { id: "c4", label: "Spreading Factor (SF)", target: "lora" as const, explanation: "Spreading Factor determines how many chirp sweeps represent one digital symbol." },
    { id: "c5", label: "Over-the-Air Activation (OTAA)", target: "lorawan" as const, explanation: "OTAA is the handshake process that authenticates a node into a LoRaWAN cloud." },
    { id: "c6", label: "SX1278 Silicon Transceiver", target: "lora" as const, explanation: "The physical silicon chip fabricated with Semtech's patented analog modulation." },
  ],
};

// SLIDE 5: The LoRa Module in Hardware
export const SLIDE_5_DATA = {
  badge: "Embedded Hardware Interface",
  headlineItalic: "Silicon",
  headlineRest: "meets pins.",
  subtext:
    "The most popular embedded modules (SX1278, RFM95W, Ra-02) interface with microcontrollers (STM32, ESP32, Arduino) using high-speed Serial Peripheral Interface (SPI).",
  moduleName: "Ra-02 / SX1278 433MHz Transceiver",
  pins: [
    {
      id: "vcc",
      pinNumber: 1,
      name: "3.3V (VCC)",
      type: "Power" as const,
      description: "Direct 3.3V DC power. NEVER connect to 5V power supply!",
      mcuPinUno: "3.3V Pin",
      mcuPinEsp32: "3V3 Pin",
      voltage: "3.3V DC (2.0V - 3.7V)",
      critical: true,
    },
    {
      id: "gnd",
      pinNumber: 2,
      name: "GND",
      type: "Ground" as const,
      description: "System common ground reference.",
      mcuPinUno: "GND",
      mcuPinEsp32: "GND",
      voltage: "0V",
    },
    {
      id: "nss",
      pinNumber: 3,
      name: "NSS (CS)",
      type: "SPI" as const,
      description: "SPI Slave Select (Chip Select). Active LOW to initiate SPI bus transactions.",
      mcuPinUno: "D10",
      mcuPinEsp32: "GPIO 5",
      voltage: "3.3V Logic",
    },
    {
      id: "sck",
      pinNumber: 4,
      name: "SCK",
      type: "SPI" as const,
      description: "SPI Serial Clock generated by the MCU master (up to 10 MHz).",
      mcuPinUno: "D13",
      mcuPinEsp32: "GPIO 18",
      voltage: "3.3V Logic",
    },
    {
      id: "mosi",
      pinNumber: 5,
      name: "MOSI",
      type: "SPI" as const,
      description: "Master Out Slave In: MCU writes register configurations and packet payload into SX1278 FIFO buffer.",
      mcuPinUno: "D11",
      mcuPinEsp32: "GPIO 23",
      voltage: "3.3V Logic",
    },
    {
      id: "miso",
      pinNumber: 6,
      name: "MISO",
      type: "SPI" as const,
      description: "Master In Slave Out: MCU reads received packet bytes and status flags.",
      mcuPinUno: "D12",
      mcuPinEsp32: "GPIO 19",
      voltage: "3.3V Logic",
    },
    {
      id: "rst",
      pinNumber: 7,
      name: "RESET",
      type: "Control" as const,
      description: "Hardware reset pin. Pulled LOW by MCU for at least 100 µs to reset the radio.",
      mcuPinUno: "D9",
      mcuPinEsp32: "GPIO 14",
      voltage: "3.3V Logic",
    },
    {
      id: "dio0",
      pinNumber: 8,
      name: "DIO0",
      type: "Interrupt" as const,
      description: "Hardware Interrupt line. Fires HIGH on RxDone (packet received) or TxDone (packet sent). Lets MCU sleep until notified!",
      mcuPinUno: "D2 (INT0)",
      mcuPinEsp32: "GPIO 2",
      voltage: "3.3V Logic",
      critical: true,
    },
    {
      id: "ant",
      pinNumber: 9,
      name: "ANT",
      type: "RF" as const,
      description: "50-ohm RF antenna terminal (spring coil, SMA connector, or U.FL).",
      mcuPinUno: "Attached Antenna",
      mcuPinEsp32: "Attached Antenna",
      voltage: "RF Power (+20 dBm)",
      critical: true,
    },
  ],
  warnings: [
    {
      title: "3.3V Logic Level Only",
      desc: "SX1278 inputs are NOT 5V tolerant. If connecting to a 5V Arduino Uno, you MUST use logic level shifters (or resistor dividers on MOSI, SCK, NSS, RESET), or you will destroy the chip's internal ESD protection diodes.",
    },
    {
      title: "Never Transmit Without Antenna",
      desc: "Transmitting RF energy without a 50Ω load causes 100% of the 100 mW (+20 dBm) energy to reflect directly back into the on-chip Power Amplifier (PA). The output transistors will cook and permanently destroy the transmitter within seconds.",
    },
  ],
  popularModules: [
    { name: "Semtech SX1276 / SX1278", desc: "The bare transceiver IC. 137MHz–1020MHz range, +20dBm PA." },
    { name: "HopeRF RFM95W", desc: "Gold-standard castellated SMD module, popular in Adafruit & SparkFun feathers." },
    { name: "Ai-Thinker Ra-02", desc: "Ultra-affordable ($3.50) breakout board with built-in spring or IPEX antenna connector." },
    { name: "UART Modules (e.g. RYLR896)", desc: "Contains an onboard STM32 MCU running AT firmware. Talk via UART AT+SEND commands instead of SPI!" },
  ],
};

// SLIDE 6: Demo and Code Walkthrough
export const SLIDE_6_DATA = {
  badge: "Embedded Firmware & Simulation",
  headlineItalic: "Sending bytes",
  headlineRest: "through thin air.",
  codeTabs: {
    sender: {
      name: "Transmitter (Sender.ino)",
      code: `#include <SPI.h>
#include <LoRa.h>

const int csPin = 5;      // NSS (Chip Select)
const int resetPin = 14;   // Hardware Reset
const int irqPin = 2;      // DIO0 Interrupt

void setup() {
  Serial.begin(115200);
  while (!Serial);

  LoRa.setPins(csPin, resetPin, irqPin);

  // Initialize at 433 MHz (or 868E6 / 915E6)
  if (!LoRa.begin(433E6)) {
    Serial.println("Starting LoRa failed! Check wiring.");
    while (1);
  }

  LoRa.setSpreadingFactor(9);      // SF7 to SF12
  LoRa.setSignalBandwidth(125E3);   // 125 kHz
  LoRa.setTxPower(17);              // 17 dBm (50 mW)
  Serial.println("LoRa Node A Transmitter Ready.");
}

void loop() {
  float soilMoisture = 42.5; // From analog capacitive probe
  
  Serial.print("Transmitting packet... ");
  LoRa.beginPacket();              // Open TX FIFO buffer
  LoRa.print("SOIL:");
  LoRa.print(soilMoisture);
  LoRa.print("%");
  LoRa.endPacket();                // Flush over RF & wait TxDone
  Serial.println("Sent!");

  delay(5000); // Sleep MCU between transmissions
}`,
      annotations: [
        { line: 2, text: "Includes the standard Sandeep Mistry Arduino LoRa driver library." },
        { line: 9, text: "Configures the microcontroller GPIO pins controlling NSS, RESET, and DIO0." },
        { line: 12, text: "LoRa.begin(433E6): Powers up SX1278 and locks PLL synthesizer to 433.00 MHz carrier." },
        { line: 17, text: "setSpreadingFactor(9): Tunes CSS chirp count to 512 chips/symbol for balanced range." },
        { line: 26, text: "LoRa.beginPacket(): Clears the 256-byte internal FIFO buffer on the SX1278." },
        { line: 30, text: "LoRa.endPacket(): Triggers radio state machine into TX mode, transmitting chirps until done." },
      ],
    },
    receiver: {
      name: "Receiver (Receiver.ino)",
      code: `#include <SPI.h>
#include <LoRa.h>

const int csPin = 5;
const int resetPin = 14;
const int irqPin = 2;

void setup() {
  Serial.begin(115200);
  while (!Serial);

  LoRa.setPins(csPin, resetPin, irqPin);

  if (!LoRa.begin(433E6)) {
    Serial.println("Receiver init failed!");
    while (1);
  }

  LoRa.setSpreadingFactor(9);
  LoRa.setSignalBandwidth(125E3);
  Serial.println("LoRa Node B Gateway Listening...");
}

void loop() {
  // Check if a packet has arrived in RX FIFO
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    Serial.print("Received packet: '");
    
    // Read payload bytes from FIFO over SPI
    while (LoRa.available()) {
      Serial.print((char)LoRa.read());
    }
    
    // Measure signal quality telemetry
    Serial.print("' | RSSI: ");
    Serial.print(LoRa.packetRssi());
    Serial.print(" dBm | SNR: ");
    Serial.print(LoRa.packetSnr());
    Serial.println(" dB");
  }
}`,
      annotations: [
        { line: 17, text: "Receiver must match EXACT carrier frequency (433MHz) and Spreading Factor (SF9) to decode!" },
        { line: 24, text: "LoRa.parsePacket(): Queries SX1278 RegIrqFlags over SPI to verify if RxDone has fired." },
        { line: 29, text: "LoRa.read(): Reads incoming ASCII bytes one by one from the 256-byte RX buffer." },
        { line: 34, text: "LoRa.packetRssi(): Received Signal Strength Indicator (e.g. -85 dBm is strong, -135 dBm is edge of range)." },
        { line: 36, text: "LoRa.packetSnr(): Signal to Noise Ratio. LoRa can decode packets with NEGATIVE SNR (signals buried below noise floor)!" },
      ],
    },
  },
  liveDemoHint: "Classroom Live Demo: Connect ESP32 nodes via USB Serial at 115200 baud to observe live RF packets.",
};

// SLIDE 7: Applications, Limitations and Wrap-up
export const SLIDE_7_DATA = {
  badge: "Summary & Real-World Impact",
  headlineItalic: "From soil",
  headlineRest: "to orbit.",
  farmerClosure: {
    title: "The Farmer's Problem: Solved.",
    body: "All 50 sensors across 200 acres now transmit directly to one simple gateway on the farmhouse roof. Powered by two AA batteries per node, lasting 3 years without battery swaps, and $0 in monthly carrier invoices.",
  },
  applications: [
    {
      title: "Smart Agriculture",
      desc: "Soil moisture probes, automated drip valves, livestock ear tag tracking, weather stations.",
      metric: "200+ Acres / 1 Gateway",
    },
    {
      title: "Smart Cities & Metering",
      desc: "Automated remote water & gas meter reads (AMR), streetlamp brightness schedules, trash bin sensors.",
      metric: "10-Year Battery Life",
    },
    {
      title: "Supply Chain & Cold Chain",
      desc: "Shipping container temperature logs, vaccine crate monitoring across warehouses and docks.",
      metric: "Deep Penetration",
    },
    {
      title: "Environmental Disaster Alert",
      desc: "River flood rise monitoring, forest wildfire smoke beacons, earthquake seismic tremors in mountains.",
      metric: "15+ km Line of Sight",
    },
    {
      title: "Direct Satellite-to-IoT (LoRa in Space)",
      desc: "Low-Earth Orbit (LEO) nanosatellites (FOSSA, Swarm) receiving LoRa chirps directly from ocean buoys.",
      metric: "500 km Up to Space",
    },
  ],
  limitations: [
    {
      title: "Tiny Data Bandwidth",
      detail: "0.3 to 5.5 kbps max. Never use for audio, video, photos, or firmware over-the-air updates without compression.",
    },
    {
      title: "Duty Cycle Regulations",
      detail: "In Europe (868 MHz), law limits devices to 1% duty cycle: you may only transmit 36 seconds per hour to prevent band congestion.",
    },
    {
      title: "High Latency & Half-Duplex",
      detail: "Packets take 50 ms to 1.5 seconds on-air. Not suitable for real-time control (drones, arcade gaming, robotic arms).",
    },
  ],
  keyTakeaways: [
    {
      number: "01",
      title: "CSS Modulation is the Secret",
      desc: "Chirp Spread Spectrum allows signals to be decoded up to 20 dB BELOW the ambient noise floor.",
    },
    {
      number: "02",
      title: "Trade Speed for Range",
      desc: "By giving up high bandwidth, LoRa achieves 10+ kilometers of range on milliwatts of battery power.",
    },
    {
      number: "03",
      title: "Simple SPI Interface",
      desc: "For embedded systems engineers, an SX1278 module is just standard SPI + an interrupt pin (DIO0) at 3.3V.",
    },
  ],
  quizQuestions: [
    {
      id: 1,
      question: "What physical modulation technique gives LoRa its extreme range and noise resistance?",
      options: [
        "Chirp Spread Spectrum (CSS)",
        "Frequency Shift Keying (FSK)",
        "Quadrature Amplitude Modulation (QAM)",
        "Orthogonal Frequency Division (OFDM)",
      ],
      correctIndex: 0,
      explanation: "LoRa uses Chirp Spread Spectrum (CSS), sweeping carrier frequency continuously like a bird chirp to survive high noise.",
    },
    {
      id: 2,
      question: "If your sensor is 12 km away behind dense trees and failing to connect, what should you do?",
      options: [
        "Lower the Spreading Factor to SF7 to send data faster",
        "Increase the Spreading Factor to SF12 to boost receiver sensitivity",
        "Switch to 2.4 GHz Wi-Fi for higher frequency penetration",
        "Increase payload size so the radio stays awake longer",
      ],
      correctIndex: 1,
      explanation: "Increasing Spreading Factor to SF12 provides maximum sensitivity (-137 dBm) and processing gain, overcoming foliage at the cost of airtime.",
    },
    {
      id: 3,
      question: "What is the most critical hardware rule when wiring an SX1278 module to an Arduino Uno?",
      options: [
        "Connect VCC directly to Arduino 5V for maximum range",
        "Never connect an antenna to avoid short circuits",
        "Use 3.3V logic levels only and ALWAYS attach an antenna before powering",
        "Invert the MISO and MOSI pins",
      ],
      correctIndex: 2,
      explanation: "SX1278 is strictly 3.3V logic (5V fries pins) and transmitting without a 50-ohm antenna reflects RF energy back, instantly cooking the Power Amplifier.",
    },
  ],
};
