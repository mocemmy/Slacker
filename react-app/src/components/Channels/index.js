import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading";
import { thunkGetAllMessages } from "../../store/messages";
import Messages from "../Messages";
import "./channelList.css";
import OpenModalButton from "../OpenModalButton";
import ConfirmModal from "../ConfirmModal";
import { thunkLeaveServer } from "../../store/servers";

function Channels({ server }) {
    const channels = useSelector((state) => state.channels.channelList);
    const dispatch = useDispatch();
    const [defaultChannel, setDefaultChannel] = useState();
    const [currChannel, setCurrChannel] = useState();
    const currentUser = useSelector((state) => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const [showChannelMenu, setShowChannelMenu] = useState(false);
    const ulRef = useRef();
    const channelRef = useRef();

    const changeChannel = (e, currChannel) => {
        dispatch(thunkGetAllMessages(currChannel.id));
        setDefaultChannel(currChannel.id);
        setCurrChannel(currChannel);
    };

    const leaveServer = async () => {
        await dispatch(thunkLeaveServer(server.id));
    }

    useEffect(() => {
        if (channels && channels[0].id) {
            setDefaultChannel(channels[0].id);
            setCurrChannel(channels[0]);
            dispatch(thunkGetAllMessages(channels[0].id));
        }
    }, [channels, dispatch]);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target))
                setShowMenu(false);
        };

        document.addEventListener("click", closeMenu); //close menu on click anywhere on document exept menu or button

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    useEffect(() => {
        if (!showChannelMenu) return;

        const closeMenu = (e) => {
            if (channelRef.current && !channelRef.current.contains(e.target))
                setShowChannelMenu(false);
        };

        document.addEventListener("click", closeMenu); //close menu on click anywhere on document exept menu or button

        return () => document.removeEventListener("click", closeMenu);
    }, [showChannelMenu]);

    const toggleMenu = () => {
        if (!showMenu) setShowMenu(true);
        else setShowMenu(false);
    };

    const toggleChannelMenu = () => {
        if (!showChannelMenu) setShowChannelMenu(true);
        else setShowChannelMenu(false);
    };

    if (!channels || !currChannel) return <Loading />;

    const ownedWorkspace =
        currentUser && server && currentUser.id === server.created_by
            ? ""
            : "hidden";
    const notOwnedWorkspace =
        currentUser && server && currentUser.id !== server.created_by
            ? ""
            : "hidden";

    const ulClassName = showMenu ? "" : "hidden";
    const ulChannelName = showChannelMenu ? "" : "hidden";

    const ownedChannel =
        currentUser && currChannel && currentUser.id === currChannel.created_by
            ? ""
            : "hidden";
    const notOwnedChannel =
        currentUser && currChannel && currentUser.id !== currChannel.created_by
            ? ""
            : "hidden";
    console.error(ownedChannel);

    return (
        <>
            <div id="channel-container">
                <div className="server-title" ref={ulRef} onClick={toggleMenu}>
                    <p>{server.name}</p>
                    <div className={ulClassName}>
                        <ul className={ownedWorkspace}>
                            <li>Edit Workspace</li>
                            <li>Delete Workspace</li>
                        </ul>
                        <ul className={notOwnedWorkspace}>
                            <li>
                                <OpenModalButton buttonText={"Leave workspace"}
                                    modalComponent={<ConfirmModal
                                        modalTitle={`Are you sure you want to leave ${server.name}?`}
                                        yesHandler={() => leaveServer()} />} /></li>
                        </ul>
                    </div>
                </div>
                <ul id="channelList">
                    <h4 id="channelList-header">Channels</h4>
                    {channels.map((currChannel) => (
                        <li
                            key={currChannel.id}
                            onClick={(e) => changeChannel(e, currChannel)}
                            className={
                                currChannel.id === defaultChannel
                                    ? "channelListItem selected"
                                    : "channelListItem"
                            }
                        >
                            <div className="channelHashtag">#</div>
                            {currChannel.name}
                        </li>
                    ))}
                    <li className="channelListItem">
                        <i className="fa-solid fa-plus"></i>&nbsp;&nbsp;
                        <OpenModalButton buttonText="Add Channel" />
                    </li>
                </ul>
            </div>
            <div id="message-container">
                <div
                    className="channel-title"
                    ref={channelRef}
                    onClick={toggleChannelMenu}
                >
                    <p>{currChannel.name}</p>
                    <div className={ulChannelName}>
                        <ul className={ownedChannel}>
                            <li>Edit Channel</li>
                            <li>Delete Channel</li>
                        </ul>
                        <ul className={notOwnedChannel}>
                            <li>Leave Channel</li>
                        </ul>
                    </div>
                </div>
                <Messages channel={defaultChannel} />
            </div>
        </>
    );
}

export default Channels;
