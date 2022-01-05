import { combineReducers } from 'redux'
import auth from './auth'
import cart from './cart'
import invoice from './invoice'
import news from './news'
import newsdetail from './selectedNews'
import products from './products'
import productdetail from './selectedProduct'
import updateavatar from './updateAvatar'
export default combineReducers({
  auth,
  cart,
  invoice,
  news,
  newsdetail,
  products,
  productdetail,
  updateavatar
})
