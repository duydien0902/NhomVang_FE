import { LOGIN, REGISTER, CURRENT_USER } from '../constants/ActionType'

export default function AuthReducers(state = {}, action) {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
    case CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        currentUser: action.user
      }
    default:
      return state
  }
}
