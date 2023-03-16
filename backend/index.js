import calculateScrore from "./calculateScore.js";
import express from "express";
const app = express();
import { createServer } from "http";
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

const players = [];
/*
  players = [
    {
      id: "playerId",
      name: "playerName",
      score: 0,
      roomId: "roomId",
      answered: false,
      selectedCoords: null,
      roundScore: 0,
      disconnected: false
    }
  ]
 */

const DELETE_PLAYER_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

io.on("connection", (socket) => {
  if (!socket.handshake.auth.playerId) {
    socket.emit("error", "No playerId");
    socket.disconnect();
  }

  // connect to the room socket if the player is already in it
  const player = getPlayerById(socket.handshake.auth.playerId);

  if (player) {
    socket.join(player.roomId);
  }
  socket.emit("connected", socket.id);

  socket.on("disconnect", () => {
    const playerId = socket.handshake.auth.playerId;

    const player = getPlayerById(playerId);

    if (player) {
      player.disconnected = true;

      setTimeout(() => {
        console.log("ran timeout");
        const player = getPlayerById(playerId);

        if (player && player.disconnected) {
          const playerIndex = players.findIndex(
            (player) => player.id === playerId
          );

          players.splice(playerIndex, 1);

          emitPlayers();
        }
      }, DELETE_PLAYER_TIMEOUT_MS);
    }

    emitPlayers();
  });

  socket.on("join", (data) => {
    const playerId = socket.handshake.auth.playerId;

    // get index of a player with the same id
    const playerIndex = players.findIndex((player) => player.id === playerId);

    if (playerIndex !== -1) {
      players[playerIndex].name = data.name;
      players[playerIndex].disconnected = false;
    } else {
      if (!data.name || !data.roomId) {
        return;
      }
      players.push({
        id: playerId,
        name: data.name,
        score: 0,
        roomId: data.roomId,
      });
    }

    // disconnect from other rooms
    Object.keys(socket.rooms).forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });
    socket.join(data.roomId);
    console.clear();
    console.log(players);
    emitPlayers();
  });

  socket.on("deletePlayer", (playerId) => {
    const playerIndex = players.findIndex((player) => player.id === playerId);

    if (playerIndex !== -1) {
      players.splice(playerIndex, 1);
    }

    emitPlayers();
  });

  socket.on("coords", (coords) => {
    const playerId = socket.handshake.auth.playerId;

    const playerIndex = players.findIndex((player) => player.id === playerId);

    if (playerIndex !== -1) {
      players[playerIndex].answered = true;
      players[playerIndex].selectedCoords = coords;

      emitPlayers();
    }
  });

  socket.on("revealAnswer", (answer) => {
    const adminId = socket.handshake.auth.playerId;
    const roomId = getRoomIdByPlayerId(adminId);
    const roomPlayers = players.filter((p) => p.roomId === roomId);

    roomPlayers.forEach((player) => {
      if (player.answered) {
        const roundScore = calculateScrore(answer, player.selectedCoords);
        player.score += roundScore;
        player.roundScore = roundScore;
      }
    });

    io.to(roomId).emit("revealAnswer", {
      answer: answer,
    });
    emitPlayers();
  });

  socket.on("resetState", () => {
    const adminId = socket.handshake.auth.playerId;
    const roomId = getRoomIdByPlayerId(adminId);
    const roomPlayers = players.filter((p) => p.roomId === roomId);

    roomPlayers.forEach((player) => {
      player.answered = false;
      player.selectedCoords = null;
      player.roundScore = 0;
    });

    io.to(roomId).emit("resetState");
    emitPlayers();
  });
});

function getPlayerById(playerId) {
  return players.find((p) => p.id === playerId);
}

function getRoomIdByPlayerId(playerId) {
  return players.find((p) => p.id === playerId).roomId;
}

// emit players array
function emitPlayers() {
  console.clear();
  console.log(players);
  io.emit("players", players);
}

const port = 3001;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
