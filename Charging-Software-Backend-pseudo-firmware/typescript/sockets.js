"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var http = require("http"); // Use require for built-in Node.js modules
var Server = require("socket.io").Server;
var cors = require("cors");
var bodyParser = require('body-parser');
var logFile_1 = require("./logFile"); // Adjust the path accordingly
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const mongoose = require('mongoose');
// const logData = require("./logData.json");
const logDataPath = 'C:/Users/LAPTOP WORLD/Desktop/charging station/testing/Charging-Software-Backend-pseudo-firmware/typescript/logData.json'; // Adjust the path accordingly


app.use(cors());
app.use(bodyParser.json());
var server = http.createServer(app);
// Endpoint to get logs
app.get('/logs', function (req, res) {
    var logs = (0, logFile_1.readLogs)();
    res.json(logs);
});
// Endpoint to log data
app.post('/log', function (req, res) {
    var _a = req.body, timestamp = _a.timestamp, message = _a.message;
    var logs = (0, logFile_1.readLogs)();
    logs.push({ timestamp: timestamp, message: message });
    (0, logFile_1.writeLogs)(logs);
    console.log("Log entry: ".concat(timestamp, " - ").concat(message));
    res.send('Log entry sent to server successfully');
});
var io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Replace with your frontend URL
        methods: ["GET", "POST"],
    },
});

// Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/BatteryData?directConnection=true";

let mongoConnected = false;

async function connectToMongo() {
    try {

        if (!mongoConnected) {
            await mongoose.connect(mongoURI);
            console.log("Connected to Mongo successfully");
            mongoConnected = true;
            // Watch the logData file for changes after successful connection
            watchFile();
            // Store data once after successful connection
            // storeData();
            // Check and store new data after successful connection
            checkAndStoreNewData();
            findDuplicates();
        }
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}

// Define a schema for your Battery data
const batterySchema = new mongoose.Schema({
    timestamp: Number,
    message: String,
});

const Battery = mongoose.model('Battery', batterySchema);

// Watch file for changes
function watchFile() {
    fs.watchFile(path.join(__dirname, 'logData.json'), (curr, prev) => {
        console.log('logData.json file has been updated');
        checkAndStoreNewData();
    });
}

async function findDuplicates() {
    try {
        const duplicates = await Battery.aggregate([
            {
                $group: {
                    _id: { timestamp: "$timestamp", message: "$message" },
                    count: { $sum: 1 }
                }
            },
            {
                $match: {
                    count: { $gt: 1 }
                }
            }
        ]);
        console.log('Duplicate records:', duplicates);
    } catch (error) {
        console.error('Error finding duplicates:', error);
    }
}
// Function to read JSON file and store new data in MongoDB
function checkAndStoreNewData() {
    fs.readFile(path.join(__dirname, 'logData.json'), 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading logData.json:', err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            const existingTimestamps = await Battery.distinct('timestamp');

            // Filter out new entries
            const newData = jsonData.filter(entry => !existingTimestamps.includes(entry.timestamp));

            // Iterate over new entries and store them
            for (const entry of newData) {
                const batteryEntry = new Battery({
                    timestamp: entry.timestamp,
                    message: entry.message
                });
                await batteryEntry.save();
                console.log('New data saved to MongoDB:', batteryEntry);
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}
// Call connectToMongo function to connect to MongoDB
connectToMongo();

// Define your battery data as a TypeScript object
var batteryData = {
    1: {
        voltage: 72.9,
        current: 3000.3,
        soc: 10.1,
        maxTemperature: 33,
        batteryID: "A1:CD:EF:10:20:30",
        bpi: 30,
        slotID: 1,
        nodeHealthOK: true,
        batteryPresent: true,
        chargingStatus: false,
    },
    2: {
        voltage: 72.9,
        current: 3000.3,
        soc: 100,
        maxTemperature: 33,
        bpi: 30,
        slotID: 1,
        nodeHealthOK: true,
        batteryPresent: true,
        chargingStatus: false,
        batteryID: "A2:CD:EF:10:20:30",
    },
    3: {
        voltage: 72.9,
        current: 3000.3,
        soc: 10.1,
        maxTemperature: 33,
        bpi: 30,
        slotID: 1,
        nodeHealthOK: true,
        batteryPresent: false,
        chargingStatus: false,
        batteryID: "A3:CD:EF:10:20:30",
    },
    4: {
        voltage: 72.9,
        current: 3000.3,
        soc: 10.1,
        maxTemperature: 33,
        bpi: 30,
        slotID: 1,
        nodeHealthOK: true,
        batteryPresent: false,
        chargingStatus: true,
        batteryID: "A4:CD:EF:10:20:30",
    },
    5: {
        voltage: 72.9,
        current: 3000.3,
        soc: 10.1,
        maxTemperature: 33,
        bpi: 30,
        slotID: 1,
        nodeHealthOK: false,
        batteryPresent: false,
        chargingStatus: false,
        batteryID: "A5:CD:EF:10:20:30",
    },
    6: {
        voltage: 72.9,
        current: 3000.3,
        soc: 10.1,
        maxTemperature: 33,
        bpi: 30,
        slotID: 1,
        nodeHealthOK: false,
        batteryPresent: false,
        chargingStatus: false,
        batteryID: "A6:CD:EF:10:20:30",
    },
    7: {
        voltage: 72.9,
        current: 3000.3,
        soc: 10.1,
        maxTemperature: 33,
        bpi: 30,
        slotID: 1,
        nodeHealthOK: false,
        batteryPresent: false,
        chargingStatus: false,
        batteryID: "A7:CD:EF:10:20:30",
    },
    8: {
        voltage: 72.9,
        current: 3000.3,
        soc: 10.1,
        maxTemperature: 33,
        bpi: 30,
        slotID: 1,
        nodeHealthOK: true,
        batteryPresent: true,
        chargingStatus: false,
        batteryID: "A8:CD:EF:10:20:30",
    },
    9: {
        voltage: 72.9,
        current: 3000.3,
        soc: 10.1,
        maxTemperature: 33,
        bpi: 30,
        slotID: 1,
        nodeHealthOK: false,
        batteryPresent: false,
        chargingStatus: false,
        batteryID: "A9:CD:EF:10:20:30",
    },
    // Add more data as needed
};

// Handle client connections
io.on("connection", function (socket) {
    console.log("Client connected");
    // Emit updates to all clients every 5 seconds
    var updateInterval = setInterval(function () {
        // Emit updates to all connected clients
        io.emit("extractedParameters", batteryData);
        console.log("Battery data updated:", batteryData);
    }, 5000); // Emit updates every 5 seconds (adjust as needed)
    socket.on("disconnect", function () {
        console.log("Client disconnected");
        clearInterval(updateInterval); // Stop the update interval when a client disconnects
    });
});

server.listen(8080, function () {
    console.log("SERVER IS RUNNING at port 8080");
});
