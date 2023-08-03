import React, {useRef } from "react";
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { logout, login } from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const ulRef = useRef();


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const demoUser = (e, num) => {
    let email, password;
    if (num ===1){
      //login as Stanley
      email='stanley@office.com'
      password='password'
    } else {
      email='robert@office.com'
      password='password'
      //login as Robert
    }
    dispatch(login(email, password))
  }

  return (
    <>
      <ul ref={ulRef}>
        {user ? (
          <ul className="nav-links-container">
            <li className="navlinks">
              <button className="nav-button" onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        ) :
         (
          <ul className="nav-links-container">
            <li><button onClick={(e) => demoUser(e, 1)} className="demo-button">Log in as Demo User 1</button></li>
            <li><button onClick={(e) => demoUser(e, 2)} className="demo-button">Log in as Demo User 2</button></li>
            <li className="navlinks">
            <Link className="navlinks" id="login" to="/login">Login</Link>
            </li>
            <li className="navlinks">
            <Link className="navlinks" id="signup" to="/signup">Sign Up</Link>
            </li>
          </ul>
        )
        }
      </ul>
    </>
  );
}

export default ProfileButton;
