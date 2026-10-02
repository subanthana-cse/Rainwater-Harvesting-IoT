# 💧 Rainwater Harvesting IoT

## IoT Based Water Level Monitoring System

This project is an IoT-based rainwater harvesting system designed to monitor water level in a storage tank.

## 🔧 Components Used

- Arduino UNO
- HC-SR04 Ultrasonic Sensor
- Green LED
- Yellow LED
- Red LED
- Buzzer
- 220Ω Resistors

## ⚙️ Working

The HC-SR04 ultrasonic sensor measures the distance between the sensor and the water surface.

Water Level = Tank Height - Sensor Distance

The system classifies the water level into:

- LOW
- MEDIUM
- FULL

LED indicators and a buzzer provide status alerts.

## 📊 Water Level Status

| Water Level | Status | Indicator |
|---|---|---|
| 0% – 20% | LOW | 🔴 Red LED + Buzzer |
| 21% – 70% | MEDIUM | 🟡 Yellow LED |
| 71% – 100% | FULL | 🟢 Green LED |

## 📐 Water Percentage Calculation

Water Percentage = (Water Level / Tank Height) × 100

The tank height used in this project is **95 cm**.

## 🔌 Hardware Connections

| Component | Arduino Pin |
|---|---|
| HC-SR04 TRIG | D9 |
| HC-SR04 ECHO | D10 |
| Green LED | D2 |
| Yellow LED | D3 |
| Red LED | D4 |
| Buzzer | D5 |

The HC-SR04 VCC is connected to 5V and GND is connected to GND.

## 🔄 System Workflow

```text
HC-SR04 Sensor
      ↓
Measure Distance
      ↓
Arduino UNO
      ↓
Calculate Water Level
      ↓
Calculate Percentage
      ↓
Determine Status
      ↓
LOW / MEDIUM / FULL
      ↓
LED + Buzzer Alert
🧪 Simulation

The Arduino circuit is simulated using Wokwi.

The simulation contains:

Arduino UNO
HC-SR04 Ultrasonic Sensor
Green LED
Yellow LED
Red LED
Buzzer
220Ω Resistors
🔗 Wokwi Simulation Link

👉 Open Wokwi Simulation

🌐 Web Dashboard

The project includes a web dashboard for displaying:

Water Level
Water Percentage
Sensor Distance
Tank Status
Rainfall
Collection Status

The dashboard currently uses simulated sensor values for demonstration.

📁 Project Structure
Rainwater-Harvesting-IoT/
│
├── index.html
├── style.css
├── app.js
├── README.md
│
└── Arduino/
    ├── sketch.ino
    └── diagram.json
🛠️ Technologies Used
Arduino UNO
C/C++
HTML
CSS
JavaScript
Wokwi
GitHub
GitHub Pages
🌱 Applications
Rainwater harvesting systems
Smart water tanks
Water conservation systems
IoT-based water monitoring
Smart home applications
Educational IoT projects
🌍 Benefits
Reduces manual water-level monitoring.
Provides quick information about the tank level.
Gives an alert when the water level is low.
Supports efficient water management.
Promotes rainwater conservation.
🔮 Future Enhancements
ESP32 or ESP8266 Wi-Fi connectivity
Cloud-based monitoring
Real-time sensor data
Mobile notifications
Automatic water pump control
Historical water-level data
Mobile application
⚠️ Current Implementation

The web dashboard currently uses simulated sensor values for demonstration.

The Arduino circuit is separately simulated using Wokwi.

The dashboard and Wokwi simulation are currently not directly connected for live sensor data exchange.

📜 Conclusion

The Rainwater Harvesting IoT project demonstrates the use of sensors, Arduino, simulation, and web technologies for smart water-level monitoring.

The system measures the water level, calculates the water percentage, identifies the tank status, and provides LED and buzzer alerts.
