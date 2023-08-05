import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllServers } from "../../store/servers";
import { thunkGetAllChannels } from "../../store/channels";
import CreateServerForm from "../CreateServerForm";
import OpenModalButton from "../OpenModalButton";
import ServerListModalListItem from "./ServerListModalListItem";
import Loading from "../Loading";
import "./serverList.css";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import Channels from "../Channels";
import EditUser from "../EditUser";
import ConfirmModal from "../ConfirmModal";
import EmptyChannels from "../Loading/EmptyChannels";
import ProfileDropdown from "../ProfileDropdown";

const ServerList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showUserMenu, setUserMenu] = useState(false);
    const servers = useSelector((state) => state.server.serverList);
    const user = useSelector((state) => state.session.user);
    const [currServer, setCurrServer] = useState(null);
    const [currChannel, setCurrChannel] = useState();
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();

    useEffect(() => {
        const data = async () => {
            await dispatch(thunkGetAllServers());
            setIsLoaded(true);
        };
        data();
    }, [dispatch]);

    useEffect(() => {
        if (!showUserMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target))
                setUserMenu(false);
        };

        document.addEventListener("click", closeMenu); //close menu on click anywhere on document exept menu or button

        return () => document.removeEventListener("click", closeMenu);
    }, [showUserMenu]);
    useEffect(() => {
        if (isLoaded && servers && servers[0]) {
            if (!currServer) {
                setCurrServer(servers[0]);
                dispatch(thunkGetAllChannels(servers[0].id));
            } else {
                const updatedServer = servers.find(server => server.id === currServer.id)
                if (updatedServer) {
                    setCurrServer(updatedServer)
                    dispatch(thunkGetAllChannels(currServer.id))
                } else {
                    setCurrServer(servers[0])
                    dispatch(thunkGetAllChannels(servers[0].id))
                }
                // dispatch(thunkGetAllChannels(currServer.id))
            }
        }
    }, [servers, dispatch, isLoaded]);

    if (!isLoaded || !user || !currServer) return <Loading />;
    console.log('Server in ServerList', currServer)
    const changeServer = (e, server) => {
        // setDefaultServer(server.id);
        setCurrServer(server);
        dispatch(thunkGetAllChannels(server.id));
    };


    return (
        <>
            <div id="serverList-container">
                <ProfileDropdown setCurrChannel={setCurrChannel} setCurrServer={setCurrServer}/>

                <ul id="serverList">
                    {servers.map((server) => {
                        return (
                            <li
                                key={server.id}
                                title={server.name}
                                className="serverListItem"
                            >
                                <img
                                    src={server.profile_pic}
                                    alt={server.name}
                                    onClick={(e) => changeServer(e, server)}
                                    className={
                                        server.id === currServer.id
                                            ? "serverListImg selectedServer"
                                            : "serverListImg"
                                    }
                                ></img>
                            </li>
                        );
                    })}
                    <ServerListModalListItem modalComponent={<CreateServerForm />} />
                </ul>
            </div>
            {!!servers.length && <Channels server={currServer} currChannel={currChannel} setCurrChannel={setCurrChannel} />}
            {!servers.length && <EmptyChannels />}
        </>
    );
};

export default ServerList;
