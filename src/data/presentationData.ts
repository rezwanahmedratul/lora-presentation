// Presentation data file following the new user outline strictly.
// All copy, questions, hardware specs, and quiz data are centralized here.

export const PRESENTATION_METADATA = {
  courseTitle: "Microprocessor, Microcontroller & Embedded Systems",
  topic: "LoRa Wireless Module",
  totalSlides: 7,
};

// SLIDE 1: The Problem – Connecting Things Wirelessly
export const SLIDE_1_DATA = {
  slideNumber: "01",
  title: "The Problem",
  subtitle: "Connecting Things Wirelessly",
  points: [
    "Imagine monitoring a farm, forest, or remote area.",
    "Wi-Fi has limited range (typically under 100 meters).",
    "Mobile networks can be expensive or completely unavailable in remote locations.",
    "What if devices could communicate over several kilometers using very little power?",
  ],
  interactiveQuestion: "How would you send data from a sensor 2 km away without Wi-Fi?",
  interactiveOptions: [
    { label: "Run a 2 km cable through dirt", feedback: "Impractical, costly, and easily cut by tractors or animals.", correct: false },
    { label: "Use Bluetooth or standard Wi-Fi", feedback: "Range drops off after 10–50 meters. Cannot reach 2 km.", correct: false },
    { label: "Long-Range Low-Power Radio (LoRa)", feedback: "Correct! LoRa easily bridges 2 to 15+ km on small batteries with zero wiring.", correct: true },
    { label: "Walk with a USB drive daily", feedback: "Manual, slow, and impossible for real-time automated decisions.", correct: false },
  ],
};

// SLIDE 2: What is LoRa?
export const SLIDE_2_DATA = {
  slideNumber: "02",
  title: "What is LoRa?",
  subtitle: "Long Range, Low Power Wireless Technology",
  points: [
    "LoRa stands for Long Range.",
    "It is a wireless communication technology.",
    "Designed for long-distance communication with low power consumption.",
    "Commonly used in IoT (Internet of Things).",
    "A LoRa module is a hardware device that enables LoRa communication.",
  ],
  stats: [
    { label: "Range", value: "2–15+ km", desc: "Long-distance wireless coverage" },
    { label: "Battery Life", value: "Years", desc: "Low power consumption on AA/coin cells" },
    { label: "Cost", value: "$0 Monthly", desc: "License-free sub-GHz ISM radio bands" },
  ],
  interactiveQuestion: "What matters more for a remote sensor: high speed or long battery life?",
  speedVsBatteryOptions: [
    {
      choice: "High Speed (Megabytes / Streaming)",
      result: "Wrong priority for IoT. High speed drains batteries in days. Moisture or temperature data is only a few bytes!",
      correct: false,
    },
    {
      choice: "Long Battery Life (Years of Operation)",
      result: "Correct! A remote sensor only sends tiny data like '42%'. Trading high speed for 10 years of battery life is the core philosophy of LoRa.",
      correct: true,
    },
  ],
};

// SLIDE 3: How Does LoRa Work?
export const SLIDE_3_DATA = {
  slideNumber: "03",
  title: "How Does LoRa Work?",
  subtitle: "Chirp Spread Spectrum (CSS) Explained Simply",
  points: [
    "Radio Frequency (RF) communication.",
    "Chirp Spread Spectrum (CSS) modulation.",
    "Information is transmitted through radio waves.",
    "LoRa uses special frequency-changing signals called chirps.",
    "This helps receivers detect signals even when they are weak and buried in noise.",
  ],
  analogy: "Like a bird whistling a rising pitch that can be heard across a noisy forest, LoRa sweeps radio frequencies so receivers decode data below the noise floor.",
  cssSteps: [
    { label: "Up-Chirp", desc: "Frequency steadily increases from low to high over time" },
    { label: "Data Encoding", desc: "Shifting the chirp starting point encodes digital 1s and 0s" },
    { label: "Noise Immunity", desc: "Continuous frequency sweep prevents jamming and interference" },
  ],
};

// SLIDE 4: LoRa Module and Its Connection
export const SLIDE_4_DATA = {
  slideNumber: "04",
  title: "LoRa Module & Connection",
  subtitle: "Hardware & Microcontroller Integration",
  points: [
    "Popular modules: SX1278, SX1276, RFM95.",
    "Main components: antenna, RF transceiver chip, and connection pins.",
    "Works seamlessly with Arduino and ESP32.",
    "Uses SPI communication between the microcontroller and the LoRa module.",
  ],
  spiPins: [
    { name: "VCC", role: "Power Supply", voltage: "3.3V DC (Never 5V!)", isSPI: false },
    { name: "GND", role: "Ground", voltage: "0V Reference", isSPI: false },
    { name: "NSS", role: "Slave Select (Chip Select)", voltage: "Active LOW SPI", isSPI: true },
    { name: "SCK", role: "Serial Clock", voltage: "SPI Clock from MCU", isSPI: true },
    { name: "MOSI", role: "Master Out Slave In", voltage: "MCU writes to LoRa", isSPI: true },
    { name: "MISO", role: "Master In Slave Out", voltage: "MCU reads from LoRa", isSPI: true },
  ],
  mcuConnections: [
    { pin: "VCC", arduino: "3.3V", esp32: "3V3" },
    { pin: "GND", arduino: "GND", esp32: "GND" },
    { pin: "NSS (CS)", arduino: "Pin 10", esp32: "GPIO 5" },
    { pin: "SCK", arduino: "Pin 13", esp32: "GPIO 18" },
    { pin: "MOSI", arduino: "Pin 11", esp32: "GPIO 23" },
    { pin: "MISO", arduino: "Pin 12", esp32: "GPIO 19" },
  ],
};

