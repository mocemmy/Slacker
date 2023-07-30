import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'



const SocketTesting = () => {
    const [socket, setSocket] = useState('')

    useEffect(() => {
        const newSocket = io.connect('https://localhost:5000')

        setSocket(newSocket)
    }, [setSocket])

    return (
        <>
            <h1>Testing</h1>
            <ul>
                <li></li>
            </ul>

            <form>
                <textarea placeholder='Message'></textarea>
                <button type='submit'></button>
            </form>
        </>
    )
}

export default SocketTesting