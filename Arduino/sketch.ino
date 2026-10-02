#define TRIG_PIN 9
#define ECHO_PIN 10

#define GREEN_LED 2
#define YELLOW_LED 3
#define RED_LED 4

#define BUZZER 5

const float TANK_HEIGHT = 95.0;

void setup() {

  Serial.begin(9600);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  pinMode(GREEN_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);

  pinMode(BUZZER, OUTPUT);
}


void loop() {

  // Send ultrasonic pulse
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);

  digitalWrite(TRIG_PIN, LOW);


  // Read echo
  long duration = pulseIn(ECHO_PIN, HIGH);

  float distance = duration * 0.0343 / 2;


  // Calculate water level
  float waterLevel = TANK_HEIGHT - distance;


  if (waterLevel < 0) {
    waterLevel = 0;
  }

  if (waterLevel > TANK_HEIGHT) {
    waterLevel = TANK_HEIGHT;
  }


  // Calculate percentage
  int percentage =
      round((waterLevel / TANK_HEIGHT) * 100);


  // Determine status
  String status;


  if (percentage <= 20) {

    status = "LOW";

    digitalWrite(GREEN_LED, LOW);
    digitalWrite(YELLOW_LED, LOW);
    digitalWrite(RED_LED, HIGH);

    tone(BUZZER, 1000);

  }

  else if (percentage <= 70) {

    status = "MEDIUM";

    digitalWrite(GREEN_LED, LOW);
    digitalWrite(YELLOW_LED, HIGH);
    digitalWrite(RED_LED, LOW);

    noTone(BUZZER);

  }

  else {

    status = "FULL";

    digitalWrite(GREEN_LED, HIGH);
    digitalWrite(YELLOW_LED, LOW);
    digitalWrite(RED_LED, LOW);

    noTone(BUZZER);

  }


  // Serial Monitor
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.print(" cm | Water Level: ");
  Serial.print(waterLevel);
  Serial.print(" cm | Percentage: ");
  Serial.print(percentage);
  Serial.print("% | Status: ");
  Serial.println(status);


  delay(2000);
}
