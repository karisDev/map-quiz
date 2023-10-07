import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AdminMap from "../../components/AdminMap";
import Question from "../../components/Question";
import { socket } from "../../service/socket";
import QRCode from "react-qr-code";
import "./adminPage.scss";

const views = {
  question: "question",
  leaderboard: "leaderboard",
  map: "map",
  qrCode: "qrCode",
};

const AdminPage = ({ roomId }) => {
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
        <p className="playersTitle">
          Players
          <button
            className="hideScores"
            onClick={() => setHideScores(!hideScores)}
          >
            {hideScores ? "Show" : "Hide"} scores
          </button>
        </p>
        {players.map((player, index) =>
          player.name == "karisDev (admin)" ? (
            <div className="player" key={index}>
              <div className="status green"></div>
              <p className="playerName">
                {player.name} {player.disconnected && "(disconnected)"}
              </p>
            </div>
          ) : (
            <div className="player" key={index}>
              <div
                className={`status ${
                  player.answered || player.name == "karisDev (admin)"
                    ? "green"
                    : player.disconnected
                    ? "red"
                    : "yellow"
                }`}
              ></div>
              <p className="playerName">
                {player.name} {player.disconnected && "(disconnected)"}
              </p>
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
            </div>
          )
        )}
        <div className="statusHelper">
          <div className="group">
            <div className="circle green"></div>
            <p>ready</p>
          </div>
          <div className="group">
            <div className="circle yellow"></div>
            <p>answering</p>
          </div>
          <div className="group">
            <div className="circle red"></div>
            <p>left</p>
          </div>
        </div>
      </div>
      <div className="quizView">
        <div className="nav">
          <button
            className={`navButton ${view == views.question ? "active" : ""}`}
            onClick={() => setView(views.question)}
          >
            Question
          </button>
          <button
            className={`navButton ${view == views.leaderboard ? "active" : ""}`}
            onClick={() =>
              setView((view) =>
                view == views.leaderboard ? views.question : views.leaderboard
              )
            }
          >
            Leaderboard
          </button>
          <button
            className={`navButton ${view == views.map ? "active" : ""}`}
            onClick={() =>
              setView((view) =>
                view == views.map ? views.question : views.map
              )
            }
          >
            Map
          </button>
          <button
            className={`navButton ${view == views.qrCode ? "active" : ""}`}
            onClick={() =>
              setView((view) =>
                view == views.qrCode ? views.question : views.qrCode
              )
            }
          >
            QR Code
          </button>
        </div>
        <div className="body">
          {view == views.leaderboard && (
            <div className="leaderboard">
              <p className="leaderboardTitle">Leaderboard</p>
              {players
                .sort((a, b) => b.score - a.score)
                .filter((player) => player.name !== "karisDev (admin)")
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
          {view == views.map && (
            <AdminMap
              points={players.map((player) => {
                return { position: player.selectedCoords, name: player.name };
              })}
              correctPoint={correctPoint && correctPoint.answer}
            />
          )}
          {view == views.qrCode && (
            <div className="qrCode">
              <h1>Scan to join</h1>
              <QRCode
                size={350}
                bgColor="transparent"
                value={`${
                  location.href
                }?room=${roomId}`}
              />
              <h2>Room ID: "{roomId}"</h2>
            </div>
          )}
          <div
            style={{
              height: "100%",
              width: "100%",
              display: view == views.question ? "block" : "none",
            }}
          >
            <Question onRevealAnswer={revealAnswer} resetState={resetState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
