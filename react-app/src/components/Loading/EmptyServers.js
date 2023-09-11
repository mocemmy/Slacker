import ServerListModalListItem from "../ServerList/ServerListModalListItem";
import CreateServerForm from "../CreateServerForm";
import ProfileDropdown from "../ProfileDropdown";
import OpenModalButton from "../OpenModalButton";
import WorkspaceSearch from "../SearchComponents/WorkspaceSearch";

function EmptyServers({ setCurrChannel, setCurrServer }) {
  return (
    <>
      <div id="serverList-container">
        <ProfileDropdown
          setCurrChannel={setCurrChannel}
          setCurrServer={setCurrServer}
        />
        <ul id="serverList">
          <li id="search-servers" className="serverListItem">
            <OpenModalButton
              buttonText={<i className="fa-solid fa-magnifying-glass"></i>}
              modalComponent={<WorkspaceSearch />}
            />
          </li>
          <ServerListModalListItem modalComponent={<CreateServerForm />} />
        </ul>
      </div>
      <div id="channel-container">
        <div id="serverNameContainer">
          <p id="serverName">No Workspaces Yet!</p>
        </div>
        <ul id="channelList">
          <h4 id="channelList-header">No Channels</h4>
        </ul>
      </div>
      <div id="message-container"></div>
    </>
  );
}

export default EmptyServers;
