//www.elegoo.com
//2016.12.08

int ledPin = 7;
int buttonPin = 6;
int count = 0;

void setup() 
{
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(9600);  
}

void loop() 
{
  if (digitalRead(buttonPin) == LOW)
  {
    digitalWrite(ledPin, HIGH);
    delay(250);
    digitalWrite(ledPin, LOW);
    count++;
    Serial.print("Current score: ");
    Serial.println(count);
  }
}
