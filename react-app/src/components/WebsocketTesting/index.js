import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'



const SocketTesting = () => {
    const [message, setMessage] = useState([]);
    const [isSending, setIsSending] = useState('');
    const user = useSelector(state => state.session.user);

    const handleText = (e) => {
        return;
    }

    const handleSubmit = () => {
        return;
    }

    useEffect(() => {
        const socket = io();

        socket.emit("chat", { user: user.username, msg: 'has connected', recipient_id: 5, sender_id: user.id })
        socket.on("chat", (chat) => {
            // let msg = fetch('/api/channel/1/messages')
            // console.log(chat)
        })

        return (() => {
            socket.disconnect();
        })
    }, [])

    return (
        <>
            <h1>Testing</h1>
            <ul>
            </ul>

            <input type='text' value={message} onChange={(handleText)}></input>
            <button onClick={handleSubmit}></button>
        </>
    )
}

export default SocketTesting