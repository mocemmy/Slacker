const SET_SERVERS = 'servers/ALL'

const setServers = (servers) => ({
    type: SET_SERVERS,
    servers
});

export const thunkGetAllServers = () => async (dispatch) => {
    const response = await fetch('/api/servers/')

    if (response.ok) {
        const data = await response.json();
        dispatch(setServers(data.servers))
    } else {
        return response
    }
}

const initialState = { serverList: null }


export default function serverReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SERVERS:
            return { ...state, serverList: action.servers };

        default:
            return state
    }
}
