import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetAllServers } from "../../store/servers";
import { thunkGetAllChannels } from "../../store/channels";
import ConfirmLogout from "../ConfirmLogoutModal";
import OpenModalButton from '../OpenModalButton'
import ProfileListModalButton from './ProfileListModalButton';
import Loading from '../Loading';
import './serverList.css'


const ServerList = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [showUserMenu, setUserMenu] = useState(false)
    const servers = useSelector(state => state.server.serverList)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const data = async () => {
            await dispatch(thunkGetAllServers())
            setIsLoaded(true)
        }
        data()
    }, [dispatch])

    if (!isLoaded) return <Loading />

    if (servers[0]) {
        const defaultServer = servers[0].id
        dispatch(thunkGetAllChannels(defaultServer))
    }

    const changeServer = (e, serverId) => {
        dispatch(thunkGetAllChannels(serverId))
    }

    const toggleMenu = () => {
        showUserMenu ? setUserMenu(false) : setUserMenu(true)
    }

    return (
        <div id="serverList-container">
            <div id="serverList-pfp-Container">
                <img
                    id="serverList-pfp"
                    src={user.profile_pic}
                    className="serverListImg"
                    onClick={toggleMenu}
                ></img>
            </div>

            <ul id="userDropdown" className={showUserMenu ? "hidden" : ""}>
                <li className="userDropdown-li" id="user-first-lastName">{user.first_name} {user.last_name}</li>
                <li className="userDropdown-li" id="user-email">{user.email}</li>
                <li className="userDropdown-li pfpButton">
                    < OpenModalButton
                        buttonText='Change Profile pic'
                    />
                </li>
                <li className="userDropdown-li logoutButton">
                    < ProfileListModalButton
                        buttonText='Logout'
                        onButtonClick={toggleMenu}
                        modalComponent={ConfirmLogout()}
                    />
                </li>

            </ul>

            <ul id="serverList">
                {servers.map(server => {
                    return (
                        <li key={server.id} className="serverListItem">
                            <img
                                src={server.profile_pic}
                                alt={server.name}
                                onClick={e => changeServer(e, server.id)}
                                className="serverListImg"></img>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ServerList
