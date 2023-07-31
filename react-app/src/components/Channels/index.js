import React from "react"
import { useState } from "react"
import Messages from "./components/Messages"

function Channels({channels}) {
//channels: array of channel objects with id and name keys
    const [channel, setChannel] = useState([channels[0]])

    const changeChannel = (e, currChannel) => {
        setChannel(e)
        console.log(channel)
    }

    return (
        <>
            {channels.map(currChannel => (
                <li key={currChannel.id} onClick={(e) => changeChannel(e, currChannel)}>{currChannel.name}</li>
            ))}
            <div className="messages-container">
                <Messages channel={channel} />
            </div>
        </>
    )
}

export default Channels