import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'

const SocketTesting = () => {
    const [socketInstance, setSocketInstance] = useState(null)
    const [message, setMessage] = useState("");
    const [messageArr, setMessageArr] = useState([])
    const [isSending, setIsSending] = useState('');
    const user = useSelector(state => state.session.user);

    const handleText = (e) => {
        const inputMessage = e.target.value;
        setMessage(inputMessage);
    };
    const handleSubmit = () => {
        if (!message) {
            return;
        }
        console.log("Submit handler: ", message)
        socketInstance.emit("my_message", message);
        setMessage("");
    };

    useEffect(() => {
        const socket = io('localhost:5000')
        setSocketInstance(socket)
    }, []);

    useEffect(() => {
        if (socketInstance) {
            socketInstance.on('my_message', (data) => {
                console.log("Received from socket: ", data)
                setMessageArr([...messageArr, data])
                console.log(messageArr)
            });

            return () => {
                socketInstance.off("my_message", () => {
                    console.log("off message listener");
                });
            };
        }
    }, [socketInstance, messageArr])

    return (
        <>
            <h1>Testing</h1>
            <ul>
                {messageArr.map(item => {
                    return (<li >{item}</li>)
                })}
            </ul>
            <input type='text' value={message} onChange={(handleText)}></input>
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default SocketTesting