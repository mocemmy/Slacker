import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmptyChannels from "../Loading/EmptyChannels";
import { thunkGetAllMessages } from "../../store/messages";
import Messages from "../Messages";
import "./channelList.css";
import OpenModalButton from "../OpenModalButton";
import ChannelForm from "../ChannelForm";
import ServerDropdown from "../ServerDropdown";
import ChannelDropdown from "../ChannelDropdown";

function Channels({ server, currChannel, setCurrChannel }) {
    const channels = useSelector((state) => state.channels.channelList);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);


    const ulRef = useRef();
    const channelRef = useRef();

    useEffect(() => {
        setCurrChannel(null)
    }, [server.id])

    useEffect(() => {
        if (channels && channels[0]) {
            if (!currChannel) {
                setCurrChannel(channels[0]);
                dispatch(thunkGetAllMessages(channels[0].id));
            } else {
                const newChannel = channels.find(channel => channel.id === currChannel.id)
                setCurrChannel(newChannel)
                dispatch(thunkGetAllMessages(currChannel.id))
            }
        }
    }, [channels, dispatch]);


    if (!channels || !channels.length || !currChannel) return <EmptyChannels server={server} />;
    const changeChannel = (e, currChannel) => {
        dispatch(thunkGetAllMessages(currChannel.id));
        // setDefaultChannel(currChannel.id);
        setCurrChannel(currChannel);
    };

    return (
        <>
            <div id="channel-container">
                <ServerDropdown server={server} />
                <ul id="channelList">
                    <h4 id="channelList-header">Channels</h4>
                    {channels.map((channel) => (
                        <li
                            key={channel.id}
                            onClick={(e) => changeChannel(e, channel)}
                            className={
                                channel.id === currChannel.id
                                    ? "channelListItem selected"
                                    : "channelListItem"
                            }
                        >
                            <div className="channelHashtag">#</div>
                            {channel.name}
                        </li>
                    ))}
                    <li className="channelListItem">
                        <i className="fa-solid fa-plus"></i>&nbsp;&nbsp;
                        <OpenModalButton buttonText="Add Channel" modalComponent={<ChannelForm type="CREATE" server={server} />} />
                    </li>
                </ul>
            </div>
            <div id="message-container">
                <ChannelDropdown currChannel={currChannel} setCurrChannel={setCurrChannel} server={server} />
                <Messages channel={currChannel.id} />
            </div>
        </>
    );
}

export default Channels;
