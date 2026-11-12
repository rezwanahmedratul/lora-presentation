// Ultra-minimal presentation data for Apple Keynote & Linear aesthetic.
// Highly condensed, editorial copy with zero clutter.

export const PRESENTATION_METADATA = {
  courseTitle: "Microprocessor & Embedded Systems",
  topic: "LoRa Wireless Module",
  totalSlides: 7,
};

// SLIDE 1: The Wireless Trilemma
export const SLIDE_1_DATA = {
  kicker: "The Fundamental Constraint",
  headlineItalic: "Range. Battery. Cost.",
  headlineRest: "Pick two.",
  subtitle:
    "For decades, wireless engineering was bound by a brutal trilemma: high speed killed batteries, long range required cellular subscriptions, and low power meant bedroom range.",
  trilemmaCards: [
    {
      name: "Wi-Fi",
      tagline: "High bandwidth, zero range",
      flaw: "Drains batteries in days. Cannot penetrate 100 meters of soil and foliage.",
      range: "50 m",
      battery: "Days",
      cost: "Cheap routers",
      failsBecause: "Battery Drain",
    },
    {
      name: "Bluetooth",
      tagline: "Low power, bedroom range",
      flaw: "Vanishes beyond 20 meters. Designed for audio and wearables, not wide acreage.",
      range: "15 m",
      battery: "1 Year",
      cost: "Low cost",
      failsBecause: "Tiny Range",
    },
    {
      name: "Cellular 4G",
      tagline: "Long range, heavy tax",
      flaw: "Needs SIM cards, monthly carrier subscriptions, and heavy peak transmit power.",
      range: "10 km",
      battery: "Months",
      cost: "$$$ / SIM",
      failsBecause: "High Cost & Power",
    },
  ],
  resolution: "Until Chirp Spread Spectrum changed the rules.",
};

// SLIDE 2: LoRa: The Anomaly
export const SLIDE_2_DATA = {
  kicker: "The Breakthrough",
  headlineItalic: "Miles of range.",
  headlineRest: "A decade of battery.",
  subtitle:
    "LoRa achieves the impossible by trading speed for distance. Sending 4-byte sensor readings instead of megabytes unlocks kilometers of line-of-sight on a coin cell.",
  stats: [
    { value: "15+", unit: "km", label: "Rural Line of Sight", sub: "Penetrates concrete and foliage" },
    { value: "10+", unit: "Years", label: "Battery Lifetime", sub: "On simple AA or coin cells" },
    { value: "$0", unit: "Fees", label: "License-Free Bands", sub: "433 / 868 / 915 MHz ISM" },
  ],
  speedComparison: {
    title: "The Trade-Off: Bytes, Not Megabytes",
    quote:
      "A moisture reading is just 4 bytes (e.g. 42.5%). Why burn watts broadcasting megabytes when bytes are all you need?",
    loraRate: "0.3 – 5.5 kbps",
    wifiRate: "100+ Mbps",
  },
};

// SLIDE 3: The Physics of the Chirp
export const SLIDE_3_DATA = {
  kicker: "Physical Layer (PHY)",
  headlineItalic: "A signal",
  headlineRest: "that sweeps.",
  subtitle:
    "Chirp Spread Spectrum (CSS) continuously sweeps frequency over time. Like a bird whistle cutting through wind, chirps survive up to 20 dB below the ambient noise floor.",
  spreadingFactors: [
    { sf: 7, dataRate: "5.47 kbps", reach: "3 km", airtime: "41 ms", desc: "Fastest telemetry, low latency" },
    { sf: 8, dataRate: "3.12 kbps", reach: "5 km", airtime: "72 ms", desc: "Suburban telemetry" },
    { sf: 9, dataRate: "1.76 kbps", reach: "8 km", airtime: "144 ms", desc: "Balanced rural coverage" },
    { sf: 10, dataRate: "0.98 kbps", reach: "10 km", airtime: "288 ms", desc: "Deep foliage penetration" },
    { sf: 11, dataRate: "0.54 kbps", reach: "12 km", airtime: "578 ms", desc: "Urban concrete basements" },
    { sf: 12, dataRate: "0.29 kbps", reach: "15+ km", airtime: "991 ms", desc: "Maximum sensitivity (-137 dBm)" },
  ],
  goldenRule: "Higher Spreading Factor = Longer Distance, Slower Airtime.",
};

