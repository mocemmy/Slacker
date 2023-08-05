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

const ServerList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showUserMenu, setUserMenu] = useState(false);
    const servers = useSelector((state) => state.server.serverList);
    const user = useSelector((state) => state.session.user);
    // const [defaultServer, setDefaultServer] = useState(null);
    const [currServer, setCurrServer] = useState(null);
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
                setCurrServer(updatedServer)
                dispatch(thunkGetAllChannels(currServer.id))
            }
        }
    }, [servers, dispatch, isLoaded]);

    // useEffect(() => {
    //     setDefaultServer(currServer);
    // }, [currServer])

    if (!isLoaded || !user || !currServer) return <Loading />;
    console.log('Server in ServerList', currServer)
    const changeServer = (e, server) => {
        // setDefaultServer(server.id);
        setCurrServer(server);
        dispatch(thunkGetAllChannels(server.id));
    };

    const openMenu = () => {
        if (!showUserMenu) setUserMenu(true);
    };

    const closeMenu = () => setUserMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/");
        closeMenu();
    };

    const handleDeleteUser = () => {
        if (user.id === 15 || user.id === 16) {
            window.alert("You can't delete the demo user!");
        } else {
            dispatch(sessionActions.thunkDeleteUser(user));
            history.push("/");
        }
    };

    const ulClassName = "userDropdown-li" + (showUserMenu ? "" : " hidden");

    return (
        <>
            <div id="serverList-container">
                <div id="serverList-pfp-Container">
                    <img
                        id="serverList-pfp"
                        alt="server pic"
                        src={user.profile_pic}
                        className="serverListImg"
                        onClick={openMenu}
                        title="Edit Profile"
                    ></img>
                </div>

                <ul id="userDropdown" className={ulClassName} ref={ulRef}>
                    <li className="userDropdown-li" id="user-first-lastName">
                        {user.first_name} {user.last_name}
                    </li>
                    <li className="userDropdown-li" id="user-email">
                        {user.email}
                    </li>
                    <li className="userDropdown-li pfpButton">
                        <OpenModalButton
                            buttonText="Edit User Information"
                            modalComponent={<EditUser user={user} />}
                        />
                    </li>
                    <li className="userDropdown-li pfpButton">
                        <OpenModalButton
                            buttonText="Delete User"
                            modalComponent={
                                <ConfirmModal
                                    modalTitle="Are you sure you want to delete yourself?"
                                    yesHandler={handleDeleteUser}
                                />
                            }
                        />
                    </li>
                    <li className="userDropdown-li pfpButton">
                        <button
                            onClick={(e) => logout(e)}
                        >
                            Logout
                        </button>
                    </li>
                </ul>

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
            {!!servers.length && <Channels server={currServer} />}
            {!servers.length && <EmptyChannels />}
        </>
    );
};

export default ServerList;
