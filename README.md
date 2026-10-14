# RainSense: Rainwater Harvesting Tank Monitor

An Arduino Uno based rainwater tank level monitor using an HC-SR04 ultrasonic sensor, simulated in Wokwi, with a blue and purple web dashboard hosted on GitHub Pages.

## Links

| What | Link |
|------|------|
| Live dashboard | https://subanthana-cse.github.io/Rainwater-Harvesting-IoT/ |
| Wokwi simulation | https://wokwi.com/projects/476779840844201985 |
| GitHub repository | https://github.com/subanthana-cse/Rainwater-Harvesting-IoT |

## Project Overview

The HC-SR04 sensor measures the distance from the top of the tank to the water surface. The Arduino converts it into water height and a percentage, then shows the status with LEDs and a buzzer. It also prints the readings to the Serial Monitor as JSON, which the dashboard reads.

## Components

- Arduino Uno
- HC-SR04 ultrasonic sensor
- Green, yellow and red LEDs
- Buzzer

## Pin Map

| Component | Arduino Pin |
|-----------|-------------|
| HC-SR04 TRIG | 9 |
| HC-SR04 ECHO | 10 |
| Green LED (LOW) | 4 |
| Yellow LED (MEDIUM) | 5 |
| Red LED (FULL) | 6 |
| Buzzer (FULL alarm) | 7 |

## Tank Settings and Status Logic

- Tank empty distance: 100 cm
- Tank full distance: 5 cm
- Usable depth: 95 cm

| Level | Status | Indicator |
|-------|--------|-----------|
| Below 30% | LOW | Green LED |
| 30% to 79% | MEDIUM | Yellow LED |
| 80% and above | FULL | Red LED and buzzer |

Distance is calculated from the echo time: `distance = time x 0.0343 / 2` (cm).

## Serial Output

Every second the Arduino prints one readable line and one JSON line:

`{"d":52.3,"cm":47.7,"pct":50,"st":"MEDIUM","g":0,"y":1,"r":0,"b":0}`

| Key | Meaning |
|-----|---------|
| d | Distance from sensor to water (cm) |
| cm | Water height (cm) |
| pct | Tank level (%) |
| st | Status: LOW, MEDIUM or FULL |
| g, y, r | Green, yellow, red LED state |
| b | Buzzer state |

## Dashboard

Open the live dashboard: https://subanthana-cse.github.io/Rainwater-Harvesting-IoT/

It shows the animated tank, level percentage, status, sensor readings, LED and buzzer indicators and a level history chart. It has three data modes:

1. **Demo slider**: move the distance slider to see LOW, MEDIUM and FULL.
2. **Paste Wokwi output**: copy the lines starting with `{` from the Wokwi Serial Monitor, paste them and click Show readings.
3. **Arduino by USB**: connect a real Uno at 9600 baud using Chrome or Edge.

## How to Run the Simulation

1. Open the Wokwi project: https://wokwi.com/projects/476779840844201985
2. Click the green Start button.
3. Change the distance on the HC-SR04 sensor and watch the LEDs, buzzer and Serial Monitor.

## Files

- `index.html`: dashboard page
- `style.css`: blue and purple theme
- `app.js`: dashboard logic
- `Arduino/`: sketch and circuit diagram

## Author

Subanthana MD, Sensor and Instrumentation project
