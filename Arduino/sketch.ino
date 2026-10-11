
#include <WiFi.h>
#include <HTTPClient.h>

// ---------- WIFI SETTINGS ----------
const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";

// Replace this with your NEW ThingSpeak Write API Key
const char* TS_WRITE_KEY = "YIAVLJ80KWO3YN83";

// ---------- PIN CONNECTIONS ----------
const int TRIG_PIN = 5;
const int ECHO_PIN = 18;

const int GREEN_LED = 21;
const int YELLOW_LED = 22;
const int RED_LED = 23;
const int BUZZER_PIN = 19;

// ---------- TANK SETTINGS (cm) ----------
const float TANK_EMPTY_CM = 100.0;
const float TANK_FULL_CM = 5.0;

const int LOW_LIMIT = 30;
const int FULL_LIMIT = 80;

// ---------- VARIABLES ----------
float lastDistance = TANK_EMPTY_CM;
unsigned long lastSend = 0;

const unsigned long SEND_INTERVAL = 16000UL;

// ---------- READ ULTRASONIC SENSOR ----------
float readDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);

  digitalWrite(TRIG_PIN, LOW);

  long us = pulseIn(ECHO_PIN, HIGH, 30000UL);

  if (us == 0) {
    Serial.println("Sensor timeout - using previous reading");
    return lastDistance;
  }

  return us * 0.0343 / 2.0;
}

// ---------- SEND DATA TO THINGSPEAK ----------
void sendToThingSpeak(float d, float cm, int pct, int code) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected. Data not sent.");
    return;
  }

  HTTPClient http;

  String url =
      String("http://api.thingspeak.com/update?api_key=")
      + TS_WRITE_KEY
      + "&field1=" + String(d, 1)
      + "&field2=" + String(cm, 1)
      + "&field3=" + String(pct)
      + "&field4=" + String(code);

  http.begin(url);

  int httpCode = http.GET();

  Serial.print("ThingSpeak HTTP: ");
  Serial.print(httpCode);
  Serial.print(" | Entry ID: ");
  Serial.println(http.getString());

  http.end();
}

// ---------- SETUP ----------
void setup() {
  Serial.begin(115200);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  pinMode(GREEN_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  digitalWrite(TRIG_PIN, LOW);

  Serial.println();
  Serial.println("Rainwater Tank Monitor");
  Serial.println("Connecting to WiFi...");

  WiFi.begin(WIFI_SSID, WIFI_PASS, 6);

  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

// ---------- MAIN LOOP ----------
void loop() {
  float d = readDistanceCm();
  lastDistance = d;

  // Calculate water level
  float usable = TANK_EMPTY_CM - TANK_FULL_CM;

  float levelCm = constrain(
      TANK_EMPTY_CM - d,
      0.0,
      usable
  );

  int pct = (int)(levelCm / usable * 100.0 + 0.5);

  // Determine water status
  const char* status;
  int code;

  if (pct < LOW_LIMIT) {
    status = "LOW";
    code = 0;
  }
  else if (pct < FULL_LIMIT) {
    status = "MEDIUM";
    code = 1;
  }
  else {
    status = "FULL";
    code = 2;
  }

  // LED indications
  digitalWrite(GREEN_LED, code == 0 ? HIGH : LOW);
  digitalWrite(YELLOW_LED, code == 1 ? HIGH : LOW);
  digitalWrite(RED_LED, code == 2 ? HIGH : LOW);

  // Buzzer ON when tank is full
  if (code == 2) {
    tone(BUZZER_PIN, 1000);
  }
  else {
    noTone(BUZZER_PIN);
  }

  // Display readings
  Serial.printf(
      "Distance: %.1f cm | Level: %.1f cm | %d%% | Status: %s\n",
      d, levelCm, pct, status
  );

  // Upload data every 16 seconds
  if (millis() - lastSend >= SEND_INTERVAL) {
    sendToThingSpeak(d, levelCm, pct, code);
    lastSend = millis();
  }

  delay(1000);
}
