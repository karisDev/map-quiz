import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Question from "../components/Question";
import { socket } from "../service/socket";

const AdminPanel = () => {
  const [players, setPlayers] = useState([]); // {name: "test", id: "test", answered: false}
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [hideScores, setHideScores] = useState(false);

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

  const revealAnswer = (answer) => {
    socket.emit("revealAnswer", answer);
  };

  const resetState = () => {
    socket.emit("resetState");
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
                  {!hideScores && (
                    <p className="playerScore">
                      Score:{" "}
                      {
                        // оставить целую часть
                        player.score - (player.score % 1)
                      }
                    </p>
                  )}
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

        <button
          className="hideScores"
          onClick={() => setHideScores(!hideScores)}
        >
          {hideScores ? "Show" : "Hide"} scores
        </button>
        <button
          className="showLeaderboard"
          onClick={() => setShowLeaderboard(!showLeaderboard)}
        >
          {showLeaderboard ? "Hide" : "Show"} leaderboard
        </button>
      </div>
      {showLeaderboard ? (
        <div className="leaderboard">
          <p className="leaderboardTitle">Leaderboard</p>
          {players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => {
              return (
                <div className="player" key={player.id}>
                  <p className="playerName">
                    <span>#{index + 1}</span> {player.name}
                  </p>
                  <p className="playerScore">
                    {
                      // оставить целую часть
                      player.score - (player.score % 1)
                    }
                  </p>
                </div>
              );
            })}
        </div>
      ) : (
        <Question onRevealAnswer={revealAnswer} resetState={resetState} />
      )}
    </div>
  );
};

export default AdminPanel;