// SLIDE 5: How Two LoRa Devices Communicate
export const SLIDE_5_DATA = {
  slideNumber: "05",
  title: "Device Communication",
  subtitle: "End-to-End Left-to-Right Signal Flow",
  steps: [
    { id: 1, name: "Sensor", desc: "Reads temperature / soil probe", icon: "sensor" },
    { id: 2, name: "Arduino (TX)", desc: "Generates formatted message", icon: "mcu" },
    { id: 3, name: "LoRa TX", desc: "Transmitter encodes into chirps via SPI", icon: "lora" },
    { id: 4, name: "Radio Waves", desc: "Travels kilometers through air (433MHz)", icon: "waves" },
    { id: 5, name: "LoRa RX", desc: "Receiver captures incoming RF chirps", icon: "lora" },
    { id: 6, name: "Arduino (RX)", desc: "Reads incoming payload over SPI", icon: "mcu" },
    { id: 7, name: "Display", desc: "Outputs message on OLED / Serial screen", icon: "display" },
  ],
  demoExchange: {
    node1: "Hello from Node 1",
    node2: "Received by Node 2",
    telemetry: { rssi: "-86 dBm", snr: "+8.4 dB", freq: "433.00 MHz" },
  },
};

// SLIDE 6: Real-World Applications and Limitations
export const SLIDE_6_DATA = {
  slideNumber: "06",
  title: "Applications & Limitations",
  subtitle: "Where LoRa Thrives and Where It Does Not",
  applications: [
    { title: "Smart Agriculture", desc: "Soil moisture probes, weather stations, smart irrigation across vast crop acreage." },
    { title: "Water-Level Monitoring", desc: "Flood detection in remote rivers, dam reservoirs, and municipal drainage." },
    { title: "Smart Parking", desc: "Wireless magnetic ground sensors detecting car presence in urban garages." },
    { title: "Environmental Monitoring", desc: "Wildfire smoke beacons, mountain seismic sensors, air quality meters." },
    { title: "Industrial IoT", desc: "Remote gas cylinder pressure, factory utility meters, valve status telemetry." },
  ],
  limitations: [
    { title: "Low Data Rate", desc: "Transmits bytes, not megabytes (~0.3 to 5.5 kbps typical)." },
    { title: "No Video or Audio", desc: "Cannot stream video feeds, voice audio, or large photo files." },
    { title: "Regional Frequency Restrictions", desc: "433 MHz in Asia, 868 MHz in Europe, 915 MHz in the Americas." },
    { title: "Environmental Interference", desc: "Signal range depends on hills, concrete buildings, and antenna height." },
  ],
  interactiveQuestion: "Which technology would you choose for monitoring soil moisture across a large farm?",
  farmTechChoices: [
    { name: "Wi-Fi", why: "Range is too short (dies after 100 meters). Need cables and power out in the mud.", correct: false },
    { name: "Bluetooth", why: "Only reaches ~10 to 30 meters. Completely unusable for a multi-acre farm.", correct: false },
    { name: "LoRa", why: "Correct! One central receiver covers kilometers of sensors running years on small batteries.", correct: true },
    { name: "5G Cellular", why: "Needs SIM cards, monthly bills per sensor, and drains small batteries quickly.", correct: false },
  ],
};

// SLIDE 7: Mini Demonstration, Quiz and Conclusion
export const SLIDE_7_DATA = {
  slideNumber: "07",
  title: "Demonstration & Quiz",
  subtitle: "Interactive Recap & Knowledge Check",
  recapPoints: [
    "LoRa enables long-range, low-power wireless communication.",
    "It is ideal for IoT and embedded systems where battery life and range matter most.",
    "Two LoRa modules easily exchange sensor messages over radio waves via SPI.",
  ],
  quizQuestions: [
    {
      id: 1,
      question: "Does LoRa prioritize range or data speed?",
      options: ["Range and Battery Life", "Data Speed (Mbps)"],
      correctIndex: 0,
      explanation: "LoRa trades high data speed for extreme range (kilometers) and multi-year battery life.",
    },
    {
      id: 2,
      question: "Which communication interface connects SX1278 to Arduino?",
      options: ["SPI (Serial Peripheral Interface)", "I2C (Inter-Integrated Circuit)", "USB", "CAN Bus"],
      correctIndex: 0,
      explanation: "SX1278 uses a high-speed SPI bus (MOSI, MISO, SCK, NSS) to talk to the microcontroller.",
    },
    {
      id: 3,
      question: "Can LoRa transmit video efficiently?",
      options: ["Yes, up to 1080p 60fps", "No, it only transmits small sensor data bytes"],
      correctIndex: 1,
      explanation: "LoRa bandwidth is limited to ~0.3 to 5.5 kbps, which is perfect for sensor readings but cannot stream video.",
    },
  ],
};
