import ServerListModalListItem from "../ServerList/ServerListModalListItem";
import CreateServerForm from "../CreateServerForm";
import ProfileDropdown from "../ProfileDropdown";

function EmptyServers({ setCurrChannel, setCurrServer }) {
    return (
        <>
            <div id="serverList-container">
                <ProfileDropdown setCurrChannel={setCurrChannel} setCurrServer={setCurrServer} />
                <ul id="serverList">
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

export default EmptyServers