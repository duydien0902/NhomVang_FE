import { ActionType } from '../constants/ActionType'
const initialState = {
  user: {
    username: 'duydien',
    email: 'duydien552@gmail.com'
  }
}

export default function AuthReducers(state = initialState, action) {
  switch (action.type) {
    case ActionType.LOGIN:
      return state

    default:
      return state
  }
}
