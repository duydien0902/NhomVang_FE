import { UPDATE_AVATAR } from '../constants/ActionType'
const initialState = {
  data: {
    thumbnail: ''
  }
}
export default function AuthReducers(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AVATAR:
      return {
        // ...state,
        data: { ...state.data, [action.key]: action.value }
      }
    default:
      return state
  }
}
