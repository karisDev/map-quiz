import { useState } from "react";
import Map from "./Map";
import { socket } from "./service/socket";
import { useEffect } from "react";

const GameStates = {
  Map: "PickAPoint",
  Wait: "Wait",
};

function Game({ name }) {
  const [gameState, setGameState] = useState(GameStates.Map);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [correctCoords, setCorrectCoords] = useState({
    lat: 36.8041216674974,
    lng: -84.71531164701229,
  });

  useEffect(() => {
    socket.emit("join", name);
  }, [name]);

  const onSubmitCoords = () => {
    if (selectedCoords === null) return;

    socket.emit("coords", selectedCoords);
  };

  return (
    <>
      {gameState === GameStates.Map && (
        <>
          <Map
            position={selectedCoords}
            setPosition={setSelectedCoords}
            correctPosition={correctCoords}
          />
          <button className="mapSubmit" onClick={onSubmitCoords}>
            Confirm Choice
          </button>
        </>
      )}
      {gameState === GameStates.Wait && <h1>Waiting for other players</h1>}
    </>
  );
}

export default Game;
