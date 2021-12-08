import { combineReducers } from 'redux'
import auth from './auth'
import news from './news'
import newsdetail from './selectedNews'

export default combineReducers({
  auth,
  news,
  newsdetail
})
