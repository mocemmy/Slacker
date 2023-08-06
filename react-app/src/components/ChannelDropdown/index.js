import { useDispatch, useSelector } from "react-redux";
import { thunkLeaveChannel } from "../../store/channels";
import { thunkDeleteChannel } from "../../store/channels";
import Loading from "../Loading";
import { useRef, useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton";
import ChannelForm from "../ChannelForm";
import ConfirmModal from "../ConfirmModal";

function ChannelDropdown({ currChannel, setCurrChannel, server }) {
  const currentUser = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channels.channelList);
  const [showChannelMenu, setShowChannelMenu] = useState(false);
  const dispatch = useDispatch();
  const channelRef = useRef();

  useEffect(() => {
    if (!showChannelMenu) return;

    const closeMenu = (e) => {
      if (channelRef.current && !channelRef.current.contains(e.target))
        setShowChannelMenu(false);
    };

    document.addEventListener("click", closeMenu); //close menu on click anywhere on document exept menu or button

    return () => document.removeEventListener("click", closeMenu);
  }, [showChannelMenu]);

  if (!currentUser) return <Loading />;

  const handleLeaveChannel = () => {
    if (currentUser.id === 15 || currentUser.id === 16) {
      window.alert(
        "Demo users can't leave existing channels, Please create your own channel."
      );
    } else {
      dispatch(thunkLeaveChannel(currChannel.id, server.id));
    }
  };

  const handleDeleteChannel = async () => {
    await dispatch(thunkDeleteChannel(currChannel.id, server.id));
    setCurrChannel(channels[0])
  };


  const toggleChannelMenu = () => {
    if (!showChannelMenu) setShowChannelMenu(true);
    else setShowChannelMenu(false);
};

  const ulChannelName = showChannelMenu ? "ul-dropdown" : "ul-dropdown hidden";

  const ownedChannel =
    currentUser && currChannel && currentUser.id === currChannel.created_by
      ? "ul-channel"
      : "hidden";
  const notOwnedChannel =
    currentUser && currChannel && currentUser.id !== currChannel.created_by
      ? "ul-channel"
      : "hidden";

  return (
    <>
      <div
        className="channel-title"
        ref={channelRef}
        onClick={toggleChannelMenu}
      >
        <p>
          {currChannel.name}&nbsp;
          <i className="fa-solid fa-arrow-down-short-wide"></i>
        </p>
      </div>
      <div className={ulChannelName}>
        <ul className={ownedChannel}>
          <li>
            <OpenModalButton
              modalComponent={
                <ChannelForm
                  type="UPDATE"
                  channel={currChannel}
                  server={server}
                />
              }
              buttonText="Edit Channel"
            />
          </li>
          <li>
            <OpenModalButton
              buttonText={"Delete Channel"}
              modalComponent={
                <ConfirmModal
                  modalTitle={`Are you sure you want to delete the channel ${currChannel.name}?`}
                  yesHandler={handleDeleteChannel}
                />
              }
            />
          </li>
        </ul>
        <ul className={notOwnedChannel}>
          <li>
            <OpenModalButton
              buttonText={"Leave Channel"}
              modalComponent={
                <ConfirmModal
                  modalTitle={`Are you sure you want to leave ${currChannel.name}?`}
                  yesHandler={handleLeaveChannel}
                />
              }
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default ChannelDropdown;
