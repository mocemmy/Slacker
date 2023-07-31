import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './AppHomePage.css'
//import other components here

function AppHomePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  //redirect to home if not logged in
  if (!sessionUser) history.push("/");

  return (
    <div className="home-page-container">
      <div className="server-container">
        <h1>Servers</h1>
        <ul>
          <li>server 1</li>
          <li>server 2</li>
          <li>server 3</li>
        </ul>
      </div>
      <div className="channel-container">
        <h1>Channels</h1>
        <ul>
          <li>channel 1</li>
          <li>channel 2</li>
          <li>channel 3</li>
        </ul>
      </div>
      <div className="message-container">
        <h1>Messages</h1>
      </div>
    </div>
  );
}

export default AppHomePage;