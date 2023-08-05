const SET_SERVERS = 'servers/ALL'
const SET_SINGLE_SERVER = 'servers/new'
const REMOVE_EVERYTHING = 'server/everything'

const actionSetServers = (servers) => ({
    type: SET_SERVERS,
    servers
});

const actionSetSingleServer = (server) => ({
    type: SET_SINGLE_SERVER,
    server
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
        console.log('data', data)
        dispatch(actionSetSingleServer(data.server))
        return data
    } else {
        const errors = await response.json();
        console.log('errors', errors)
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
        // console.log('data', data)
        // dispatch(actionSetSingleServer(data.server))
        dispatch(thunkGetAllServers())
        return data
    } else {
        const errors = await response.json();
        console.log('errors', errors)
        return errors
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


const initialState = {
    serverList: null,
    singleServer: null,
}


export default function serverReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SERVERS:
            return { ...state, serverList: action.servers };
        case SET_SINGLE_SERVER:
            return { ...state, singleServer: action.server }
        case REMOVE_EVERYTHING:
            return { serverList: null }
        default:
            return state
    }
}
