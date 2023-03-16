import EnterName from "./pages/EnterName";
import AdminPanel from "./pages/AdminPanel";
import { useState } from "react";
import Game from "./pages/Game";
import { useEffect } from "react";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialRoomId = urlParams.get("room");
  const [roomId, setRoomId] = useState(initialRoomId);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const [name, setName] = useState("");

  const onNameEnter = (name, roomId) => {
    setName(name);
    setRoomId(roomId);

    if (name === "karis") {
      setIsAdmin(true);
    }
    if (name.length > 0) {
      setIsGame(true);
    }
  };

  return isAdmin ? (
    <AdminPanel roomId={roomId} />
  ) : isGame ? (
    <Game name={name} roomId={roomId} />
  ) : (
    <EnterName nameSubmit={onNameEnter} initialRoomId={initialRoomId} />
  );
}

export default App;
