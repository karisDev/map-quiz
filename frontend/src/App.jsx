import { useState } from "react";
import { Suspense } from "react";
import React from "react";
import LoadingEllipsis from "./components/LoadingEllipsis";

const AdminPanel = React.lazy(() => import("./pages/AdminPage/AdminPage"));
const Game = React.lazy(() => import("./pages/GamePage/GamePage"));
const EnterName = React.lazy(() =>
  import("./pages/EnterNamePage/EnterNamePage")
);

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

  console.log("VITE_SOCKETIO_URL", import.meta.env.VITE_SOCKETIO_HOST)
  return isAdmin ? (
    <Suspense fallback={<LoadingEllipsis />}>
      <AdminPanel roomId={roomId} />
    </Suspense>
  ) : isGame ? (
    <Suspense fallback={<LoadingEllipsis />}>
      <Game name={name} roomId={roomId} />
    </Suspense>
  ) : (
    <Suspense fallback={<LoadingEllipsis />}>
      <EnterName nameSubmit={onNameEnter} initialRoomId={initialRoomId} />
    </Suspense>
  );
}

export default App;
