const { SerialPort } = require('serialport');

const baudRate = 9600; // Adjust baud rate according to your ESP configuration

// Function to find and connect to ESP via COM port
const connectToESP = async () => {
  try {
    const ports = await SerialPort.list();
    console.log('Available Ports:', ports); // Log all available ports

    const espPort = ports.find((port) => port.manufacturer === '1a86');
    console.log('ESP Port:', espPort); // Log the found ESP port

    if (!espPort || !espPort.path) {
      throw new Error('ESP device or path not found');
    }

    const portName = JSON.stringify(espPort.path); // Access the 'path' property directly
    console.log(portName)
    const serial = new SerialPort({path:portName, baudRate:baudRate });

    serial.on('open', () => {
      console.log(`Connected to ESP on ${portName}`);
      // Write and read data here
      serial.write('Hello ESP!\n', (err) => {
        if (err) {
          console.error('Error writing to ESP:', err);
        }
      });

      serial.on('data', (data) => {
        console.log('Data received from ESP:', data.toString());
        // Handle received data
      });
    });

    serial.on('error', (err) => {
      console.error('Serial port error:', err);
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the function to connect to ESP
connectToESP();
