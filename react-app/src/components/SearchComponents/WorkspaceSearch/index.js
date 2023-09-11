import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkJoinServer, thunkLeaveServer, thunkSearchServer } from "../../../store/servers";
import { useModal } from "../../../context/Modal";

function WorkspaceSearch() {
  const { closeModal } = useModal();
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState(false);
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.server.searchServer);

  const handleSearch = () => {
    if (search.length) {
      //dispatch thunk to search route in backend
      dispatch(thunkSearchServer(search))
      setSubmittedSearch(true);
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") handleSearch();
  };

  const joinWorkspace = (serverId) => {
    dispatch(thunkJoinServer(serverId))
    closeModal()

  }
  const leaveWorkspace = (serverId) => {
    dispatch(thunkLeaveServer(serverId))
    closeModal()
  }
//   console.log(searchResults)
  return (
    <>
      <h1>Search Workspaces</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search Workspaces"
          value={search}
          onKeyDown={handleEnter}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {submittedSearch && searchResults && !!searchResults.length && (
        <div>
          {searchResults.map((server) => (
            <div key={server.id}>
              {server.name}
              {!server.user_is_member && <button onClick={e => joinWorkspace(server.id)}>
                Join Workspace
              </button>}
              {server.user_is_member && <button onClick={e => leaveWorkspace(server.id)}>Leave Workspace</button>}
            </div>
          ))}
        </div>
      )}
      {submittedSearch && searchResults && !searchResults.length && <p>No workspaces found</p>}
    </>
  );
}

export default WorkspaceSearch;
