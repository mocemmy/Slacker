import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkSearchServer } from "../../../store/servers";

function WorkspaceSearch() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState(false);
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.server.searchServer);

  useEffect(() => {

  }, [])

  const handleSearch = () => {
    if (search.length) {
      //dispatch thunk to search route in backend
      dispatch(thunkSearchServer(search))
      setSubmittedSearch(true);
    }
    console.log(searchResults)
  };
  const handleEnter = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") handleSearch();
  };

  const joinWorkspace = () => {

  }
  
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
              <button onClick={joinWorkspace}>
                Join Workspace
              </button>
            </div>
          ))}
        </div>
      )}
      {submittedSearch && searchResults && !searchResults.length && <p>No workspaces found</p>}
    </>
  );
}

export default WorkspaceSearch;
