import EnterName from "./EnterName";
import AdminPanel from "./AdminPanel";
import Map from "./Map";
import { useState } from "react";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGame, setIsGame] = useState(false);

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
    <Map />
  );
}

export default App;
