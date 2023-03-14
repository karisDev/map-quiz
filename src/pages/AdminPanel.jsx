import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import Question from "../components/Question";
import { socket } from "../service/socket";

const AdminPanel = () => {
  const [players, setPlayers] = useState([]); // {name: "test", id: "test", answered: false}

  socket.on("connect_error", (err) => {
    console.log(err);
  });

  socket.on("players", (data) => {
    setPlayers(data);
  });

  socket.on("playerAnswered", (data) => {
    setPlayers((prev) => {
      return prev.map((player) => {
        if (player.id === data.id) {
          return { ...player, answered: true };
        }
        return player;
      });
    });
  });

  const deletePlayer = (id) => {
    socket.emit("deletePlayer", id);
  };

  useEffect(() => {
    socket.emit("join", "Karis");
  }, []);

  return (
    <div className="adminPanel">
      <div className="players">
        <p className="playersTitle">Players</p>
        {players.map((player) => {
          return (
            <div className="player" key={player.id}>
              {player.answered ? (
                <div className="greenCircle"></div>
              ) : (
                <div className="redCircle"></div>
              )}
              <p className="playerName">
                {player.name === "Karis" ? "karisDev (admin)" : player.name}
              </p>
              {player.name !== "Karis" && (
                <>
                  <p className="playerScore">Score: {player.score}</p>
                  <button
                    className="playerDelete"
                    onClick={() => deletePlayer(player.id)}
                  >
                    X
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
      <Question />
    </div>
  );
};

export default AdminPanel;
