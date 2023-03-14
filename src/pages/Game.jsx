import { useState } from "react";
import Map from "../components/Map";
import { socket } from "../service/socket";
import { useEffect } from "react";

function Game({ name }) {
  const [waiting, setWaiting] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [correctCoords, setCorrectCoords] = useState({
    lat: 36.8041216674974,
    lng: -84.71531164701229,
  });

  useEffect(() => {
    socket.emit("join", name);
  }, [name]);

  const onSubmitCoords = () => {
    if (waiting) return;
    if (selectedCoords === null) return;

    setWaiting(true);
    socket.emit("coords", selectedCoords);
  };

  return (
    <>
      <Map
        position={selectedCoords}
        setPosition={setSelectedCoords}
        correctPosition={correctCoords}
      />
      <button className="mapSubmit" disabled={waiting} onClick={onSubmitCoords}>
        {waiting ? "Waiting for players" : "Confirm choice"}
      </button>
    </>
  );
}

export default Game;
