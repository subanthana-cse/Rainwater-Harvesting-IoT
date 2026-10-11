# 🌧️ Rainwater Tank Monitoring System using ESP32 and ThingSpeak

## 📌 Project Overview

The **Rainwater Tank Monitoring System** is an IoT-based project designed to monitor the water level inside a rainwater storage tank using an ESP32 microcontroller and an HC-SR04 ultrasonic sensor.

The system measures the distance between the sensor and the water surface, calculates the water level in centimetres and percentage, and uploads the readings to the ThingSpeak IoT cloud platform through Wi-Fi.

Three LEDs indicate the tank status: LOW, MEDIUM, or FULL. A buzzer provides an audible alert when the tank reaches the configured FULL level.

The project can be simulated online using Wokwi without requiring physical hardware.

## 🎯 Objectives

- To monitor the water level in a rainwater storage tank.
- To measure the distance between the ultrasonic sensor and the water surface.
- To calculate the water level in centimetres and percentage.
- To display LOW, MEDIUM, and FULL conditions using LEDs.
- To activate a buzzer when the water level reaches the FULL threshold.
- To upload sensor readings to ThingSpeak for online monitoring.
- To demonstrate an IoT-based water monitoring solution using an online simulator.

## ✨ Features

- **Real-time sensing:** Measures the distance to the water surface using an HC-SR04 sensor.
- **Water level calculation:** Converts sensor distance into water height and percentage.
- **LED indicators:** Uses three LEDs to indicate the current tank status.
- **Audible alert:** Activates a buzzer when the tank level reaches 80% or above.
- **Cloud monitoring:** Sends sensor data to ThingSpeak through Wi-Fi.
- **Graphical visualization:** Displays historical sensor readings using ThingSpeak field charts.
- **Online simulation:** Runs using the Wokwi ESP32 simulator.

## 🧰 Hardware Components

| S. No. | Component | Purpose |
|---|---|---|
| 1 | ESP32 development board | Controls the system and connects to Wi-Fi |
| 2 | HC-SR04 ultrasonic sensor | Measures the distance to the water surface |
| 3 | Green LED | Indicates LOW water level |
| 4 | Yellow LED | Indicates MEDIUM water level |
| 5 | Red LED | Indicates FULL water level |
| 6 | Buzzer | Produces an audible full-tank alert |
| 7 | Resistors | Limit current through the LEDs |
| 8 | Jumper wires | Connect the components |

**Note:** The project can be tested virtually in Wokwi without purchasing the physical components.

## 💻 Software and Platforms

- Arduino C++
- Wokwi Online Simulator
- ThingSpeak IoT Cloud
- ESP32 Wi-Fi library
- HTTPClient library
- GitHub for source code and documentation

## 🔌 Pin Configuration

| ESP32 Pin | Component | Connection |
|---|---|---|
| GPIO 5 | HC-SR04 TRIG | Trigger signal |
| GPIO 18 | HC-SR04 ECHO | Echo signal |
| GPIO 21 | Green LED | LOW indication |
| GPIO 22 | Yellow LED | MEDIUM indication |
| GPIO 23 | Red LED | FULL indication |
| GPIO 19 | Buzzer | Audible alert |

**Important for physical hardware:** The HC-SR04 ECHO output is typically 5 V. Use a suitable voltage divider or level shifter before connecting it to the ESP32's 3.3 V GPIO input. Also connect all grounds together.

## ⚙️ Working Principle

### 1. Distance Measurement

The HC-SR04 sensor sends an ultrasonic pulse towards the water surface. The reflected pulse returns to the sensor, and the ESP32 measures the travel time.

The distance is calculated using:

Distance (cm) = (Echo time × 0.0343) / 2

The division by two accounts for the sound travelling to the water surface and returning to the sensor.

### 2. Water Level Calculation

The project uses these configured tank distances:

- Empty tank distance: 100 cm
- Full tank distance: 5 cm

Usable water height = 100 − 5 = 95 cm

Water height is calculated by subtracting the measured distance from the empty-tank distance and limiting the result to the configured usable range.

Water Level Percentage = (Water Height / 95) × 100

These distances are example settings and should be adjusted for the actual tank dimensions and sensor mounting position.

### 3. Water Status Detection

| Water Percentage | Status | LED | Buzzer |
|---|---|---|---|
| Below 30% | LOW | Green | OFF |
| 30% to below 80% | MEDIUM | Yellow | OFF |
| 80% to 100% | FULL | Red | ON |

The LEDs and buzzer are controlled automatically according to the calculated water level.

### 4. ThingSpeak Cloud Monitoring

