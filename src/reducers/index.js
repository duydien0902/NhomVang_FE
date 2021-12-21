import { combineReducers } from 'redux'
import auth from './auth'
import cart from './cart'
import invoice from './invoice'
import news from './news'
import newsdetail from './selectedNews'

export default combineReducers({
  auth,
  cart,
  invoice,
  news,
  newsdetail
})
