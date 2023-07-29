import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-content-container">
      <ul className="nav-container">
        <li className="navlinks">
          <NavLink className="home-link" exact to="/">
            slacker
          </NavLink>
        </li>
        {isLoaded && (
          <li className="navlinks">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
