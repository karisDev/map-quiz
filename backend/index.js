import express from "express";
const app = express();
import { createServer } from "http";
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import calculateScrore from "./calculateScore.js";

const players = [];

io.on("connection", (socket) => {
  if (socket.handshake.auth.playerId) {
    socket.emit("connected", socket.id);
  } else {
    socket.emit("error", "No player id");
    socket.disconnect();
  }

  socket.on("disconnect", () => {
    const playerId = socket.handshake.auth.playerId;
    players.splice(playerId, 1);

    io.emit("players", players);
  });

  socket.on("join", (playerName) => {
    const playerId = socket.handshake.auth.playerId;
    if (players.find((player) => player.id === playerId)) {
      return;
    }

    players.push({ id: playerId, name: playerName, score: 0 });

    io.emit("players", players);
  });
});

io.on("cords", (data) => {
  console.log(data);
  console.log(socket.handshake.auth.sid);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
