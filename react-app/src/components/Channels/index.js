import React from "react"
import { useSelector, useDispatch } from "react-redux";
import Loading from '../Loading';
import { thunkGetAllMessages } from "../../store/messages";

function Channels() {
    const channels = useSelector(state => state.channels.channelList)
    const dispatch = useDispatch()

    const changeChannel = (e, currChannel) => {
        dispatch(thunkGetAllMessages(currChannel))
    }

    if(!channels) return <Loading />

    if(channels[0]) {
        const defaultChannel = channels[0].id
        dispatch(thunkGetAllMessages(defaultChannel))
    }

    return (
        <ul>
            {channels.map(currChannel => (
                <li key={currChannel.id} onClick={(e) => changeChannel(e, currChannel.id)}>{currChannel.name}</li>
            ))}
        </ul>
    )
}

export default Channels