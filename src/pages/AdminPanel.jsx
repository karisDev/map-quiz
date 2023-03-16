import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AdminMap from "../components/AdminMap";
import Question from "../components/Question";
import { socket } from "../service/socket";

const AdminPanel = ({ roomId }) => {
  const [players, setPlayers] = useState([]); // {name: "test", id: "test", answered: false}
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [hideScores, setHideScores] = useState(false);
  const [correctPoint, setCorrectPoint] = useState(null);

  socket.on("connect_error", (err) => {
    console.log(err);
  });

  socket.on("players", (data) => {
    const filteredPlayers = data.filter((player) => player.roomId === roomId);

    setPlayers(filteredPlayers);
  });

  socket.on("revealAnswer", (data) => {
    setCorrectPoint(data);
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
    socket.emit("join", { name: "karisDev (admin)", roomId: roomId });
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
                {player.name} {player.disconnected && "(disconnected)"}
              </p>
              {player.name !== "karisDev (admin)" && (
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
        <button
          className="showLeaderboard"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? "Hide" : "Show"} map
        </button>
      </div>
      {showLeaderboard && (
        <div className="leaderboard">
          <p className="leaderboardTitle">Leaderboard</p>
          {players
            .sort((a, b) => b.score - a.score)
            .filter((player) => player.name !== "Karis")
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
      )}
      {showMap && players && (
        <AdminMap
          pointsToShow={players.map((player) => {
            if (!player.selectedCoords) {
              return {
                position: [0, 0],
                name: player.name,
              };
            }
            return {
              position: player.selectedCoords,
              name: player.name,
            };
          })}
          correctPoint={correctPoint ? correctPoint : [0, 0]}
        />
      )}
      <div
        style={{
          display: showLeaderboard || showMap ? "none" : "block",
        }}
      >
        <Question onRevealAnswer={revealAnswer} resetState={resetState} />
      </div>
    </div>
  );
};

export default AdminPanel;
