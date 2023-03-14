import React from "react";
import { io } from "socket.io-client";

const AdminPanel = () => {
  const socket = io(import.meta.env.VITE_SOCKETIO_HOST, {
    transports: ["websocket"],
  });

  return (
    <div>
      <button>show answer</button>
    </div>
  );
};

export default AdminPanel;
