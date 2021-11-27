import { ActionType } from '../constants/Action-type'
const initialState = {
  token: [
    {
      id: 1,
      username: 'duydien',
      email: 'duydien552@gmail.com sdssd'
    }
  ]
}

export default function AuthReducers(state = initialState, action) {
  switch (action.type) {
    case ActionType.LOGIN:
      return state

    default:
      return state
  }
}
