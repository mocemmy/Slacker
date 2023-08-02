const SET_SERVERS = 'servers/ALL'
const SET_SINGLE_SERVER = 'servers/new'

const actionSetServers = (servers) => ({
    type: SET_SERVERS,
    servers
});

const actionSetSingleServer = (server) => ({
    type: SET_SINGLE_SERVER,
    server
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

export const thunkCreateNewServer = () => async (dispatch) => {
    const response = await fetch('/api/servers/new', {
        methods: 'POST',
        headers: { 'Content=Type': 'application/json' }
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(actionSetSingleServer(data.server))
    } else {
        return response
    }
}

const initialState = { serverList: null }


export default function serverReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SERVERS:
            return { ...state, serverList: action.servers };
        case SET_SINGLE_SERVER:
            return { ...state, serverList: { ...state.serverList }, singleServer: action.server }
        default:
            return state
    }
}
