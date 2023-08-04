import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import ConfirmModal from "../ConfirmModal";
import "./MessageDisplay.css";

function MessageDisplay({
  socketInstance,
  channel_id,
  message,
  messageArr,
  setMessageArr,
}) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [userMessage, setUserMessage] = useState(message.message_body);
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  const menuRef = useRef();

  useEffect(() => {
    if (!showMessageMenu) return;

    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMessageMenu(false);
      }
    };

    document.addEventListener("click", closeMenu); //close menu on click anywhere on document exept menu or button

    return () => document.removeEventListener("click", closeMenu);
  }, [showMessageMenu]);

  if (!message) return <h1>No Messages to Display</h1>;

  const openMenu = () => {
    if (!showMessageMenu) setShowMessageMenu(true);
    else setShowMessageMenu(false);
  };

  const handleDelete = () => {
    if (message.sent_by === currentUser.id) {
      if (messageArr.length) {
        setMessageArr([]);
      }
      const data = {
        type: "DELETE",
        id: message.id,
        room: channel_id.toString(),
      };
      socketInstance.emit("my_message", data);
    }
  };

  const handleUpdate = () => {
    if (message.sent_by === currentUser.id) {
      setToggleEdit(true);
    }
  };

  const handleCancel = () => {
    setToggleEdit(false);
  };

  const handleSave = () => {
    if (messageArr.length) {
      setMessageArr([]);
    }
    const data = {
      type: "UPDATE",
      message_body: userMessage,
      id: message.id,
      room: message.channel_id.toString(),
    };
    socketInstance.emit("my_message", data);
    setToggleEdit(false);
  };

  const handleText = (e) => {
    const inputMessage = e.target.value;
    setUserMessage(inputMessage);
  };

  const editMessage = toggleEdit ? "" : "hidden";
  const notEditMessage = !toggleEdit ? "" : "hidden";

  const ownedMessage =
    currentUser && currentUser.id === message.sent_by ? "" : "hidden";
  const menuHidden = showMessageMenu ? "" : "hidden";

  const time = new Date(message.created_at);
  const dispTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <div className="message-display-container">
      <div className="message-header">
        <div className="user-info">
          <img src={message.profile_pic} alt="profile pic" />
          <p>{`${message.first_name} ${message.last_name}`}</p>
        </div>
        {message.edited && <p>Edited</p>}
        <p>{dispTime}</p>
      </div>
      <div className={`message-body ${notEditMessage}`}>
        <div>
          <p>{message.message_body}</p>
        </div>
        <div className="menu-options-container">
          <div className="options-container">
            <button onClick={handleUpdate} className={menuHidden}>
              Edit
            </button>
            <div className={menuHidden}>
              <OpenModalButton
                buttonText={"Delete"}
                modalComponent={
                  <ConfirmModal
                    modalTitle={"Are you sure you want to delete this message?"}
                    yesHandler={handleDelete}
                  />
                }
              />
            </div>
          </div>
          <div className={ownedMessage}>
            <button id="message-menu" onClick={openMenu} ref={menuRef}>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
        </div>
      </div>
      <div className={`message-edit ${editMessage}`}>
        <div className="input-container">
          <input
            className="message-input"
            type="text"
            value={userMessage}
            onChange={handleText}
          />
          <div>
            <button className="" onClick={handleCancel}>
              Cancel
            </button>
            <button className="" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageDisplay;
