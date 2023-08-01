import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetAllServers } from "../../store/servers";
import { thunkGetAllChannels } from "../../store/channels";
import Loading from '../Loading';
import './serverList.css'


const ServerList = () => {
    const [isLoaded, setIsLoaded] = useState(false)
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

    return (
        <div id="serverList-container">
            <img
                src={user.profile_pic}
                className="serverListImg"
            ></img>

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
