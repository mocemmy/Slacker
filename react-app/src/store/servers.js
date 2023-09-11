const SET_SERVERS = 'servers/ALL'
const SET_SINGLE_SERVER = 'servers/new'
const REMOVE_EVERYTHING = 'server/everything'
const SEARCH_SERVER = 'server/SEARCH_SERVERS'

const actionSetServers = (servers) => ({
    type: SET_SERVERS,
    servers
});

const actionSetSingleServer = (server) => ({
    type: SET_SINGLE_SERVER,
    server
})

const actionSearchServer = (servers) => ({
    type: SEARCH_SERVER,
    servers
})

export const actionRemoveEverything = () => ({
    type: REMOVE_EVERYTHING
})

export const thunkGetAllServers = () => async (dispatch) => {
    //get list of user's servers
    const response = await fetch('/api/servers/')

    if (response.ok) {
        const data = await response.json();
        dispatch(actionSetServers(data.servers))
        return data
    } else {
        return response
    }
}

export const thunkCreateNewServer = (server) => async (dispatch) => {
    const response = await fetch('/api/servers/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(server)
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(actionSetSingleServer(data.server))
        return data
    } else {
        const errors = await response.json();
        return errors
    }
}

export const thunkUpdateServerById = (server, serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(server)
    })
    if (response.ok) {
        const data = await response.json();
        // dispatch(actionSetSingleServer(data.server))
        dispatch(thunkGetAllServers())
        return data
    } else {
        const errors = await response.json();
        return errors
    }
}
export const thunkJoinServer = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/join`)

    if(response.ok){
        const data = await response.json();
        dispatch(thunkGetAllServers())
        return data
    } else {
        const errors = await response.json()
        return errors;
    }
}
export const thunkLeaveServer = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/leave`);

    if (response.ok) {
        const data = await response.json()
        await dispatch(thunkGetAllServers())
        return data
    } else {
        const errors = await response.json();
        return errors
    }
}

export const thunkDeleteServer = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(thunkGetAllServers())
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkSearchServer = (search) => async (dispatch) => {
    const response = await fetch('/api/servers/search', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(search)
    })
    
    if(response.ok){
        const data = await response.json()
        dispatch(actionSearchServer(data.servers))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}


const initialState = {
    serverList: null,
    singleServer: null,
    searchServer: null
}


export default function serverReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SERVERS:
            return { ...state, serverList: action.servers };
        case SET_SINGLE_SERVER:
            return { ...state, singleServer: action.server }
        case REMOVE_EVERYTHING:
            return { serverList: null }
        case SEARCH_SERVER:
            return {...state, searchServer: action.servers}
        default:
            return state
    }
}
