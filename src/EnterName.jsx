import { useState } from "react";

const EnterName = () => {
  const [name, setName] = useState("");

  const onNameEnter = () => {
    console.log("Name entered");
  };

  return (
    <div className="enterName_wrapper">
      <form
        className="enterName"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>English quiz</h1>
        <input
          type="name"
          placeholder="Write your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button>Enter a quiz</button>
      </form>
    </div>
  );
};

export default EnterName;
