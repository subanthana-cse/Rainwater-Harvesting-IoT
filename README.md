Rainwater Harvesting IoT

IoT-Based Rainwater Harvesting and Water Level Monitoring System

📌 Project Overview

The Rainwater Harvesting IoT System is a smart water monitoring project designed to monitor the water level in a rainwater storage tank. It uses an ultrasonic sensor to measure the distance between the sensor and the water surface.

The measured distance is used to calculate the water level and water percentage. LED indicators and a buzzer provide alerts based on the tank status.

A web-based dashboard displays water monitoring information and provides options for viewing historical readings and ThingSpeak data.

Live Dashboard: https://subanthana-cse.github.io/Rainwater-Harvesting-IoT/

GitHub Repository: https://github.com/subanthana-cse/Rainwater-Harvesting-IoT

---

🎯 Objectives

- To monitor the water level in a rainwater storage tank.
- To calculate the water level and percentage automatically.
- To identify LOW, MEDIUM, and FULL tank conditions.
- To provide visual and sound alerts using LEDs and a buzzer.
- To display water monitoring information through a web dashboard.
- To demonstrate how IoT technology can support efficient rainwater management.

🔧 Hardware Components

Component| Purpose
Arduino UNO| Processes sensor readings and controls outputs
HC-SR04 Ultrasonic Sensor| Measures the distance to the water surface
Green LED| Indicates a high or full water level
Yellow LED| Indicates a medium water level
Red LED| Indicates a low water level
Buzzer| Provides an audible alert for a low water level
220Ω Resistors| Limit current through the LEDs
Breadboard and jumper wires| Connect the circuit components

💻 Software and Technologies

- Arduino IDE / Arduino C++ – For writing and executing the microcontroller program.
- Wokwi – For simulating the circuit and testing the system.
- HTML – For creating the dashboard structure.
- CSS – For designing and styling the dashboard.
- JavaScript – For dashboard updates, data display, and graph interactions.
- GitHub – For storing the project source code.
- GitHub Pages – For hosting the web dashboard.
- ThingSpeak – For cloud-based IoT data storage and visualization when the connection is configured.

⚙️ Working Principle

1. The HC-SR04 ultrasonic sensor sends an ultrasonic pulse towards the water surface.
2. The sensor measures the time taken for the reflected pulse to return.
3. The Arduino calculates the distance between the sensor and the water surface.
4. The water level and percentage are calculated using the tank height.
5. The system identifies the tank status as LOW, MEDIUM, or FULL.
6. The corresponding LED and buzzer indicate the water status.
7. The web dashboard displays monitoring information and graphs using the available data source.

📐 Water Level Calculation

Water Level

Water Level = Tank Height − Sensor Distance

Water Percentage

Water Percentage = (Water Level / Tank Height) × 100

For example, if the tank height is 100 cm and the sensor measures a distance of 30 cm:

- Water Level = 100 − 30 = 70 cm
- Water Percentage = (70 / 100) × 100 = 70%

These calculations assume the sensor is positioned at the top of the tank and the tank height is configured correctly.

🚦 Water Level Status and Alerts

Water Percentage| Tank Status| Indicator
0%–20%| LOW| Red LED + Buzzer
21%–70%| MEDIUM| Yellow LED
71%–100%| FULL| Green LED

The system uses these thresholds to identify the water level condition. The corresponding indicator is activated according to the programmed logic.

🌐 Web Dashboard

The project includes a web-based dashboard for displaying water monitoring information.

Dashboard link: https://subanthana-cse.github.io/Rainwater-Harvesting-IoT/

Dashboard Features

- Water Level: Displays the calculated water level in centimetres.
- Water Percentage: Shows the percentage of water in the tank.
- Sensor Distance: Displays the measured distance from the sensor to the water surface.
- Tank Status: Indicates whether the tank is LOW, MEDIUM, or FULL.
- LED and Buzzer Status: Displays the indicator and alert status.
- Reading History: Provides a graph for viewing recent water-level percentage readings.
- ThingSpeak Graph: Provides a section for visualizing water-level data from ThingSpeak.
- Data Source Options: Includes Live (bridge), Paste Serial, Demo, and ThingSpeak options.

Current implementation note: The dashboard supports demonstration data and different data-source options. Live sensor monitoring requires the relevant connection to be configured and running. The dashboard may display “Not connected” when no live data source is connected.

☁️ IoT and ThingSpeak Integration

ThingSpeak is an IoT cloud platform that can store and visualize sensor data.

The planned data fields for the Rainwater Tank channel are:

Field| Description
Field 1 – Distance_cm| Sensor-to-water distance in centimetres
Field 2 – Level_cm| Calculated water level
Field 3 – Level_percent| Water level percentage
Field 4 – Status_code| Numeric code representing the tank status

Once the data connection is configured, the monitoring program can send sensor readings to ThingSpeak using the channel's Write API Key. The dashboard can then retrieve the stored readings for visualization.

Note: Cloud data transmission and live monitoring should be marked as operational only after the connection has been tested successfully.

🧪 Simulation

The Arduino circuit can be tested using Wokwi before implementing it with physical components.

Wokwi Simulation: https://wokwi.com/projects/476779840844201985

Simulation helps verify the sensor calculation, LED indicators, buzzer logic, and overall circuit behaviour.

📁 Project Structure

Rainwater-Harvesting-IoT/
│
├── Arduino/
│ ├── sketch.ino
│ └── diagram.json
│
├── index.html
├── style.css
├── app.js
└── README.md

- "Arduino/sketch.ino" – Arduino program for sensor measurement and status alerts.
- "Arduino/diagram.json" – Wokwi circuit configuration.
- "index.html" – Dashboard layout and structure.
- "style.css" – Dashboard styling and layout.
- "app.js" – Dashboard data handling and display logic.
- "README.md" – Project documentation.

▶️ How to Run the Project

Step 1: Open the Simulation

Open the Wokwi simulation link and start the circuit simulation.

Step 2: Test the Sensor

Observe the sensor distance and verify the calculated water level.

Step 3: Check the Indicators

Verify that the LEDs and buzzer respond according to the programmed water-level thresholds.

Step 4: Open the Dashboard

Visit the GitHub Pages dashboard to view the monitoring interface.

Step 5: Configure Live Data

Select the appropriate dashboard data source and configure the required serial bridge or ThingSpeak connection before expecting real sensor readings.

🌱 Applications

- Rainwater storage tank monitoring.
- Residential rainwater harvesting systems.
- Schools and college campuses.
- Small-scale water storage facilities.
- Water conservation and management projects.
- Educational IoT and embedded-system demonstrations.

🔮 Future Enhancements

- Integrate a physical water-level sensor with the dashboard.
- Enable reliable real-time cloud data transmission.
- Add rainfall measurement using a suitable rain sensor.
- Generate notifications when the water level is low or the tank is full.
- Store historical readings for long-term analysis.
- Add automatic water-flow control using a suitable valve and controller.
- Improve monitoring reliability with sensor-error detection.

✅ Conclusion

The Rainwater Harvesting IoT System demonstrates how embedded systems, ultrasonic sensing, and web technologies can be combined to monitor water levels. It provides a foundation for understanding automated water measurement, status alerts, dashboard visualization, and IoT cloud integration.

The project supports the goal of improving awareness of stored rainwater and encouraging efficient water management through technology.

---

Project Type: Internet of Things (IoT)
Domain: Smart Water Management
Platform: Arduino, Wokwi, GitHub Pages
Project Status: Dashboard and simulation available; live sensor and cloud connectivity depend on successful configuration.
