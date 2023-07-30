import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'

const SocketTesting = () => {
    const [socketInstance, setSocketInstance] = useState("")
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
        socketInstance.emit("message", message);
        setMessage("");
    };

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            transports: ["websocket"],
            cors: {
                origin: "http://localhost:3000/",
            },
        })
        setSocketInstance(socket)

        // socket.on("data", (data) => {
        //     setMessageArr([...messageArr, data.data]);
        // });

        // socket.on('join', (data) => {
        //     console.log('data', data)
        //     setMessageArr([...messageArr, data.data]);
        // })
    }, []);

    useEffect(() => {
        socketInstance.on('message', (data) => {
            console.log(data)
            setMessageArr([...messageArr, message])
        })

        return () => {
            socketInstance.off("message", () => {
                console.log("off message listener");
            });
        };
    }, [socketInstance, messageArr])

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