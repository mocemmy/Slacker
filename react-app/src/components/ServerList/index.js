import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllServers } from "../../store/servers";
import { thunkGetAllChannels } from "../../store/channels";
import ConfirmLogout from "../ConfirmLogoutModal";
import CreateServerForm from "../CreateServerForm";
import OpenModalButton from '../OpenModalButton'
import ProfileListModalButton from './ProfileListModalButton';
import ServerListModalListItem from './ServerListModalListItem'
import Loading from '../Loading';
import './serverList.css'
import * as sessionActions from '../../store/session'
import { useHistory } from "react-router-dom";


const ServerList = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [showUserMenu, setUserMenu] = useState(false)
    const servers = useSelector(state => state.server.serverList)
    const user = useSelector(state => state.session.user)
    const [defaultServer, setDefaultServer] = useState(null)
    const dispatch = useDispatch()
    const ulRef = useRef();
    const history = useHistory();

    useEffect(() => {
        const data = async () => {
            await dispatch(thunkGetAllServers())
            setIsLoaded(true)
        }
        data()
    }, [dispatch])

    useEffect(() => {
        if (!showUserMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) setUserMenu(false)
        }

        document.addEventListener("click", closeMenu); //close menu on click anywhere on document exept menu or button

        return () => document.removeEventListener("click", closeMenu);

    }, [showUserMenu])
    
    useEffect(() => {
        if (servers && servers[0]) {
            setDefaultServer(servers[0].id)
            dispatch(thunkGetAllChannels(servers[0].id))
        }
    }, [servers, dispatch])
    
    if (!isLoaded) return <Loading />

    const changeServer = (e, serverId) => {
        setDefaultServer(serverId)
        dispatch(thunkGetAllChannels(serverId))
    }

    const openMenu = () => {
        if (!showUserMenu) setUserMenu(true);
    }

    const closeMenu = () => setUserMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
        closeMenu();
    };

    const ulClassName = "userDropdown-li" + (showUserMenu ? "" : " hidden");


    return (
        <div id="serverList-container">
            <div id="serverList-pfp-Container">
                <img
                    id="serverList-pfp"
                    src={user.profile_pic}
                    className="serverListImg"
                    onClick={openMenu}
                ></img>
            </div>

            <ul id="userDropdown" className={ulClassName} ref={ulRef}>
                <li className="userDropdown-li" id="user-first-lastName">{user.first_name} {user.last_name}</li>
                <li className="userDropdown-li" id="user-email">{user.email}</li>
                <li className="userDropdown-li pfpButton">
                    < OpenModalButton
                        buttonText='Change Profile pic'
                    />
                </li>
                <button className="userDropdown-li logoutButton" onClick={e => logout(e)}>Logout</button>

            </ul>

            <ul id="serverList">
                {servers.map(server => {
                    return (
                        <li key={server.id} title={server.name} className="serverListItem">
                            <img
                                src={server.profile_pic}
                                alt={server.name}
                                onClick={e => changeServer(e, server.id)}
                                className={server.id === defaultServer? "serverListImg selectedServer" : "serverListImg"}></img>
                        </li>
                    )
                })}
                <ServerListModalListItem modalComponent={<CreateServerForm />} />
            </ul>
        </div>
    )
}

export default ServerList
