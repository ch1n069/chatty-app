//
const express = require("express");
//
const app = express();

const http = require("http");

const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// start the emittion of events and the detection of the events
io.on("connection", (socket) => {
  // use the socket to grab what is in the connection
  console.log("socket id", socket.id);

  // events to listen for
  socket.on("join_room", (data) => {
    // join the room
    socket.join(data);
    console.log(`User  with id ${socket.id} joined the room ${data}`);
  });

  // listen to the send message event
  socket.on("send_message", (data) => {
    console.log("message", data);
  });
});

// disconnet user
// set the listening port
server.listen(3001, () => {
  console.log("server is running on port 3001");
});
