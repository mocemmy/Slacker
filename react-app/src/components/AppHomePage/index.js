import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './AppHomePage.css'
//import other components here
import Channels from "../Channels";
import ServerList from '../ServerList'

function AppHomePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  //redirect to home if not logged in
  //trash channel list:
  const channels = [{id: 1, name: "channel-1"}, {id: 2, name: "channel-2"}, {id: 3, name: "channel-3"}]
  if (!sessionUser) history.push("/");

  return (
    <div className="home-page-container">
      <div className="server-container">
        <ServerList />
      </div>
      <div className="channel-container">
        <h1>Channels</h1>
        <ul>
            <Channels channels={channels} />
        </ul>
      </div>
    </div>
  );
}

export default AppHomePage;