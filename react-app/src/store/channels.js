const GET_CHANNELS = 'channels/ALL'

const actionGetChannels = (channels) => ({
    type: GET_CHANNELS,
    channels
})


export const thunkGetAllChannels = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetChannels(data.channels))
    } else {
        return response
    }
}


const initialState = {channelList: null}


export default function channelReducer(state = initialState, action) {
    switch(action.type) {
        case GET_CHANNELS:
            return { ...state, channelList: action.channels}
        default:
            return state
    }
}