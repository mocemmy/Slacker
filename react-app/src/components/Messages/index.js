import React, { useEffect } from "react"


function Messages({channelId}) {
    

    useEffect(() => {

    }, [channelId])
    return (
        <h1>{channelId}</h1>
    )
}

export default Messages;