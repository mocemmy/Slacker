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
        console.log("submit handler in button", message)
        socketInstance.send("message", message);
        setMessage("");
    };

    useEffect(() => {
        const socket = io('http://localhost:5000')
        setSocketInstance(socket)
    }, []);

    useEffect(() => {
        if (socketInstance) {
            socketInstance.on('message', (data) => {
                console.log(data)
                setMessageArr([...messageArr, message])
            });

            return () => {
                socketInstance.off("message", () => {
                    console.log("off message listener");
                });
            };
        }
    }, [socketInstance])

    return (
        <>
            <h1>Testing</h1>
            <ul>
                {messageArr.map(message => {
                    return (<li>{message}</li>)
                })}
            </ul>
            <input type='text' value={message} onChange={(handleText)}></input>
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default SocketTesting