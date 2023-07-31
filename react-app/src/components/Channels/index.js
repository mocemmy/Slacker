import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import Loading from '../Loading';
import { thunkGetAllMessages } from "../../store/messages";
import Messages from "../Messages";

function Channels() {
    const channels = useSelector(state => state.channels.channelList)
    const dispatch = useDispatch()
    const [defaultChannel, setDefaultChannel] = useState()

    const changeChannel = (e, currChannel) => {
        dispatch(thunkGetAllMessages(currChannel))
        setDefaultChannel(currChannel)
    }

    useEffect(() => {
        if (channels && channels[0]) {
            setDefaultChannel(channels[0].id)
            dispatch(thunkGetAllMessages(defaultChannel))
        }
    }, [channels, dispatch])

    if (!channels) return <Loading />


    return (
        <>
            <div className="channel-container">
            <ul>
                {channels.map(currChannel => (
                    <li key={currChannel.id} onClick={(e) => changeChannel(e, currChannel.id)}>{currChannel.name}</li>
                ))}
            </ul>
            </div>
            <div className="message-container">
                <Messages channel={defaultChannel} />
            </div>
        </>
    )
}

export default Channels
