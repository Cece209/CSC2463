#define VRX_PIN A0
#define VRY_PIN A1
#define SW_PIN 2

int joyX = 0, joyY = 0, sw = 0;

const int redPin = 8;
const int greenPin = 7;
const int bluePin = 5;
// bool mousePressedFlag = false;

const int numReadings = 10;

int xReadings[numReadings];  // the readings from the analog input
int yReadings[numReadings];
int readIndex = 0;          // the index of the current reading
float xTotal = 0;              // the running total
float xAverage = 0;
float yTotal = 0;              // the running total
float yAverage = 0;
float xStart, yStart;
bool start = false;
unsigned long  lastTime = 0;
const int interval = 16;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(57600);
  pinMode(SW_PIN, INPUT_PULLUP);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

  for(int i = 0; i < numReadings; i++){
    xReadings[i] = 0;
    yReadings[i] = 0;
  }
}

void loop() {

  while (Serial.available() > 0) {

    // look for the next valid integer in the incoming serial stream:
    int red = Serial.parseInt();
    // do it again:
    int green = Serial.parseInt();
    // do it again:
    int blue = Serial.parseInt();

    int flag = Serial.parseInt();

    // look for the newline. That's the end of your sentence:
    if (Serial.read() == '\n') {
      // constrain the values to 0 - 255 and invert
      // if you're using a common-cathode LED, just use "constrain(color, 0, 255);"
      red = constrain(red, 0, 255);
      green = constrain(green, 0, 255);
      blue = constrain(blue, 0, 255);

      // fade the red, green, and blue legs of the LED:
      analogWrite(redPin, red);
      analogWrite(greenPin, green);
      analogWrite(bluePin, blue);

      //  mousePressedFlag = (flag == 1);
    }
  }

  // put your main code here, to run repeatedly:
  int x = analogRead(VRX_PIN);
  int y = analogRead(VRY_PIN);
  int sw = digitalRead(SW_PIN);

  xTotal = xTotal - xReadings[readIndex];
  yTotal = yTotal - yReadings[readIndex];
  // read from the sensor:
  xReadings[readIndex] = x;
  yReadings[readIndex] = y;
  // add the reading to the total:
  xTotal = xTotal + x;
  yTotal = yTotal + y;
  // advance to the next position in the array:
  readIndex = readIndex + 1;

  xAverage = xTotal / numReadings;
  yAverage = yTotal / numReadings;

  // if we're at the end of the array...
  if (readIndex >= numReadings) {
    // ...wrap around to the beginning:
    readIndex = 0;
    if(!start){
      xStart = xAverage;
      yStart = yAverage;
      start = true;
    }
  }

  if(start){
    unsigned long now = millis();
    if(now - lastTime > interval){
      Serial.print((int) (xAverage-xStart));
      Serial.print(",");
      Serial.print((int) (yAverage-yStart));
      Serial.print(",");
      Serial.println(!sw);
      lastTime = now;
    }
    
  }
}
