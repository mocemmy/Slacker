import OpenModalButton from "../OpenModalButton";
import ChannelForm from "../ChannelForm";
import EmptyServers from "./EmptyServers";
import ServerDropdown from "../ServerDropdown";
import ChannelSearch from "../SearchComponents/ChannelSearch";

function EmptyChannels({ server }) {
  if (!server) return <EmptyServers />;
  return (
    <>
      <div id="channel-container">
        <ServerDropdown server={server} />
        <ul id="channelList">
          <h4 id="channelList-header">No Channels</h4>

          <li className="channelListItem">
            <i className="fa-solid fa-plus"></i>&nbsp;&nbsp;
            <OpenModalButton
              buttonText="Add Channel"
              modalComponent={<ChannelForm type="CREATE" server={server} />}
            />
          </li>
          <li className="channelListItem">
            <i className="fa-solid fa-magnifying-glass"></i>
            <OpenModalButton
              buttonText="Search Channels"
              modalComponent={<ChannelSearch serverId={server.id} />}
            />
          </li>
        </ul>
      </div>
      <div id="message-container"></div>
    </>
  );
}

export default EmptyChannels;
