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

## 🌐 Web Dashboard

The project includes a web dashboard for displaying:

- Water Level
- Water Percentage
- Sensor Distance
- Tank Status
- Rainfall
- Collection Status

The dashboard currently uses simulated sensor values for demonstration.

[Open Live Dashboard](https://subanthana-cse.github.io/Rainwater-Harvesting-IoT/)

## 🧪 Simulation

The Arduino circuit is simulated using Wokwi.
You can view and run the Arduino simulation here:

🔗 [Open Wokwi Simulation](https://wokwi.com/projects/476779840844201985)

## 📁 Project Structure

```text
Rainwater-Harvesting-IoT/
│
├── index.html
├── style.css
├── app.js
│
└── Arduino/
    ├── sketch.ino
    └── diagram.json
