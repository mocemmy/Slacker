import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { io } from "socket.io-client";
import MessageDisplay from "../MessageDisplay";

function Messages({ channel }) {
  const messages = useSelector((state) => state.messages.messageList);
  const user = useSelector((state) => state.session.user);

  const [socketInstance, setSocketInstance] = useState(null);
  const [message, setMessage] = useState("");
  const [messageArr, setMessageArr] = useState([]);

  const handleText = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = () => {
    if (!message || !channel) return;
    const date = new Date();
    const data = {
      channel: channel.toString(),
      message,
      sent_by: user.id,
      created_at: date,
      profile_pic: user.profile_pic,
      firstName: user.first_name,
      lastName: user.last_name,
    };

    socketInstance.emit("my_message", data);

    setMessage("");
  };

  useEffect(() => {
    // Establish socket connection when the component mounts
    const socket =
      process.env.NODE_ENV !== "production"
        ? io("http://localhost:5000")
        : io("https://slacker-chat-collab.onrender.com");

    setSocketInstance(socket);

    // Join the specific room when the component mounts
    if (socket && channel) {
      socket.emit("join", { room: channel.toString() });
    }

    return () => {
      // Clean up the socket connection and leave the room when the component unmounts
      if (socketInstance && channel) {
        socket.emit("leave", { room: channel.toString() });
        socket.disconnect();
      }
    };
  }, [channel]);

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on("my_message", (data) => {
        console.log("Received from socket: ", data);
        const receivedMessage = data;
        setMessageArr((prevArr) => [...prevArr, [channel, receivedMessage]]);
      });
    }
  }, [socketInstance]);

  if (!messages) return <Loading />;

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <MessageDisplay key={message.id} message={message} />
        ))}
        {messageArr.map((message, index) =>
          message[0] === channel ? (
            <MessageDisplay key={index} message={message[1]} />
          ) : null
        )}
      </ul>
      <div className="input-container">
        <input
          className="message-input"
          type="text"
          value={message}
          onChange={handleText}
        />
        <button className="message-submit-button" onClick={handleSubmit}><i class="fa-solid fa-paper-plane"></i></button>
      </div>
    </div>
  );
}

export default Messages;
