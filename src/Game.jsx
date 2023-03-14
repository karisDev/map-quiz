import { useState } from "react";
import Map from "./Map";
import io from "socket.io-client";
import { socket } from "./service/socket";
import { useEffect } from "react";

const GameStates = {
  Map: "PickAPoint",
  Wait: "Wait",
};

function Game({ name }) {
  const [gameState, setGameState] = useState(GameStates.Map);

  useEffect(() => {
    console.log(name);
    socket.emit("join", name);
  }, [name]);

  const onSubmitCoords = (cords) => {
    if (cords === null) return;

    console.log(cords);
    socket.emit("cords", cords);
  };

  return (
    <>
      {gameState === GameStates.Map && <Map submitCoords={onSubmitCoords} />}
      {gameState === GameStates.Wait && <h1>Ожидание других игроков</h1>}
    </>
  );
}

export default Game;
