import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import Loading from '../Loading'


function Messages() {
    const messages = useSelector(state => state.messages.messageList)
    console.error('messages', messages)
    if(!messages) return <Loading />

    return (
        <ul>
            {messages.map(message => (
                <li key={message.id}>{message.message_body}</li>
            ))}
        </ul>
    )
}

export default Messages;