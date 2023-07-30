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
        const data = { user_id: user.id, channel_id: 1, message: message }

        socketInstance.emit("join", data);
        setMessageArr([...messageArr, message])
        console.log(messageArr)
        setMessage("");
    };

    useEffect(() => {
        const socket = io('http://127.0.0.1:5000')
        setSocketInstance(socket)

        socket.on("data", (data) => {
            setMessageArr([...messageArr, data.data]);
        });

        socket.on('join', (data) => {
            console.log('data', data)
            setMessageArr([...messageArr, data.data]);
        })

        return () => {
            socket.off("data", () => {
                console.log("data event was removed");
            });
        };
    }, []);

    return (
        <>
            <h1>Testing</h1>
            <ul>

            </ul>

            <input type='text' value={message} onChange={(handleText)}></input>
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default SocketTesting