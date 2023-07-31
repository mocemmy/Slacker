const GET_MESSAGES = 'messages/all'

const actionGetMessages = (messages) => ({
    type: GET_MESSAGES,
    messages
})

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

const initialState = {messageList: null}

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return { ...state, messageList: action.messages}
        default:
            return state
    }
}