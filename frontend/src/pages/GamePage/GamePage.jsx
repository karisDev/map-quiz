import { useState } from "react";
import Map from "../../components/Map";
import { playerId, socket } from "../../service/socket";
import { useEffect } from "react";
import "./gamePage.scss";
import { useMemo } from "react";

function GamePage({ name, roomId }) {
  const [waiting, setWaiting] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [correctCoords, setCorrectCoords] = useState();
  const [showScores, setShowScores] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    socket.emit("join", { name: name, roomId: roomId });

    socket.on("revealAnswer", (data) => {
      setCorrectCoords(data.answer);
      setWaiting(true);
      setShowScores(true);
    });

    socket.on("players", (players) => {
      const player = players.find((p) => p.id === playerId);
      if (!player) location.reload();

      setPlayerInfo(player);
    });

    socket.on("resetState", () => {
      setCorrectCoords(null);
      setWaiting(false);
      setSelectedCoords(null);
      setShowScores(false);
    });
  }, [name]);

  const onSubmitCoords = () => {
    if (waiting) return;
    if (selectedCoords === null) return;

    setWaiting(true);
    socket.emit("coords", selectedCoords);
  };

  const updatePosition = (position) => {
    if (waiting) return;
    if (correctCoords) return;

    setSelectedCoords(position);
  };

  useEffect(() => {
    const tryEnterFullscreen = () => {
      const elem = document.querySelector("#root");

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      console.log("fullscreenchange", document.fullscreenElement);
      setIsFullScreen(document.fullscreenElement !== null);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    try {
      tryEnterFullscreen();
    } catch (e) {
      console.log("Fullscreen not supported");
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <>
      {showScores && (
        <div
          className={`scoresPopupWrapper ${isFullScreen ? "fullscreen" : ""}`}
        >
          <div className="scoresPopup">
            <div className="header">
              <p className="teamName">{playerInfo.name}</p>
              <span className="scoreIncrease">
                +{playerInfo.roundScore - (playerInfo.roundScore % 1)}
              </span>
            </div>
            <p className="totalScore">
              Total score: {playerInfo.score - (playerInfo.score % 1)}
            </p>
          </div>
        </div>
      )}
      <Map
        position={selectedCoords}
        setPosition={updatePosition}
        correctPosition={correctCoords}
      />
      <button className="mapSubmit" disabled={waiting} onClick={onSubmitCoords}>
        {waiting ? "Waiting for players" : "Confirm choice"}
      </button>
    </>
  );
}

export default GamePage;
