import React, {useRef } from "react";
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const ulRef = useRef();


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <ul ref={ulRef}>
        {/* {user ? (
          <ul className="nav-links-container">
            <li className="user-info">{user.username}</li>
            <li className="user-info">{user.email}</li>
            <li className="navlinks">
              <button className="nav-button" onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        ) :
         ( */}
          <ul className="nav-links-container">
            <li className="navlinks">
            <Link className="navlinks" id="login" to="/login">Login</Link>
            </li>
            <li className="navlinks">
            <Link className="navlinks" id="signup" to="/signup">Sign Up</Link>
            </li>
          </ul>
        {/* )
        } */}
      </ul>
    </>
  );
}

export default ProfileButton;
