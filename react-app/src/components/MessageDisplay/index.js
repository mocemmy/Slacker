import { thunkDeleteMessages, thunkGetAllMessages, thunkEditMessage } from '../../store/messages'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import './MessageDisplay.css'


function MessageDisplay({ message, messageArr, setMessageArr }) {
    const [toggleEdit, setToggleEdit] = useState(false)
    const [userMessage, setUserMessage] = useState(message.message_body);
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()


    const handleDelete = () => {
        if (message.sent_by === currentUser.id) {
            if (messageArr.length) {
                setMessageArr([])
            }
            dispatch(thunkDeleteMessages(message.id, message.channel_id))
        }
    }

    const handleUpdate = () => {
        if (message.sent_by === currentUser.id) {
            setToggleEdit(true)
        }
    }

    const handleCancel = () => {
        setToggleEdit(false)
    }

    const handleSave = () => {
        if (messageArr.length) {
            setMessageArr([])
        }
        dispatch(thunkEditMessage(message.id, message.channel_id, userMessage))
        setToggleEdit(false)
    }

    const handleText = (e) => {
        const inputMessage = e.target.value;
        setUserMessage(inputMessage);
    };

    const editMessage = toggleEdit ? '' : 'hidden'
    const notEditMessage = !toggleEdit ? '' : 'hidden'

    const ownedMessage = currentUser.id === message.sent_by ? '' : 'hidden'

    const time = new Date(message.created_at)
    const dispTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
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
    )
}

export default MessageDisplay;
