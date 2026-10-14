// Rainwater Harvesting Tank Monitor - Arduino Uno + HC-SR04
// ---------- PIN MAP (must match diagram.json) ----------
const int TRIG_PIN   = 9;   // HC-SR04 TRIG  (Arduino sends the pulse)
const int ECHO_PIN   = 10;  // HC-SR04 ECHO  (Arduino listens for the echo)
const int GREEN_LED  = 4;   // LOW status
const int YELLOW_LED = 5;   // MEDIUM status
const int RED_LED    = 6;   // FULL status
const int BUZZER_PIN = 7;   // FULL alarm

// ---------- TANK SETTINGS (centimetres) ----------
const float TANK_EMPTY_CM = 100.0; // sensor to tank bottom (tank empty)
const float TANK_FULL_CM  = 5.0;   // sensor to water surface when full
const int   LOW_LIMIT  = 30;       // below 30%  -> LOW
const int   FULL_LIMIT = 80;       // 80% or more -> FULL

float lastDistance = TANK_EMPTY_CM; // used if a reading fails

float readDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10); // 10 us trigger pulse
  digitalWrite(TRIG_PIN, LOW);
  long us = pulseIn(ECHO_PIN, HIGH, 30000UL);          // echo time, 30 ms timeout
  if (us == 0) return lastDistance;                    // no echo -> keep last value
  return us * 0.0343 / 2.0;  // sound = 0.0343 cm/us; /2 because it travels there and back
}

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);  pinMode(ECHO_PIN, INPUT);
  pinMode(GREEN_LED, OUTPUT); pinMode(YELLOW_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);   pinMode(BUZZER_PIN, OUTPUT);
  Serial.println("Rainwater Tank Monitor started");
}

void loop() {
  float d = readDistanceCm();
  lastDistance = d;

  // Water height = empty distance - measured distance, limited to the usable range
  float usable = TANK_EMPTY_CM - TANK_FULL_CM;          // 95 cm
  float levelCm = constrain(TANK_EMPTY_CM - d, 0, usable);
  int pct = (int)(levelCm / usable * 100.0 + 0.5);      // percentage, rounded

  // Threshold logic
  const char* status;
  if (pct < LOW_LIMIT)       status = "LOW";
  else if (pct < FULL_LIMIT) status = "MEDIUM";
  else                       status = "FULL";

  bool g = (status[0] == 'L'), y = (status[0] == 'M'), r = (status[0] == 'F');
  digitalWrite(GREEN_LED, g);
  digitalWrite(YELLOW_LED, y);
  digitalWrite(RED_LED, r);
  if (r) tone(BUZZER_PIN, 1000); else noTone(BUZZER_PIN); // buzzer only when FULL

  // Human-readable line (Serial Monitor)
  Serial.print("Distance: "); Serial.print(d, 1);
  Serial.print(" cm | Level: "); Serial.print(levelCm, 1);
  Serial.print(" cm | "); Serial.print(pct);
  Serial.print("% | Status: "); Serial.println(status);

  // JSON line (the dashboard reads this one)
  Serial.print("{\"d\":"); Serial.print(d, 1);
  Serial.print(",\"cm\":"); Serial.print(levelCm, 1);
  Serial.print(",\"pct\":"); Serial.print(pct);
  Serial.print(",\"st\":\""); Serial.print(status);
  Serial.print("\",\"g\":"); Serial.print(g);
  Serial.print(",\"y\":"); Serial.print(y);
  Serial.print(",\"r\":"); Serial.print(r);
  Serial.print(",\"b\":"); Serial.print(r);
  Serial.println("}");

  delay(1000);
}
