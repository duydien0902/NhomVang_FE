import { combineReducers } from 'redux'
import { LoginReducers } from '../Reducers/LoginReducers'
const reducers = combineReducers({
  token: LoginReducers
})
export default reducers
