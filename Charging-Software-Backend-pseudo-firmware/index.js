"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var http = require("http");
var serialport_1 = require("serialport");
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Socket.IO server running');
});
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
var port = new serialport_1.SerialPort({ path: 'COM3', baudRate: 9600 });
// Define the range of bytes you want to send
var startByte = 0x01;
var endByte = 0x09;
// Object to store extracted parameters
var extractedParameters = {};
// Function to emit extracted parameters
var emitExtractedParameters = function () {
    io.emit('extractedParameters', extractedParameters);
    console.log(extractedParameters);
};
// Function to send bytes with a delay
var sendBytesWithDelay = function (currentByte) {
    if (currentByte <= endByte) {
        var bytesToSend = Buffer.from([0x01, 0x01, currentByte]); // Create a buffer with the current byte
        // Write data to the serial port
        port.write(bytesToSend, function (err) {
            if (err) {
                console.error('Error writing to serial port:', err);
            }
            else {
                console.log("Data written to serial port for byte 0x01 0x01 ".concat(currentByte.toString(16)));
            }
            setTimeout(function () { return sendBytesWithDelay(currentByte + 1); }, 1000); // Delay in milliseconds (e.g., 1000ms = 1 second)
        });
    }
    else {
        console.log('Finished sending bytes. Restarting in 5 seconds...');
        setTimeout(function () {
            extractedParameters = addEmptySlots(extractedParameters, endByte); // Add empty slots
            
            // extractedParameters = {}; // Clear the extracted parameters
            sendBytesWithDelay(startByte); // Restart sending bytes
            emitExtractedParameters(); // Emit parameters when the byte cycle is completed
        }, 5000); // Restart after a 5-second delay
    }
};
// Listen for data from the serial port
port.on('data', function (data) {
    console.log("Received data: ".concat(data));
    // Handle the received data here
    // Extract individual bytes from the received data and explicitly type them as numbers
    var bytes = Array.from(data);
    // Remove bytes 0 and 1
    bytes.splice(0, 2);
    // Interpret the bytes according to the format provided
    // var voltage = (bytes[0] << 8 | bytes[1]) * 0.1; // Byte0~1: Voltage (0.1V)
    // var current = ((bytes[2] << 8 | bytes[3]) - 30000) * 0.1; // Byte2~3: Current (30000 offset, 0.1A)
    var buffer = Buffer.from(bytes);
    var voltage = buffer.readUInt16BE(0) * 0.1;
    var current = (buffer.readUInt16BE(2) - 30000) / 10;
    var soc = (bytes[4] << 8 | bytes[5]) * 0.1; // Byte4-5: SOC (0.1%)
    var maxTemperature = bytes[6]; // Byte6: Max. Temperature
    var batteryID = bytes.slice(7, 13).map(byte => byte.toString(16).padStart(2, '0')).join(':').toUpperCase(); // Byte7~12: Battery ID [6 bytes]
    var bpi = bytes[13]; // Byte 13: BPI
    var slotID = bytes[14]; // Byte14: slot id
    // Extract individual bits from the Flags (Byte15)
    var flags = bytes[15];
    var nodeHealthOK = (flags & 1) === 1;
    var batteryPresent = (flags & 2) === 2;
    var chargingStatus = (flags & 4) === 4;
    // Create an object for the current slotID
    var slotData = {
        voltage: voltage.toFixed(1),
        current: current.toFixed(1),
        soc: soc.toFixed(1),
        maxTemperature: maxTemperature-40,
        batteryID: batteryID,
        bpi: bpi,
        slotID: slotID,
        nodeHealthOK: nodeHealthOK,
        batteryPresent: batteryPresent,
        chargingStatus: chargingStatus,
    };
    // Store the extracted parameters in the object using slotID as the key (number)
    extractedParameters[slotID] = slotData;
});
// Handle client connections
io.on('connection', function (socket) {
    console.log('Client connected');
    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});
// Start sending bytes with a delay
sendBytesWithDelay(startByte);

// Function to add empty slots
function addEmptySlots(data, maxSlot) {
    const newData = { ...data }; // Create a copy of the original data

    for (let slot = 1; slot <= maxSlot; slot++) {
        if (!(slot in newData)) {
            newData[slot] = {voltage: 72.9,
                current: 1,
                soc: 10.1,
                maxTemperature: 33,
                batteryID: '00:00:00:00:00:00',
                bpi: 30,
                slotID: slot,
                nodeHealthOK: false,
                batteryPresent: false,
                chargingStatus: false,}; // Add an empty object for the missing slot
        }
    }

    return newData;
}

var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
server.listen(PORT, function () {
    console.log("Server is listening on port ".concat(PORT));
});