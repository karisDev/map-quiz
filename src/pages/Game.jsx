import { useState } from "react";
import Map from "../components/Map";
import { socket } from "../service/socket";
import { useEffect } from "react";

function Game({ name }) {
  const [waiting, setWaiting] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [correctCoords, setCorrectCoords] = useState();

  useEffect(() => {
    socket.emit("join", name);

    socket.on("revealAnswer", (data) => {
      setCorrectCoords(data);
    });

    socket.on("resetState", () => {
      setCorrectCoords(null);
      setWaiting(false);
      setSelectedCoords(null);
    });
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
