const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  io.on("cords", (data) => {
    console.log(data);
  });

  // on any event from client
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