The ESP32 connects to the Wokwi virtual Wi-Fi network and sends readings to ThingSpeak using an HTTP request.

The program attempts an update every 16 seconds. The ThingSpeak channel stores the values and displays them as charts.

## ☁️ ThingSpeak Channel Configuration

Create a ThingSpeak channel and enable the following four fields:

| Field | Name | Description |
|---|---|---|
| Field 1 | Distance | Sensor-to-water distance in cm |
| Field 2 | Water Level | Calculated water height in cm |
| Field 3 | Water Percentage | Calculated water level from 0 to 100 |
| Field 4 | Status Code | 0 = LOW, 1 = MEDIUM, 2 = FULL |

Add your ThingSpeak Write API Key to the ESP32 code before running the simulation. Keep the key private.

## 🚀 How to Run the Project

1. Open the Wokwi project using the link below.
2. Open the ESP32 Arduino code in `sketch.ino`.
3. Verify that the sensor and output pins match the circuit configuration.
4. Create a ThingSpeak channel with all four fields enabled.
5. Enter your ThingSpeak Write API Key in the code.
6. Start the Wokwi simulation.
7. Open the Serial Monitor and check the Wi-Fi connection status.
8. Observe the measured distance, water height, percentage, and status.
9. Wait for the periodic ThingSpeak update.
10. Open the ThingSpeak channel's Private View to observe the uploaded data and charts.

### 🔗 Project Links

- **Wokwi Simulation:** https://wokwi.com/projects/477576116030254081
- **ThingSpeak:** https://thingspeak.mathworks.com/

## 📊 Expected Output

The Serial Monitor displays the measured distance, calculated water height, water percentage, and status.

Example:

```text
Rainwater Tank Monitor
WiFi connected!
Distance: 52.5 cm | Level: 47.5 cm | 50% | Status: MEDIUM
ThingSpeak HTTP: 200 | Entry ID: 123456
```

This is an illustrative example. The actual values depend on the sensor simulation and tank settings.

A successful ThingSpeak update generally returns a positive entry ID. An entry ID of `0` indicates that the update was not accepted.

## 📈 ThingSpeak Dashboard Output

The ThingSpeak channel provides graphical monitoring of:

- Sensor distance over time.
- Water height over time.
- Water level percentage over time.
- Tank status code over time.

The graphs help observe changes in the tank's water level during simulation.

## 🌍 Applications

- Rainwater harvesting tanks.
- Domestic water storage tanks.
- Smart home water monitoring.
- Educational IoT projects.
- Water storage monitoring in small buildings.
- Demonstration of cloud-connected sensor systems.

## ✅ Advantages

- Provides automated water level measurement.
- Reduces the need for manual tank inspection.
- Gives a visual indication of water status.
- Provides an audible alert at the configured full level.
- Supports online data monitoring and historical charts.
- Can be tested without physical hardware using Wokwi.

## ⚠️ Limitations

- Sensor readings may fluctuate because of surface movement or measurement errors.
- The configured empty and full distances must match the tank installation.
- Internet connectivity is required for cloud updates.
- The buzzer and LEDs only provide local indications; this version does not automatically control a water pump.
- The current status code is uploaded as a number rather than a text label.
- The simulated setup does not prove that the hardware will perform identically in real-world conditions.

## 🔮 Future Enhancements

- Add automatic water pump control with suitable relay protection.
- Send notifications when the tank is nearly empty or full.
- Add a mobile-friendly monitoring dashboard.
- Store additional sensor data and generate usage reports.
- Improve measurement reliability using filtering and repeated readings.
- Add overflow prevention and fault detection.
- Deploy the system on a physical ESP32 with appropriate electrical protection.

## 🔒 Security Notes

- Never publish your ThingSpeak Write API Key in a public repository.
- Use a placeholder such as `YOUR_NEW_WRITE_API_KEY` in published source code.
- If a real API key has already been exposed, regenerate it and update your private working copy.
- Keep private credentials outside committed source files.

## 🏁 Conclusion

The Rainwater Tank Monitoring System demonstrates how an ESP32, an HC-SR04 ultrasonic sensor, LEDs, a buzzer, and ThingSpeak can be combined to monitor water levels through an IoT-based approach.

The system measures the water level, classifies the tank condition, provides local alerts, and uploads readings for online visualization. The Wokwi simulator makes it possible to test the program and circuit virtually before implementing the project with physical hardware.

This project provides a foundation for developing more advanced smart water management and rainwater harvesting systems.

## 👩‍💻 Author

**Project:** Rainwater Tank Monitoring System using ESP32 and ThingSpeak

**Repository:** `rainwater-tank-monitor`
