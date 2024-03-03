const express = require("express");
const app = express();
const http = require("http"); // Use require for built-in Node.js modules
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require('body-parser');
import { readLogs, writeLogs } from './logFile'; // Adjust the path accordingly

app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);


// Endpoint to get logs
app.get('/logs', (req, res) => {
  const logs = readLogs();
  res.json(logs);
});

// Endpoint to log data
app.post('/log', (req, res) => {
  const { timestamp, message } = req.body;
  const logs = readLogs();
  logs.push({ timestamp, message });
  writeLogs(logs);
  console.log(`Log entry: ${timestamp} - ${message}`);
  res.send('Log entry sent to server successfully');
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

// Define your battery data as a TypeScript object
const batteryData: Record<
  number,
  {
    maxTemperature: number;
    bpi: number;
    slotID: number;
    voltage: number;
    current: number;
    soc: number;
    batteryID: string;
    batteryPresent: boolean;
    nodeHealthOK: boolean;
    chargingStatus: boolean;
  }
> = {
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
    batteryPresent: true,
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
    batteryPresent: true,
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
    batteryPresent: false,
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
io.on("connection", (socket) => {
  console.log("Client connected");

  // Emit updates to all clients every 5 seconds
  const updateInterval = setInterval(() => {
    // Emit updates to all connected clients
    io.emit("extractedParameters", batteryData);
    console.log("Battery data updated:", batteryData);
  }, 5000); // Emit updates every 5 seconds (adjust as needed)

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(updateInterval); // Stop the update interval when a client disconnects
  });
});

server.listen(8080, () => {
  console.log("SERVER IS RUNNING at port 8080");
});
