# 💧 Rainwater Harvesting IoT

## IoT Based Water Level Monitoring System

An IoT-based smart rainwater harvesting monitoring system designed to monitor the water level of a storage tank using an ultrasonic sensor and Arduino UNO. The project also includes a web-based monitoring dashboard and an Arduino simulation using Wokwi.

---

## 📌 Project Overview

Rainwater harvesting is an effective method of conserving water by collecting and storing rainwater for future use. Manual monitoring of stored water levels can be inconvenient.

This project provides a smart water-level monitoring solution using an **Arduino UNO** and **HC-SR04 Ultrasonic Sensor**.

The sensor measures the distance between the sensor and the water surface. The Arduino calculates the water level and determines whether the tank is LOW, MEDIUM, or FULL.

The system uses LEDs to indicate the water level and a buzzer to provide an alert when the water level is critically low.

A web-based dashboard is also developed to visually display the water monitoring information.

---

## 🎯 Objectives

- Monitor the water level of a rainwater storage tank.
- Measure the distance between the ultrasonic sensor and water surface.
- Calculate the water level automatically.
- Calculate the water percentage.
- Identify LOW, MEDIUM, and FULL water levels.
- Provide LED-based water-level indication.
- Provide a buzzer alert for low water level.
- Display monitoring information through a web dashboard.
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
Water Percentage Calculation
Water Percentage = (Water Level / Tank Height) × 100

The calculated percentage is used to determine the current water status.

🚦 Water Level Status
Water Percentage	Status	Indicator
0% – 20%	LOW	🔴 Red LED + Buzzer
21% – 70%	MEDIUM	🟡 Yellow LED
71% – 100%	FULL	🟢 Green LED
🔌 Hardware Connections
HC-SR04 Ultrasonic Sensor
HC-SR04 Pin	Arduino UNO
VCC	5V
GND	GND
TRIG	D9
ECHO	D10
LED Connections
Component	Arduino Pin
Green LED	D2
Yellow LED	D3
Red LED	D4

Each LED is connected through a 220Ω resistor.

Buzzer Connection
Buzzer Pin	Arduino UNO
Positive	D5
Negative	GND
🔄 System Workflow
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
💻 Web Dashboard

The project includes a responsive web dashboard for monitoring the water storage system.

The dashboard displays:

💧 Water Level
📊 Water Percentage
📡 Sensor Distance
⚡ Water Status
💦 Visual Water Tank Level
⚠️ System Alert
🌧️ Rainfall Information
🚰 Collection Status
🕒 Last Updated Time

The dashboard also provides sensor simulation buttons to demonstrate different water-level conditions.

🧪 Wokwi Arduino Simulation

The Arduino circuit is simulated using Wokwi.

The simulation contains:

Arduino UNO
HC-SR04 Ultrasonic Sensor
Green LED
Yellow LED
Red LED
Buzzer
220Ω Resistors

The Serial Monitor displays:

Distance
Water Level
Percentage
Status
🔗 Simulation Link

👉 Open My Wokwi Simulation

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
📂 File Description
index.html

Contains the structure and layout of the web dashboard.

style.css

Controls the dashboard design, colors, cards, water tank visualization, buttons, and responsive layout.

app.js

Contains the water-level calculation, percentage calculation, status detection, alerts, rainfall simulation, and dashboard updates.

Arduino/sketch.ino

Contains the Arduino C/C++ program used to read the HC-SR04 sensor and control the LEDs and buzzer.

Arduino/diagram.json

Contains the Wokwi circuit configuration, components, and their connections.

📊 Example Calculation

Suppose the ultrasonic sensor measures:

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
🌱 Applications
Rainwater harvesting systems
Smart water tanks
Water conservation systems
IoT-based water monitoring
Smart homes
Sustainable water management
Educational IoT projects
🌍 Benefits
Reduces manual water-level checking.
Provides quick water-level information.
Gives an alert when the water level is low.
Encourages rainwater conservation.
Provides a simple and low-cost monitoring approach.
Can be extended into a real IoT system using Wi-Fi connectivity.
🔮 Future Enhancements

The project can be further enhanced by:

Adding ESP8266 or ESP32 Wi-Fi connectivity.
Connecting the system to a cloud platform.
Sending real-time sensor data to the web dashboard.
Adding mobile notifications.
Adding automatic water pump control.
Adding water-quality sensors.
Storing historical water-level data.
Adding real rainfall sensors.
Developing a mobile application.
⚠️ Current Implementation

The web dashboard currently uses simulated sensor values for demonstration.

The Arduino circuit is separately simulated using Wokwi.

The dashboard and Wokwi simulation are currently not directly connected for live sensor data exchange.

👩‍💻 Project Type

IoT | Arduino | Web Dashboard | Wokwi Simulation | Rainwater Harvesting | Sustainable Water Management

📜 Conclusion

The Rainwater Harvesting IoT project demonstrates how sensors, microcontrollers, simulation, and web technologies can be combined to monitor stored rainwater.

The system measures water level, calculates the water percentage, identifies the tank status, provides LED indications, and generates a buzzer alert when the water level is low.

The project provides a simple approach to smart water-level monitoring and promotes efficient and sustainable water management.

🔗 Project Links
🧪 Wokwi Simulation

👉 Open My Wokwi Simulation

🌐 Web Dashboard

GitHub Pages Dashboard:
Add your GitHub Pages link here

💻 GitHub Repository

Add your GitHub Repository link here

⭐ Keywords

IoT Arduino Rainwater Harvesting Water Level Monitoring HC-SR04 Wokwi Web Dashboard JavaScript GitHub Pages Water Conservation Sustainable Living
