

function EmptyServers () {
    return (
        <div id="channel-container">
          <div className="server-title">
            <p>No Workspaces Yet!</p>
          </div>
          <ul id="channelList">
            <h4 id="channelList-header">No Channels</h4>
          </ul>
          <div id="message-container"></div>
        </div>
      );
}

export default EmptyServers