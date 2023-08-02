import './MessageDisplay.css'


function MessageDisplay({ message }) {
    console.log(message.created_at)
    const time = new Date(message.created_at)
    const dispTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return (
        <div className="message-display-container">
            <div className="message-header">
                <div className='user-info'>

                <img src={message.profile_pic} alt="profile pic"/>
                <p>{`${message.first_name} ${message.last_name}`}</p>
                </div>
                <p>{dispTime}</p>
            </div>
            <p>{message.message_body}</p>
        </div>
    )
}

export default MessageDisplay;