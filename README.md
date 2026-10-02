# 💧 Rainwater Harvesting IoT

## IoT Based Water Level Monitoring System

An IoT-based smart rainwater harvesting monitoring system designed to monitor the water level of a storage tank using an ultrasonic sensor and Arduino UNO. The project also includes a web-based monitoring dashboard and an Arduino simulation using Wokwi.

---

## 📌 Project Overview

Rainwater harvesting is an effective method of conserving water by collecting and storing rainwater for future use. Manual monitoring of the stored water level can be inconvenient.

This project provides a smart water-level monitoring solution using an **Arduino UNO** and **HC-SR04 ultrasonic sensor**.

The sensor measures the distance between the sensor and the water surface. The Arduino calculates the water level and determines whether the tank is LOW, MEDIUM, or FULL.

The system uses LEDs to indicate the water level and a buzzer to provide an alert when the water level is critically low.

A web dashboard is also developed to visually display the monitoring information.

---

## 🎯 Objectives

- Monitor the water level of a rainwater storage tank.
- Measure the distance between the ultrasonic sensor and water surface.
- Calculate the water level automatically.
- Calculate the water percentage.
- Identify LOW, MEDIUM, and FULL water levels.
- Provide LED-based status indication.
- Provide a buzzer alert for low water level.
- Display water monitoring information through a web dashboard.
- Simulate the Arduino circuit using Wokwi.
- Promote smart water management and sustainable living.

---

## 🛠️ Technologies Used

### Hardware

- Arduino UNO
- HC-SR04 Ultrasonic Sensor
- Green LED
- Yellow LED
- Red LED
- Buzzer
- 220Ω Resistors

### Software

- HTML
- CSS
- JavaScript
- Arduino C/C++
- Wokwi Simulator
- GitHub
- GitHub Pages

---

## ⚙️ Working Principle

The HC-SR04 ultrasonic sensor measures the distance from the sensor to the surface of the water.

The tank height used in this project is **95 cm**.

### Water Level Calculation

```text
Water Level = Tank Height - Sensor Distance
Water Percentage = (Water Level / Tank Height) × 100

HC-SR04 Ultrasonic Sensor
          ↓
    Measure Distance
          ↓
      Arduino UNO
          ↓
   Calculate Water Level
          ↓
 Calculate Water Percentage
          ↓
 Determine Water Status
          ↓
 ┌────────┼─────────┐
 ↓        ↓         ↓
LOW     MEDIUM     FULL
 ↓        ↓         ↓
Red     Yellow     Green
LED      LED        LED
 ↓
Buzzer Alert

Distance
Water Level
Percentage
Status

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

#example
Distance = 22 cm

Tank height:

95 cm

Water level:

95 - 22 = 73 cm

Water percentage:

(73 / 95) × 100 ≈ 77%

Therefore:

Status = FULL
Green LED = ON
Buzzer = OFF

🧪 Wokwi Arduino Simulation

You can view and run the Arduino simulation here:

🔗 [Open Wokwi Simulation](https://wokwi.com/projects/476779840844201985)

#keywords
IoT Arduino Rainwater Harvesting Water Level Monitoring HC-SR04 Wokwi Web Dashboard JavaScript GitHub Pages Water Conservation Sustainable Living
