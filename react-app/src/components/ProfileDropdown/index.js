import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import * as sessionActions from '../../store/session'
import { useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import EditUser from "../EditUser";
import ConfirmModal from "../ConfirmModal";
import { actionRemoveEverything } from "../../store/servers";
import { actionRemoveAllMessages } from "../../store/messages";
import { actionRemoveAllChannels } from "../../store/channels";

function ProfileDropdown({ setCurrServer, setCurrChannel }) {
    const user = useSelector(state => state.session.user)
    const [showUserMenu, setUserMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const ulRef = useRef();

    useEffect(() => {
        if (!showUserMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target))
                setUserMenu(false);
        };

        document.addEventListener("click", closeMenu); //close menu on click anywhere on document exept menu or button

        return () => document.removeEventListener("click", closeMenu);
    }, [showUserMenu]);

    if (!user) return <Loading />

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        dispatch(actionRemoveEverything())
        dispatch(actionRemoveAllMessages())
        dispatch(actionRemoveAllChannels())
        setCurrServer(null)
        setCurrChannel(null)
        history.push("/");
        closeMenu();
    };

    const handleDeleteUser = () => {
        if (user.id === 15 || user.id === 16) {
            window.alert("You can't delete the demo user!");
        } else {
            dispatch(sessionActions.thunkDeleteUser(user));
            history.push("/");
        }
    };

    const openMenu = () => {
        if (!showUserMenu) setUserMenu(true);
    };

    const closeMenu = () => setUserMenu(false);



    const ulClassName = "userDropdown-li" + (showUserMenu ? "" : " hidden");

    return (
        <>
            <div id="serverList-pfp-Container">
                <img
                    id="serverList-pfp"
                    alt="server pic"
                    src={user.profile_pic}
                    className="serverListImg"
                    onClick={openMenu}
                    title="Edit Profile"
                ></img>
            </div>

            <ul id="userDropdown" className={ulClassName} ref={ulRef}>
                <li className="userDropdown-li" id="user-first-lastName">
                    {user.first_name} {user.last_name}
                </li>
                <li className="userDropdown-li" id="user-email">
                    {user.email}
                </li>
                <li className="userDropdown-li pfpButton">
                    <OpenModalButton
                        buttonText="Edit User Information"
                        modalComponent={<EditUser user={user} />}
                    />
                </li>
                <li className="userDropdown-li pfpButton">
                    <OpenModalButton
                        buttonText="Delete User"
                        modalComponent={
                            <ConfirmModal
                                modalTitle="Are you sure you want to delete yourself?"
                                yesHandler={handleDeleteUser}
                            />
                        }
                    />
                </li>
                <li className="userDropdown-li pfpButton">
                    <button onClick={(e) => logout(e)}>Logout</button>
                </li>
            </ul>
        </>
    );
}

export default ProfileDropdown;
