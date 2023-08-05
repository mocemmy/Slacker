import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmptyChannels from "../Loading/EmptyChannels";
import { thunkGetAllMessages } from "../../store/messages";
import Messages from "../Messages";
import "./channelList.css";
import OpenModalButton from "../OpenModalButton";
import ConfirmModal from "../ConfirmModal";
import { thunkLeaveChannel, thunkDeleteChannel } from "../../store/channels";
import ChannelForm from "../ChannelForm";
import ServerDropdown from "../ServerDropdown";

function Channels({ server }) {
    const channels = useSelector((state) => state.channels.channelList);
    const dispatch = useDispatch();
    const [currChannel, setCurrChannel] = useState();
    const currentUser = useSelector((state) => state.session.user);
    
    const [showChannelMenu, setShowChannelMenu] = useState(false);
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
                dispatch(thunkGetAllMessages(currChannel.id))
            }
        }
    }, [channels, dispatch]);



    useEffect(() => {
        if (!showChannelMenu) return;

        const closeMenu = (e) => {
            if (channelRef.current && !channelRef.current.contains(e.target))
                setShowChannelMenu(false);
        };

        document.addEventListener("click", closeMenu); //close menu on click anywhere on document exept menu or button

        return () => document.removeEventListener("click", closeMenu);
    }, [showChannelMenu]);

    if (!channels || !channels.length || !currChannel) return <EmptyChannels server={server} />;
    const changeChannel = (e, currChannel) => {
        dispatch(thunkGetAllMessages(currChannel.id));
        // setDefaultChannel(currChannel.id);
        setCurrChannel(currChannel);
    };

    

    const toggleChannelMenu = () => {
        if (!showChannelMenu) setShowChannelMenu(true);
        else setShowChannelMenu(false);
    };

    const ulChannelName = showChannelMenu ? "ul-dropdown" : "ul-dropdown hidden";

    const ownedChannel =
        currentUser && currChannel && currentUser.id === currChannel.created_by
            ? "ul-channel"
            : "hidden";
    const notOwnedChannel =
        currentUser && currChannel && currentUser.id !== currChannel.created_by
            ? "ul-channel"
            : "hidden";

    const handleLeaveChannel = () => {
        if (currentUser.id == 15 || currentUser.id == 16) {
            window.alert("Demo users can't leave existing channels, Please create your own channel.")
        } else {
            dispatch(thunkLeaveChannel(currChannel.id, server.id))
        }
    }

    const handleDeleteChannel = () => {
        dispatch(thunkDeleteChannel(currChannel.id, server.id))
    }


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
                <div
                    className="channel-title"
                    ref={channelRef}
                    onClick={toggleChannelMenu}
                >
                    <p>{currChannel.name}&nbsp;<i class="fa-solid fa-arrow-down-short-wide"></i></p>
                </div>
                <div className={ulChannelName}>
                    <ul className={ownedChannel}>
                        <li>
                            <OpenModalButton modalComponent={<ChannelForm type="UPDATE" channel={currChannel} server={server} />} buttonText="Edit Channel" />
                        </li>
                        <li>
                            <OpenModalButton buttonText={'Delete Channel'} modalComponent={<ConfirmModal modalTitle={`Are you sure you want to delete the channel ${currChannel.name}?`} yesHandler={handleDeleteChannel} />} />
                        </li>
                    </ul>
                    <ul className={notOwnedChannel}>
                        <li>
                            <OpenModalButton
                                buttonText={"Leave Channel"}
                                modalComponent={
                                    <ConfirmModal
                                        modalTitle={`Are you sure you want to leave ${currChannel.name}?`}
                                        yesHandler={handleLeaveChannel}
                                    />}
                            />
                        </li>
                    </ul>
                </div>
                <Messages channel={currChannel.id} />
            </div>
        </>
    );
}

export default Channels;
