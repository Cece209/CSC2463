int buttonPin = 2;
int ledRedPin = 12;
int ledGreenPin = 13;
bool canWalk = false;
int buttonState = 0; 

void setup() {
  pinMode(ledRedPin, OUTPUT);
  pinMode(ledGreenPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
   int buttonState = digitalRead(buttonPin);


 if (buttonState == 0) {
   digitalWrite(ledRedPin, HIGH);
   digitalWrite(ledGreenPin, LOW);
 } else {
   digitalWrite(ledRedPin, LOW);
   digitalWrite(ledGreenPin, HIGH);
 }
 Serial.println(buttonState);
}