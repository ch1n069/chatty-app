//
const express = require("express");
//
const app = express();

const http = require("http");

const cors = require("cors");

app.use(cors());

// const port = requir
const server = http.createServer(app);

// set the listening port
server.listen(3001, () => {
  console.log("server is running on port 3001");
});
