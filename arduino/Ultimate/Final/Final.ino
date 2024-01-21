/*
  Read data from an ultrasonic sensor, display information on a 
  common cathode 4 digit 7 segment display, make noise when scoring, 
  and record data to the serial monitor.

  Board: Arduino Uno R4 (or R3)
  Component: Ultrasonic distance Sensor(HC-SR04)
*/
//Define useful variables
int shotCount = 0;
bool firstShot = true;
float successCount = 0;
float oldSucc = 0;
float accuracy = 0;
float oldDist = 16;
int oldCount = 0;

// Define the pin numbers for the sensors
const int buttonPin = 6; // for the button
const int ledPin = 7;
const int data=8;   //74HC595  pin 8 DS
const int latch=9;  //74HC595  pin 9 STCP
const int clock=10; //74HC595  pin 10 SHCP
const int echoPin = 11; // for the ultrasonic
const int trigPin = 12;

// Data for 7 segment
unsigned char table[]=
{0x3f,0x06,0x5b,0x4f,0x66,0x6d,0x7d,0x07,0x7f,0x6f,0x77,0x7c
,0x39,0x5e,0x79,0x71,0x00};

void setup() {
  Serial.begin(9600);                 // Start serial communication with a baud rate of 9600
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(echoPin, INPUT);               // Set echo pin as input
  pinMode(trigPin, OUTPUT);              // Set trig pin as output
  // Serial.println("Ultrasonic sensor:");  // Print a message indicating the ultrasonic sensor is ready
  pinMode(latch,OUTPUT);
  pinMode(clock,OUTPUT);
  pinMode(data,OUTPUT);
}

void loop() {
  float distance = readDistance();  // Call the function to read the sensor data and get the distance
  // Serial.print(distance);           // Print the distance value
  // Serial.println(" cm");            // Print " cm" to indicate the unit of measurement
  float diff = abs(distance - oldDist);
  if (diff > 2) {
    successCount += 0.5;
    accuracy = successCount / shotCount;
    const int n = int(successCount);
    Sound();
    Display(n);
    oldDist = distance;
  } else {
    const int n = int(successCount);
    Display(n);
    oldDist = distance;
  }
  if (digitalRead(buttonPin) == LOW)
  {
    shotCount++;
  }                    // Delay for 100 milliseconds before repeating the loop
  delay(20);
  if (oldCount < shotCount || oldSucc < successCount) {
    RecordData();
    delay(400);
    oldCount += 1;
    oldSucc = successCount;
  }
}

void Sound() {
    digitalWrite(ledPin, HIGH);
    delay(250);
    digitalWrite(ledPin, LOW);
}

// Function to read the sensor data and calculate the distance
float readDistance() {
  digitalWrite(trigPin, LOW);   // Set trig pin to low to ensure a clean pulse
  delayMicroseconds(2);         // Delay for 2 microseconds
  digitalWrite(trigPin, HIGH);  // Send a 10 microsecond pulse by setting trig pin to high
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);  // Set trig pin back to low

  // Measure the pulse width of the echo pin and calculate the distance value
  float distance = pulseIn(echoPin, HIGH) / 58.00;  // Formula: (340m/s * 1us) / 2
  return distance;
}


void Display(unsigned char num)
{
  digitalWrite(latch,LOW);
  shiftOut(data,clock,MSBFIRST,table[num]);
  digitalWrite(latch,HIGH);
}


void RecordData() {
  Serial.print("Shot Count: ");
  Serial.println(shotCount);
  Serial.print("Success Count: ");
  const int n = int(successCount);
  Serial.println(n);
  Serial.print("Accuracy: ");
  Serial.println(accuracy);
  Serial.println();
}