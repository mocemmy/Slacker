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
    if (!sessionUser) history.push("/");

    return (
        <div className="home-page-container">
            <ServerList />
        </div>
    );
}

export default AppHomePage;
