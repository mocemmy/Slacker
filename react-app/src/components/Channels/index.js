import React from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import Messages from "../Messages"
import Loading from '../Loading';

function Channels() {
    const channels = useSelector(state => state.channels.channelList)

    const changeChannel = (e, currChannel) => {
    }

    if(!channels) return <Loading />

    return (
        <>
            {channels.map(currChannel => (
                <li key={currChannel.id} onClick={(e) => changeChannel(e, currChannel)}>{currChannel.name}</li>
            ))}
        </>
    )
}

export default Channels