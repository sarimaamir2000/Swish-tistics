import serial
from serial import Serial, SerialException
import ctypes, sys
start = True

try:
    SObj = serial.Serial('COM7', 9600, timeout=1)
    
except SerialException as var: 
    print('An Exception Occurred')
    print('Exception Details ->', var)
    
else:
    print('Serial Port Opened')
    
    with open('C:/Users/krish/BasketBot/arduino/Python/output.txt', 'a') as file:
        while start:
            data = SObj.readline().decode('utf-8')
            if data:
                file.write(data)
                file.flush()
                print('Data written to file:', data)
