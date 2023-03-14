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
  const [correctCoords, setCorrectCoords] = useState(null);

  useEffect(() => {
    socket.emit("join", name);
  }, [name]);

  const onSubmitCoords = (cords) => {
    if (cords === null) return;

    console.log(cords);
    socket.emit("coords", cords);
  };

  return (
    <>
      {gameState === GameStates.Map && <Map submitCoords={onSubmitCoords} />}
      {gameState === GameStates.Wait && <h1>Waiting for other players</h1>}
    </>
  );
}

export default Game;
