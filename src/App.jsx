import EnterName from "./pages/EnterName";
import AdminPanel from "./pages/AdminPanel";
import { useState } from "react";
import Game from "./pages/Game";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const [name, setName] = useState("");

  const onNameEnter = (name) => {
    setName(name);
    if (name === "karis") {
      setIsAdmin(true);
    }
    if (name.length > 0) {
      setIsGame(true);
    }
  };

  return isAdmin ? (
    <AdminPanel />
  ) : isGame ? (
    <Game name={name} />
  ) : (
    <EnterName onNameEnter={onNameEnter} />
  );
}

export default App;