// SLIDE 4: Radio vs Network
export const SLIDE_4_DATA = {
  kicker: "Architecture Stack",
  headlineItalic: "LoRa is the voice.",
  headlineRest: "LoRaWAN is the network.",
  subtitle:
    "LoRa is the physical radio modulation silicon (PHY). LoRaWAN is the open global networking protocol, gateway infrastructure, and AES-128 cloud routing on top.",
  pipeline: [
    { step: "01", name: "End Node", desc: "Sensor + SX1278 transceiver", tech: "RF Chirp" },
    { step: "02", name: "Gateway", desc: "Multi-channel concentrator", tech: "Packet Forward" },
    { step: "03", name: "Network Server", desc: "Deduplication & AES keys", tech: "ChirpStack / TTN" },
    { step: "04", name: "Application", desc: "REST / MQTT Dashboard", tech: "Cloud Analytics" },
  ],
  classificationItems: [
    { id: "c1", label: "Chirp Modulation", bucket: "lora" as const },
    { id: "c2", label: "AES-128 Encryption", bucket: "lorawan" as const },
    { id: "c3", label: "Spreading Factor", bucket: "lora" as const },
    { id: "c4", label: "Cloud Gateways", bucket: "lorawan" as const },
    { id: "c5", label: "SX1278 Silicon", bucket: "lora" as const },
    { id: "c6", label: "OTAA Activation", bucket: "lorawan" as const },
  ],
};

// SLIDE 5: The Silicon (SX1278)
export const SLIDE_5_DATA = {
  kicker: "Embedded Hardware",
  headlineItalic: "Engineering",
  headlineRest: "simplicity.",
  subtitle:
    "The Semtech SX1278 / Ai-Thinker Ra-02 transceiver interfaces with any microcontroller over a standard 4-wire SPI bus and a single hardware interrupt line.",
  pins: [
    { id: "vcc", name: "3.3V (VCC)", function: "Power (2.0V – 3.7V)", uno: "3.3V", esp32: "3V3" },
    { id: "gnd", name: "GND", function: "System ground", uno: "GND", esp32: "GND" },
    { id: "nss", name: "NSS", function: "SPI Chip Select", uno: "D10", esp32: "GPIO 5" },
    { id: "sck", name: "SCK", function: "SPI Clock", uno: "D13", esp32: "GPIO 18" },
    { id: "mosi", name: "MOSI", function: "SPI Master Out", uno: "D11", esp32: "GPIO 23" },
    { id: "miso", name: "MISO", function: "SPI Master In", uno: "D12", esp32: "GPIO 19" },
    { id: "dio0", name: "DIO0", function: "Rx/Tx Done Interrupt", uno: "D2", esp32: "GPIO 2", critical: true },
    { id: "ant", name: "ANT", function: "50Ω RF Antenna", uno: "Antenna", esp32: "Antenna", critical: true },
  ],
  warnings: [
    { title: "3.3V Logic Level Only", text: "Inputs are not 5V tolerant. Use level shifters with 5V Arduino Uno." },
    { title: "Mandatory Antenna", text: "Never power or transmit without an antenna attached, or the Power Amplifier burns out." },
  ],
};

// SLIDE 6: Live Over-The-Air Transmission
export const SLIDE_6_DATA = {
  kicker: "Virtual Transceiver",
  headlineItalic: "Transmit",
  headlineRest: "across the void.",
  subtitle:
    "Simulate an end-to-end packet transmission between two embedded nodes. Observe real-time log-distance path loss, RSSI attenuation, and SNR.",
  arduinoCode: `// Arduino C++ Transmitter
#include <SPI.h>
#include <LoRa.h>

void setup() {
  LoRa.begin(433E6);          // 433 MHz carrier
  LoRa.setSpreadingFactor(9);  // SF9 (512 chips/sym)
}

void loop() {
  LoRa.beginPacket();
  LoRa.print("SOIL: 42.5%");    // 10-byte payload
  LoRa.endPacket();            // Transmit chirps
  delay(5000);                 // Sleep MCU
}`,
};

// SLIDE 7: Connecting the Earth
export const SLIDE_7_DATA = {
  kicker: "The Future & Conclusion",
  headlineItalic: "Connecting",
  headlineRest: "the untouched 80%.",
  subtitle:
    "From agricultural valleys and wildlife telemetry to Low Earth Orbit nanosatellites receiving LoRa packets from ocean buoys.",
  verticals: [
    { title: "Precision Agriculture", metric: "200+ Acres", detail: "Soil probes & automated irrigation with zero cellular bills." },
    { title: "Smart Infrastructure", metric: "10-Yr Battery", detail: "Automated municipal water, gas meters, and structural monitors." },
    { title: "Direct Satellite IoT", metric: "500 km Orbit", detail: "Nanosatellites decoding LoRa chirps directly from maritime sensors." },
  ],
  takeaways: [
    "1. Chirp Spread Spectrum decodes packets up to 20 dB below thermal noise.",
    "2. Trading throughput for range enables 10+ years of battery lifetime.",
    "3. Interfaces with any microcontroller over a standard 3.3V SPI bus.",
  ],
};
