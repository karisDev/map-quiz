import { useState } from "react";
import Map from "../components/Map";
import { playerId, socket } from "../service/socket";
import { useEffect } from "react";

function Game({ name, roomId }) {
  const [waiting, setWaiting] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [correctCoords, setCorrectCoords] = useState();
  const [showScores, setShowScores] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({});

  useEffect(() => {
    socket.emit("join", { name: name, roomId: roomId });

    socket.on("revealAnswer", (data) => {
      console.log("revealAnswer", data);
      setCorrectCoords(data.answer);
      setWaiting(true);
      setShowScores(true);
    });

    socket.on("players", (data) => {
      const player = data.players.find((p) => p.id === playerId);
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

  return (
    <>
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

export default Game;
