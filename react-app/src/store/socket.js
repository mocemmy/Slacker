const SET_SOCKET = 'socket/SET_SOCKET';
const REMOVE_SOCKET = 'socket/REMOVE_SOCKET';

export const actionSetSocket = (socketInstance) => ({
  type: SET_SOCKET,
  socketInstance
})

export const actionRemoveSocket = () => ({
  type: REMOVE_SOCKET,
})

const initialState = { socketInstance: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SOCKET: {
      let newState = { ...state }
      newState.socketInstance = action.socketInstance
      return newState
    }
    case REMOVE_SOCKET: {
      let newState = { ...state }
      newState.socketInstance = null
      return newState
    }
    default:
      return state;
  }
}