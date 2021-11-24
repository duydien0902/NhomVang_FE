import { ActionType } from '../Contanst/Action-type'

export const Login = token => {
  return {
    type: ActionType.LOGIN_SUCCESS,
    payload: token
  }
}
