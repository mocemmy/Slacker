import OpenModalButton from "../OpenModalButton";
import MessageDisplay from "../MessageDisplay";

function EmptyChannels ({server}) {
    return (
        <>
      <div id="channel-container">
        <div className="server-title" >
          <p>{server.name}</p>

        </div>
        <ul id="channelList">
          <h4 id="channelList-header">No Channels</h4>
          
          <li className="channelListItem">
            <i className="fa-solid fa-plus"></i>&nbsp;&nbsp;
            <OpenModalButton buttonText="Add Channel" />
          </li>
        </ul>
      </div>
      <div id="message-container">
      </div>
    </>
  );
    
}

export default EmptyChannels;