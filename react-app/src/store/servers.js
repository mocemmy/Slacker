const SET_SERVERS = 'servers/ALL'

const actionSetServers = (servers) => ({
    type: SET_SERVERS,
    servers
});

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

const initialState = { serverList: null}


export default function serverReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SERVERS:
            return { ...state, serverList: action.servers };

        default:
            return state
    }
}
