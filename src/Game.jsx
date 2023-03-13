import { useState } from "react";
import EnterName from "./EnterName";
import Map from "./Map";
import AdminPanel from "./AdminPanel";
import io, { Socket } from "socket.io-client";

const GameStates = {
  EnterName: "EnterName",
  Map: "PickAPoint",
  Wait: "Wait",
  AdminPanel: "AdminPanel",
};

function Game() {
  const [gameState, setGameState] = useState(
    window.location.pathname === "/admin"
      ? GameStates.AdminPanel
      : GameStates.Map
  );
  const [name, setName] = useState("");

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
      {gameState === GameStates.EnterName && <EnterName />}
      {gameState === GameStates.Map && <Map submitCoords={onSubmitCoords} />}
      {gameState === GameStates.Wait && <h1>Ожидание других игроков</h1>}
      {gameState === GameStates.AdminPanel && <AdminPanel />}
    </>
  );
}

export default Game;
