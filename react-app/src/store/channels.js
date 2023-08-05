const GET_CHANNELS = 'channels/ALL'
const REMOVE_ALL_CHANNELS = 'channels/remove'

const actionGetChannels = (channels) => ({
    type: GET_CHANNELS,
    channels
})

export const actionRemoveAllChannels = () => ({
    type: REMOVE_ALL_CHANNELS
})

export const thunkLeaveChannel = (channelId, serverId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}/leave`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetAllChannels(serverId))
        return data
    } else {
        return response
    }
}

export const thunkDeleteChannel = (channelId, serverId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}/delete`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetAllChannels(serverId))
        return data
    } else {
        return response
    }
}

export const thunkEditChannel = (channelId, serverId, data) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: data.name,
            server_id: data.server_id,
            created_by: data.created_by,
            description: data.description
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetAllChannels(serverId))
        return data
    } else {
        return response
    }
}

export const thunkCreateChannel = (serverId, data) => async dispatch => {
    const response = await fetch(`/api/channels/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: data.name,
            created_by: data.created_by,
            description: data.description,
            server_id: data.server_id
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetAllChannels(serverId))
        return data
    } else {
        return response
    }
}


export const thunkGetAllChannels = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetChannels(data.channels))
        return data
    } else {
        return response
    }
}


const initialState = { channelList: null }


export default function channelReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHANNELS:
            return { ...state, channelList: action.channels }
        case REMOVE_ALL_CHANNELS:
            return { channelList: null }
        default:
            return state
    }
}
