const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Start the emission of events and the detection of the events
io.on("connection", (socket) => {
  // Use the socket to grab what is in the connection
  console.log("socket id", socket.id);

  // Events to listen for
  socket.on("join_room", (data) => {
    // Join the room
    socket.join(data);
    console.log(`User with id ${socket.id} joined the room ${data}`);
  });

  // Listen to the send message event
  socket.on("send_message", (data) => {
    console.log("received message", data);
    // Emit the received message to the specified room
    socket.to(data.room).emit("receive_message", data);
  });
});

// Disconnect user
// Set the listening port
server.listen(3001, () => {
  console.log("server is running on port 3001");
});
