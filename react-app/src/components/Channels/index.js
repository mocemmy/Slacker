import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import Loading from '../Loading';
import { thunkGetAllMessages } from "../../store/messages";
import Messages from "../Messages";
import './channelList.css'

function Channels() {
    const channels = useSelector(state => state.channels.channelList)
    const dispatch = useDispatch()
    const [defaultChannel, setDefaultChannel] = useState()
    const [currChannelName, setCurrChannelName] = useState()

    const changeChannel = (e, currChannel) => {
        dispatch(thunkGetAllMessages(currChannel.id))
        setDefaultChannel(currChannel.id)
        setCurrChannelName(currChannel.name)
    }

    useEffect(() => {
            if (channels && channels[0].id) {
                setDefaultChannel(channels[0].id)
                setCurrChannelName(channels[0].name)
                dispatch(thunkGetAllMessages(channels[0].id))
            }

    }, [channels, dispatch])

    if (!channels) return <Loading />


    return (
        <>
            <div id="channel-container">
                <ul id="channelList">
                    <h4 id="channelList-header">Channels</h4>
                    {channels.map(currChannel => (
                        <li
                            key={currChannel.id}
                            onClick={(e) => changeChannel(e, currChannel)} className={currChannel.id === defaultChannel ? "channelListItem selected": "channelListItem"}>
                            <div className="channelHashtag">
                                #
                            </div>
                            {currChannel.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div id="message-container">
                <div className="channel-title">{currChannelName}</div>
                <Messages channel={defaultChannel} />
            </div>
        </>
    )
}

export default Channels
