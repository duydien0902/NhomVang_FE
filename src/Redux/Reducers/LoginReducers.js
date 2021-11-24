import { ActionType } from '../Contanst/Action-type'
const initialState = {
  token: [
    {
      id: 1,
      username: 'duydien',
      Emmail: 'duydien552@gmail.com'
    }
  ]
}

export const LoginReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionType.LOGIN_SUCCESS:
      return state

    default:
      return state
  }
}
