import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { socket } from "./service/socket";

const AdminPanel = () => {
  socket.on("connect", () => {
    console.log("Connected to server");

    socket.emit("join", "test");
  });

  socket.on("connect_error", (err) => {
    console.log(err);
  });

  socket.on("players", (data) => {
    console.log(data);
  });

  return (
    <div>
      <button>show answer</button>
    </div>
  );
};

export default AdminPanel;
