import { useSelector, useDispatch } from "react-redux";
import EmptyServers from "../Loading/EmptyServers";
import Loading from "../Loading";
import OpenModalButton from "../OpenModalButton";
import { useRef, useState, useEffect } from "react";
import UpdateServerForm from "../UpdateServerForm";
import ConfirmModal from "../ConfirmModal";
import { thunkLeaveServer } from "../../store/servers";
import { thunkDeleteServer } from "../../store/servers";

function ServerDropdown ({ server }) {
    const currentUser = useSelector(state => state.session.user)
    const ulRef = useRef()
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target))
                setShowMenu(false);
        };
        document.addEventListener("click", closeMenu); //close menu on click anywhere on document exept menu or button
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    if (!server) return <EmptyServers />
    if (!currentUser) return <Loading />

    const leaveServer = async () => {
        if (currentUser.id == 15 || currentUser.id == 16) {
            window.alert("Demo users can't leave existing workspaces, Please create your own workspace.")
        } else {
            dispatch(thunkLeaveServer(server.id));
        }
    }

    const deleteServer = async () => {
        await dispatch(thunkDeleteServer(server.id))
    }
    
    const toggleMenu = () => {
        if (!showMenu) setShowMenu(true);
        else setShowMenu(false);
    };

    const ulClassName = showMenu ? "workspace-dropdown" : "hidden";
    const ownedWorkspace =
    currentUser && server && currentUser.id === server.created_by
        ? ""
        : "hidden";
const notOwnedWorkspace =
    currentUser && server && currentUser.id !== server.created_by
        ? ""
        : "hidden";


    return (
        <div className="server-title" ref={ulRef} onClick={toggleMenu}>
            <div id="serverNameContainer">
                        <p id="serverName">{server.name}&nbsp;<i class="fa-solid fa-arrow-down-short-wide"></i></p>
                    </div>
                    <div className={ulClassName}>
                        <ul className={ownedWorkspace}>
                            <li>
                                <OpenModalButton
                                    buttonText={"Edit Workspace"}
                                    modalComponent={<UpdateServerForm currentServer={server} />}
                                />
                            </li>

                            <li>
                                <OpenModalButton
                                    buttonText={'Delete Workspace'}
                                    modalComponent={
                                        <ConfirmModal
                                            modalTitle={`Are you sure you want to delete ${server.name}?`}
                                            yesHandler={deleteServer}
                                        />}
                                />
                            </li>
                        </ul>
                        <ul className={notOwnedWorkspace}>
                            <li>
                                <OpenModalButton
                                    buttonText={"Leave Workspace"}
                                    modalComponent={
                                        <ConfirmModal
                                            modalTitle={`Are you sure you want to leave ${server.name}?`}
                                            yesHandler={leaveServer}
                                        />}
                                />
                            </li>
                        </ul>
                    </div>
        </div>
    )

}

export default ServerDropdown;