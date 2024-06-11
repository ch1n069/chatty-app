//
const express = require("express");
//
const app = express();

const http = require("http");

const cors = require("cors");
const { Server } = require("socket");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // url to the react server
    origin: "http://localhost:3000",
    // specify the methods that are to be accepted
    methods: ["GET", "POST"],
  },
});

// start the emittion of events and the detection of the events
io.on("connection", (socket) => {
  // use the socket to grab what is in the connection
  console.log("socket id", socket.id);
});

// disconnet user
// set the listening port
server.listen(3001, () => {
  console.log("server is running on port 3001");
});
