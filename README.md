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

## 🧪 Simulation
The Arduino circuit is simulated using Wokwi.
You can view and run the Arduino simulation here:

🔗 [Open Wokwi Simulation](https://wokwi.com/projects/476779840844201985)

📁 Project Structure
Rainwater-Harvesting-IoT/ 
│ 
├── index.html 
├── style.css 
├── app.js 
│ 
└── Arduino/ 
    ├── sketch.ino 
    └── diagram.json
