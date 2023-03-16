import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AdminMap from "../components/AdminMap";
import Question from "../components/Question";
import { socket } from "../service/socket";
import QRCode from "react-qr-code";

const views = {
  question: "question",
  leaderboard: "leaderboard",
  map: "map",
  qrCode: "qrCode",
};

const AdminPanel = ({ roomId }) => {
  const [players, setPlayers] = useState([]);
  const [view, setView] = useState(views.question);

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
          className="mainButton"
          onClick={() =>
            setView((view) =>
              view == views.leaderboard ? views.question : views.leaderboard
            )
          }
        >
          {view === views.leaderboard ? "Hide" : "Show"} leaderboard
        </button>
        <button
          className="mainButton"
          onClick={() =>
            setView((view) => (view == views.map ? views.question : views.map))
          }
        >
          {view == views.map ? "Hide" : "Show"} map
        </button>
        <button
          className="mainButton"
          onClick={() =>
            setView((view) =>
              view == views.qrCode ? views.question : views.qrCode
            )
          }
        >
          {view == views.qrCode ? "Hide" : "Show"} QR code
        </button>
      </div>
      {view == views.leaderboard && (
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
      {view == views.map && players && (
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
      {view == views.qrCode && (
        <div className="qrCode">
          <h1>Scan to join</h1>
          <QRCode
            size={350}
            bgColor="#eee"
            value={`http://138.124.180.37/?room=${roomId}`}
          />
          <h2>Room ID: {roomId}</h2>
        </div>
      )}
      <div
        style={{
          display: view == views.question ? "block" : "none",
        }}
      >
        <Question onRevealAnswer={revealAnswer} resetState={resetState} />
      </div>
    </div>
  );
};

export default AdminPanel;
