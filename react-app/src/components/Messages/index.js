import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from '../Loading';
import { io } from 'socket.io-client';

function Messages({ channel }) {
  const messages = useSelector(state => state.messages.messageList);

  const [socketInstance, setSocketInstance] = useState(null);
  const [message, setMessage] = useState("");
  const [messageArr, setMessageArr] = useState([]);

  const handleText = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = () => {
    if (!message || !channel) return;

    socketInstance.emit("my_message", { channel: channel.toString(), message: message });

    setMessage("");
  };

  useEffect(() => {
    // Establish socket connection when the component mounts
    const socket = process.env.NODE_ENV !== 'production' ?
      io('http://localhost:5000') :
      io('https://slacker-chat-collab.onrender.com');

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
      socketInstance.on('my_message', (data) => {
        console.log("Received from socket: ", data)
        const receivedMessage = data.message;
        setMessageArr(prevArr => ([...prevArr, [channel, receivedMessage]]));
      });
    }
  }, [socketInstance]);

  if (!messages) return <Loading />;

  console.log('MESSAGEARRAY', messageArr)


  return (
    <div>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.message_body}</li>
        ))}
        {messageArr.map((message, index) => (
          message[0] === channel ? <li key={index}>{message[1]}</li> : null
        ))}
      </ul>
      <input type='text' value={message} onChange={handleText} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Messages;
