import { useState } from "react";
import Map from "./Map";
import io from "socket.io-client";

const GameStates = {
  Map: "PickAPoint",
  Wait: "Wait",
};

function Game({ name }) {
  const [gameState, setGameState] = useState(GameStates.Map);
  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("connect_error", (err) => {
    console.log(err);
  });

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
