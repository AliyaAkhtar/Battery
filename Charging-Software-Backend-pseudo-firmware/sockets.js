const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST'],
  },
});

// Define your battery data as a JavaScript object
const batteryData = {
 
1:{batteryPresent:false,soc: 88,current:32 ,voltage:72,node:true,batteryID:"A1:CD:EF:10:20:30"},
2:{batteryPresent:false,soc:88,current:32,voltage:72,node:true,batteryID:"A1:CD:EF:10:20:30"},
3:{batteryPresent:false,soc:88,current:32,voltage:72,node:false,batteryID:"A1:CD:EF:10:20:30"},
4:{batteryPresent:false,soc:88,current:32,voltage:72,node:true,batteryID:"A1:CD:EF:10:20:30"},
5:{batteryPresent:false,soc:88,current:32,voltage:72,node:true,batteryID:"A1:CD:EF:10:20:30"},
6:{batteryPresent:false,soc:88,current:32,voltage:72,node:true,batteryID:"A1:CD:EF:10:20:30"},
7:{batteryPresent:false,soc:88,current:32,voltage:72,node:true,batteryID:"A1:CD:EF:10:20:30"},
8:{batteryPresent:false,soc:88,current:32,voltage:72,node:true,batteryID:"A1:CD:EF:10:20:30"},
9:{batteryPresent:false,soc:88,current:32,voltage:72,node:true,batteryID:"A1:CD:EF:10:20:30"},

  
  // Add more data as needed
};
// Handle client connections
io.on('connection', (socket) => {
  console.log('Client connected');

  // Emit updates to all clients every 5 seconds
setInterval(() => {
  

  // Emit updates to all connected clients
  io.emit('batteryDataUpdate', batteryData);
  console.log('Battery data updated:', batteryData);
}, 5000); // Emit updates every 5 seconds (adjust as needed)

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('SERVER IS RUNNING at port 3001');
});