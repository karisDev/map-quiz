import EnterName from "./EnterName";
import AdminPanel from "./AdminPanel";
import { useState } from "react";
import Game from "./Game";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const [name, setName] = useState("");

  const onNameEnter = (name) => {
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
    <EnterName onNameEnter={onNameEnter} />
  ) : (
    <Game name={name} />
  );
}

export default App;
