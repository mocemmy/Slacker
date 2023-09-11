import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import {
  thunkBrowseChannels,
  thunkJoinChannel,
  thunkLeaveChannel,
  thunkSearchChannels,
} from "../../../store/channels";
import Loading from "../../Loading";

function ChannelSearch({ serverId }) {
  const { closeModal } = useModal();
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState(false);
  const searchResults = useSelector((state) => state.channels.searchChannels);
  const browseChannels = useSelector((state) => state.channels.browseChannels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkBrowseChannels(serverId));
  }, [dispatch]);
  
  if (!browseChannels) return <Loading />

  const handleSearch = () => {
    if (search.length) {
      dispatch(thunkSearchChannels(serverId, search));
      setSubmittedSearch(true);
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") handleSearch();
  };
  const joinChannel = (channelId) => {
    dispatch(thunkJoinChannel(channelId, serverId));
    closeModal();
  };
  const leaveChannel = (channelId) => {
    dispatch(thunkLeaveChannel(channelId, serverId));
    closeModal();
  };
  return (
    <div id="search-container">
      <h1>Search Channels</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search Channels"
          value={search}
          onKeyDown={handleEnter}
          onChange={(e) => setSearch(e.target.value)}
          id="search-bar"
        />
        <button type="submit" onClick={handleSearch} id="search-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {submittedSearch && searchResults && !!searchResults.length && (
        <div id="search-results-container">
          {searchResults.map((channel) => (
            <div key={channel.id}>
              {channel.name}
              {!channel.user_is_channel_member && (
                <button onClick={(e) => joinChannel(channel.id)}>
                  Join Channel
                </button>
              )}
              {channel.user_is_channel_member && (
                <button onClick={(e) => leaveChannel(channel.id)}>
                  Leave Channel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {submittedSearch && searchResults && !searchResults.length && (
        <p>No channels found</p>
      )}
      {!submittedSearch && (
        <div>
          {browseChannels.map((channel) => (
            <div key={channel.id}>
              {channel.name}
              <button onClick={(e) => joinChannel(channel.id)}>
                Join Channel
              </button>
            </div>
          ))}
        </div>
      )}
      {submittedSearch && searchResults && !searchResults.length && <p>No channels found</p>}
    </div>
  );
}

export default ChannelSearch;
