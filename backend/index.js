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
    // delete players if needed
    const playerId = socket.handshake.auth.playerId;

    const playerIndex = players.findIndex((player) => player.id === playerId);

    if (playerIndex !== -1) {
      players.splice(playerIndex, 1);
    }

    io.emit("players", players);
  });

  socket.on("join", (playerName) => {
    const playerId = socket.handshake.auth.playerId;

    // get index of a player with the same id
    const playerIndex = players.findIndex((player) => player.id === playerId);

    if (playerIndex !== -1) {
      players[playerIndex].name = playerName;
    } else {
      players.push({ id: playerId, name: playerName, score: 0 });
    }

    io.emit("players", players);
  });

  socket.on("deletePlayer", (playerId) => {
    const playerIndex = players.findIndex((player) => player.id === playerId);

    if (playerIndex !== -1) {
      players.splice(playerIndex, 1);

      io.emit("players", players);
    }

    io.emit("players", players);
  });

  socket.on("coords", (coords) => {
    const playerId = socket.handshake.auth.playerId;

    // add score to player
    const playerIndex = players.findIndex((player) => player.id === playerId);

    if (playerIndex !== -1) {
      players[playerIndex].answered = true;
      players[playerIndex].selectedCoords = coords;
    }
    io.emit("players", players);
  });

  socket.on("revealAnswer", (answer) => {
    // calculate score
    players.forEach((player) => {
      if (player.answered) {
        player.score += calculateScrore(answer, player.selectedCoords);
      }
    });

    io.emit("revealAnswer", answer);
    io.emit("players", players);
  });

  socket.on("resetState", () => {
    players.forEach((player) => {
      player.answered = false;
      player.selectedCoords = null;
    });

    io.emit("resetState");
    io.emit("players", players);
  });
});

const port = 50911;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
