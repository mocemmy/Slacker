import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmptyChannels from "../Loading/EmptyChannels";
import { thunkGetAllMessages } from "../../store/messages";
import Messages from "../Messages";
import "./channelList.css";
import OpenModalButton from "../OpenModalButton";
import ChannelForm from "../ChannelForm";
import ServerDropdown from "../ServerDropdown";
import ChannelDropdown from "../ChannelDropdown";
import ChannelSearch from "../SearchComponents/ChannelSearch";

function Channels({ server, currChannel, setCurrChannel }) {
  const channels = useSelector((state) => state.channels.channelList);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrChannel(null)
    // eslint-disable-next-line
  }, [server.id])

  useEffect(() => {
    if (channels && channels[0]) {
      if (!currChannel) {
        setCurrChannel(channels[0]);
        dispatch(thunkGetAllMessages(channels[0].id));
      } else {
        const newChannel = channels.find(channel => channel.id === currChannel.id)
        if (newChannel) {
          setCurrChannel(newChannel)
          dispatch(thunkGetAllMessages(currChannel.id))
        } else {
          dispatch(thunkGetAllMessages(channels[0].id))
          setCurrChannel(channels[0])
        }
      }
    }
    // eslint-disable-next-line
  }, [channels, dispatch]);


  if (!channels || !channels.length || !currChannel) return <EmptyChannels server={server} />;
  const changeChannel = (e, currChannel) => {
    dispatch(thunkGetAllMessages(currChannel.id));
    setCurrChannel(currChannel);
  };

  return (
    <>
      <div id="channel-container">
        <ServerDropdown server={server} />
        <ul id="channelList">
          <h4 id="channelList-header">Channels</h4>
          {channels.map((channel) => (
            <li
              key={channel.id}
              onClick={(e) => changeChannel(e, channel)}
              className={
                channel.id === currChannel.id
                  ? "channelListItem selected"
                  : "channelListItem"
              }
            >
              <div className="channelHashtag">#</div>
              {channel.name}
            </li>
          ))}
          <li className="addChannelButton">
            <i className="fa-solid fa-plus plusIcon"></i>
            <OpenModalButton buttonText="Add Channel" modalComponent={<ChannelForm type="CREATE" server={server} setCurrChannel={setCurrChannel} />} />
          </li>
          <li className="addChannelButton">
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
            <OpenModalButton buttonText="Search Channels" modalComponent={<ChannelSearch serverId={server.id} />} />
          </li>
        </ul>
      </div>
      <div id="message-container">
        <ChannelDropdown currChannel={currChannel} setCurrChannel={setCurrChannel} server={server} />
        <Messages channel={currChannel.id} />
      </div>
    </>
  );
}

export default Channels;
