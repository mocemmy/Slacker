import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { io } from "socket.io-client";
import MessageDisplay from "../MessageDisplay";
import { thunkGetAllMessages } from "../../store/messages";
import { useDispatch } from "react-redux";
import './MessageList.css'

function Messages({ channel }) {
    const messages = useSelector((state) => state.messages.messageList);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [socketInstance, setSocketInstance] = useState(null);
    const [message, setMessage] = useState("");
    const [messageArr, setMessageArr] = useState([]);
    const messageEnd = useRef(null);
    const [charactersLeft, setCharactersLeft] = useState(500)
    const [errors, setErrors] = useState({})

    const handleText = (e) => {
        const inputMessage = e.target.value;

        const characterCount = e.target.value.length;
        setCharactersLeft(500 - characterCount);
        if (characterCount > 500) {
            setErrors({ characters: "Maximum of 500 characters allowed" })
        } else {
            setErrors({})
        }
        setMessage(inputMessage);
    };

    const handleSubmit = () => {
        if (!message || !channel) return;
        const date = new Date();
        if (charactersLeft < 0) {
            setErrors({ characters: "Maximum of 500 characters allowed" })
        } else {

            const data = {
                type: "CREATE",
                channel: channel.toString(),
                message,
                sent_by: user.id,
                created_at: date,
                profile_pic: user.profile_pic,
                firstName: user.first_name,
                lastName: user.last_name,
            };

            socketInstance.emit("my_message", data);

            setMessage("");
            setErrors({})
            setCharactersLeft(500)
        }
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    let socket;
    useEffect(() => {
        // Establish socket connection when the component mounts
        socket =
        // eslint-disable-next-line
            process.env.NODE_ENV !== "production"
                ? io("http://localhost:5000")
                : io("https://slacker-chat-collab.onrender.com");

        setSocketInstance(socket);

        // Join the specific room when the component mounts
        if (socket && channel) {
            socket.emit("join", { room: channel.toString() });
        }

        return () => {
            // Clean up the socket connection and leave the room when the component unmounts
            if (socket && channel) {
                socket.emit("leave", { room: channel.toString() });
                socket.disconnect();
            }
        };
    }, [channel]);

    useEffect(() => {
        if (socketInstance) {
            socketInstance.on("my_message", (data) => {
                if (data.type === "CREATE") {
                    dispatch(thunkGetAllMessages(channel))
                }
                if (data.type === "UPDATE") {
                    if (messageArr.length) {
                        const index = messageArr.findIndex(
                            (subArr) => subArr[1].id === data.id
                        );
                        if (index > -1) {
                            messageArr[index][1].message_body = data.message_body;
                            setMessageArr([...messageArr]);
                        }
                    } else {
                        setMessageArr([]);
                        dispatch(thunkGetAllMessages(channel));
                    }
                }
                if (data.type === "DELETE") {
                    if (messageArr.length) {
                        const index = messageArr.findIndex(
                            (subArr) => subArr[1].id === data.id
                        );

                        if (index > -1) {
                            const updatedMessages = messageArr.slice(index, 1);
                            setMessageArr([...updatedMessages]);
                        }
                    } else {
                        setMessageArr([]);
                        dispatch(thunkGetAllMessages(channel));
                    }
                }
            });
        }
        // eslint-disable-next-line
    }, [socketInstance]);

    const scrollToBottom = () => {
        messageEnd.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, messageArr.length]);

    if (!messages) return <Loading />;

    return (
        <>
            <div className="message-list-container" id='message-list'>
                <ul className="message-list">
                    {messages.map((message) => (
                        <MessageDisplay
                            key={message.id}
                            channel_id={channel}
                            socketInstance={socketInstance}
                            message={message}
                            messageArr={messageArr}
                            setMessageArr={setMessageArr}
                        />
                    ))}
                    {messageArr.map((message, index) =>
                        message[0] === channel ? (
                            <MessageDisplay
                                key={index}
                                channel_id={channel}
                                socketInstance={socketInstance}
                                message={message[1]}
                                messageArr={messageArr}
                                setMessageArr={setMessageArr}
                            />
                        ) : null
                    )}
                    <div ref={messageEnd} className='scroll-to'></div>
                </ul>
            </div>
            <div className="message-input-footer">
                {errors.characters && <p className="errors">{errors.characters}</p>}
                <div className="input-container">
                    <input
                        className="message-input"
                        type="text"
                        value={message}
                        onChange={handleText}
                        onKeyDown={handleEnter}
                    />
                    {charactersLeft >= 0 && charactersLeft < 500 && <p className="character-count">{charactersLeft}</p>}
                    {charactersLeft < 0 && <p className="character-count-errors">{charactersLeft}</p>}
                    <button className="message-submit-button" onClick={handleSubmit}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Messages;
