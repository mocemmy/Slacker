import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllServers } from "../../store/servers";
import { thunkGetAllChannels } from "../../store/channels";
import CreateServerForm from "../CreateServerForm";
import ServerListModalListItem from "./ServerListModalListItem";
import Loading from "../Loading";
import "./serverList.css";
import Channels from "../Channels";
import EmptyChannels from "../Loading/EmptyChannels";
import ProfileDropdown from "../ProfileDropdown";
import EmptyServers from "../Loading/EmptyServers";
import OpenModalButton from "../OpenModalButton";
import WorkspaceSearch from "../SearchComponents/WorkspaceSearch";
import CreatorDropdown from "../CreatorDropdown";

const ServerList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const servers = useSelector((state) => state.server.serverList);
  const user = useSelector((state) => state.session.user);
  const [currServer, setCurrServer] = useState(null);
  const [currChannel, setCurrChannel] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const data = async () => {
      await dispatch(thunkGetAllServers());
      setIsLoaded(true);
    };
    data();
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded && servers && servers[0]) {
      if (!currServer) {
        setCurrServer(servers[0]);
        dispatch(thunkGetAllChannels(servers[0].id));
      } else {
        const updatedServer = servers.find(
          (server) => server.id === currServer.id
        );
        if (updatedServer) {
          setCurrServer(updatedServer);
          dispatch(thunkGetAllChannels(currServer.id));
        } else {
          setCurrServer(servers[0]);
          dispatch(thunkGetAllChannels(servers[0].id));
        }
      }
    }
    // eslint-disable-next-line
  }, [servers, dispatch, isLoaded]);

  if (servers && servers.length === 0)
    return (
      <EmptyServers
        server={currServer}
        setCurrChannel={setCurrChannel}
        setCurrServer={setCurrServer}
      />
    );
  if (!isLoaded || !user || !currServer) return <Loading />;

  const changeServer = (e, server) => {
    setCurrServer(server);
    dispatch(thunkGetAllChannels(server.id));
  };

  return (
    <>
      <div id="serverList-container">
        <ProfileDropdown
          setCurrChannel={setCurrChannel}
          setCurrServer={setCurrServer}
        />

        <ul id="serverList">
          <div className="servers">
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
          </div>
          <div className="servers">
            <li id="search-servers" className="serverListItem">
              <OpenModalButton
                buttonText={<i className="fa-solid fa-magnifying-glass"></i>}
                modalComponent={<WorkspaceSearch />}
              />
            </li>
            <ServerListModalListItem modalComponent={<CreateServerForm />} />
            <li id="search-servers" className="serverListItem">
              <OpenModalButton
                buttonText={<i className="fa-solid fa-brain"></i>}
                modalComponent={<CreatorDropdown />}
              />
            </li>
          </div>
        </ul>
      </div>
      {!!servers.length && (
        <Channels
          server={currServer}
          currChannel={currChannel}
          setCurrChannel={setCurrChannel}
        />
      )}
      {!servers.length && <EmptyChannels />}
    </>
  );
};

export default ServerList;
