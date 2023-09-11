import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkBrowseServer,
  thunkJoinServer,
  thunkLeaveServer,
  thunkSearchServer,
} from "../../../store/servers";
import { useModal } from "../../../context/Modal";
import '../Search-modals.css'
import Loading from "../../Loading";

function WorkspaceSearch() {
  const { closeModal } = useModal();
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState(false);
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.server.searchServer);
  const browseServers = useSelector((state) => state.server.browseServer);
  useEffect(() => {
    dispatch(thunkBrowseServer());
  }, [dispatch]);


  if (!browseServers) return <Loading />;

  const handleSearch = () => {
    if (search.length) {
      //dispatch thunk to search route in backend
      dispatch(thunkSearchServer(search));
      setSubmittedSearch(true);
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") handleSearch();
  };

  const joinWorkspace = (serverId) => {
    dispatch(thunkJoinServer(serverId));
    closeModal();
  };
  const leaveWorkspace = (serverId) => {
    dispatch(thunkLeaveServer(serverId))
    closeModal()
  }

  //   console.log(searchResults)
  return (
    <div id="search-container">
      <h1>Search Workspaces</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder={"Search Workspaces"}
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
          {searchResults.map((server) => (
            <div key={server.id} className="searched-server">
              <img className="searched-server-pic" src={server.profile_pic}></img>
              {server.name}
              {!server.user_is_member && (
                <button className='searched-join-server-button' onClick={(e) => joinWorkspace(server.id)}>
                  Join Workspace
                </button>
              )}
              {server.user_is_member && (
                <button className='searched-leave-server-button' onClick={(e) => leaveWorkspace(server.id)}>
                  Leave Workspace
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {/* {submittedSearch && searchResults && !searchResults.length && (
        <p>No workspaces found</p>
      )} */}

      {!submittedSearch && (
        <div id="search-results-container">
          {browseServers.map((server) => (
            <div key={server.id} className="searched-server">
              <img className="searched-server-pic" src={server.profile_pic}></img>
              {server.name}
              <button className='searched-join-server-button' onClick={(e) => joinWorkspace(server.id)}>
                Join Workspace
              </button>
              {server.user_is_member && <button className='searched-leave-server-button' onClick={e => leaveWorkspace(server.id)}>
                Leave Workspace
              </button>}
            </div>
          ))}
        </div>
      )}

      {submittedSearch && searchResults && !searchResults.length && <p>No workspaces found</p>}
    </div>
  );
}

export default WorkspaceSearch;
