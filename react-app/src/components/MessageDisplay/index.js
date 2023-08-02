import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteMessages, thunkEditMessage, thunkGetAllMessages } from '../../store/messages';
import socket from './socket'
import './MessageDisplay.css';

function MessageDisplay({ message, messageArr, setMessageArr, channel }) {
    const [toggleEdit, setToggleEdit] = useState(false);
    const [userMessage, setUserMessage] = useState(message.message_body);
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    useEffect(() => {

        // socket.on("edited_message", (data) => {
        //   if (message.id === data.id) {
        //     setUserMessage(data.message_body);
        //   }
        // });
        socket.on("deleted_message", (data) => {
            setMessageArr([]);
            dispatch(thunkDeleteMessages(data.id, data.room));
        });

        return () => {

            //   socket.off("edited_message");
            socket.off("deleted_message");
        };
    }, [message]);

    const handleDelete = () => {
        if (message.sent_by === currentUser.id) {
            socket.emit("delete_message", { id: message.id, channel: message.channel_id });
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
        socket.emit("edit_message", { id: message.id, channel: message.channel_id, message: userMessage });
        dispatch(thunkEditMessage(message.id, message.channel_id, userMessage));
        setToggleEdit(false);
    };

    const handleText = (e) => {
        const inputMessage = e.target.value;
        setUserMessage(inputMessage);
    };

    const editMessage = toggleEdit ? '' : 'hidden';
    const notEditMessage = !toggleEdit ? '' : 'hidden';
    const ownedMessage = currentUser.id === message.sent_by ? '' : 'hidden';

    const time = new Date(message.created_at);
    const dispTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return (
        <div className="message-display-container">
            <div className="message-header">
                <div className='user-info'>
                    <img src={message.profile_pic} alt="profile pic" />
                    <p>{`${message.first_name} ${message.last_name}`}</p>
                </div>
                <p>{dispTime}</p>
            </div>
            <div className={`message-body ${notEditMessage}`}>
                <div><p>{message.message_body}</p></div>
                <div>
                    <button onClick={handleUpdate} className={ownedMessage}>Edit</button>
                    <button onClick={handleDelete} className={ownedMessage}>Delete</button>
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
                        <button className="" onClick={handleCancel}>Cancel</button>
                        <button className="" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageDisplay;
