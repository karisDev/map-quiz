import io from "socket.io-client";

const assignUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

if (!localStorage.getItem("uuid")) {
  localStorage.setItem("uuid", assignUUID());
}

export const socket = io(import.meta.env.VITE_SOCKETIO_HOST, {
  transports: ["websocket"],
  auth: {
    playerId: localStorage.getItem("uuid"),
  },
});
