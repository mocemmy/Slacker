import { io } from "socket.io-client";

const socket = process.env.NODE_ENV !== "production"
  ? io("http://localhost:5000")
  : io("https://slacker-chat-collab.onrender.com");

export default socket;
