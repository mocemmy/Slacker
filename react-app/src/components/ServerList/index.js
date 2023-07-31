import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetAllServers } from "../../store/servers";



const ServerList = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const servers = useSelector(state => state.server.serverList)
    const dispatch = useDispatch()

    useEffect(() =>{
        const data = async () => {
            await dispatch(thunkGetAllServers())
            setIsLoaded(true)
        }
        data()
    }, [dispatch])



    if (!isLoaded) {
        return (
            <div>
                Loading...
            </div>
        )
    }


    return (
        <div>
            <ul>
                {servers.map(server => {
                    return (
                        <li key={server.id}>
                            <img src={server.profile_pic} alt={server.name}></img>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ServerList
