const GET_MESSAGES = 'messages/all'
const REMOVE_ALL_MESSAGES = 'messages/remove'

const actionGetMessages = (messages) => ({
    type: GET_MESSAGES,
    messages
})

export const actionRemoveAllMessages = () => ({
    type: REMOVE_ALL_MESSAGES
})


export const thunkDeleteMessages = (id, channelId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${id}/delete`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(thunkGetAllMessages(channelId))
        return data
    } else {
        return response
    }
}

export const thunkEditMessage = (id, channelId, message_body) => async (dispatch) => {
    const response = await fetch(`api/messages/${id}/edit`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message_body })
    })

    if (response.ok) {
        const data = response.json()
        dispatch(thunkGetAllMessages(channelId))
        return data
    } else {
        return response
    }
}


export const thunkGetAllMessages = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}/messages`)

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetMessages(data.messages))
        return data
    } else {
        return response
    }

}

const initialState = { messageList: null }

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return { ...state, messageList: action.messages }
        case REMOVE_ALL_MESSAGES:
            return { messageList: null }
        default:
            return state
    }
}
