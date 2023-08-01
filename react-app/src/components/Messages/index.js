import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import Loading from '../Loading'
import { io } from 'socket.io-client'



function Messages() {
    const messages = useSelector(state => state.messages.messageList)

    const [socketInstance, setSocketInstance] = useState(null)
    const [message, setMessage] = useState("");
    const [messageArr, setMessageArr] = useState([])

    const handleText = (e) => {
        const inputMessage = e.target.value;
        setMessage(inputMessage);
    };

    const handleSubmit = () => {
        socketInstance.emit("my_message", message);
        setMessage("");
    };

    useEffect(() => {
        if (process.env.FLASK_ENV !== 'production') {
            const socket = io('localhost:5000')
            setSocketInstance(socket)
        } else {
            const socket = io('https://slacker-chat-collab.onrender.com')
            setSocketInstance(socket)
        }
    }, []);


    useEffect(() => {
        if (socketInstance) {
            socketInstance.on('my_message', (data) => {
                console.log("Received from socket: ", data)
                setMessageArr(prevArr => [...prevArr, data])
            });

            return () => {
                socketInstance.off("my_message", () => {
                    console.log("off message listener");
                });
            };
        }
    }, [socketInstance])

    useEffect(() => {
        console.log(messageArr)
    }, [messageArr])



    if (!messages) return <Loading />

    return (
        <div>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>{message.message_body}</li>
                ))}
                {messageArr.map(message => (
                    <li key={message.id}>{message}</li>
                ))}
            </ul>
            <input type='text' value={message} onChange={(handleText)}></input>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Messages;
