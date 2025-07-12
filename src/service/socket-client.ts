import { io } from "socket.io-client";

const socket = io("https://chatapp-server-n84z.onrender.com", {
  transports: ["websocket"],
});

export default socket;
