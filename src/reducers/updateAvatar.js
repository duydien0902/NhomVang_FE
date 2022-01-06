import { UPDATE_AVATAR } from '../constants/ActionType'
const initialState = {
  photourl: ''
}
export default function AuthReducers(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AVATAR:
      return {
        [action.key]: action.value
      }
    default:
      return state
  }
}
