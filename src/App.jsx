import { useState } from "react";
import EnterName from "./EnterName";
import PickAPoint from "./PickAPoint";
import AdminPanel from "./AdminPanel";

function App() {
  const [admin, setAdmin] = useState(true);
  const [name, setName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(true);

  return (
    <>
      {admin ? <AdminPanel /> : isNameEntered ? <PickAPoint /> : <EnterName />}
    </>
  );
}

export default App;
