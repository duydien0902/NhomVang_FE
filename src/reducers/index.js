import { combineReducers } from 'redux'
import auth from './auth'
import cart from './cart'
import news from './news'
import newsdetail from './selectedNews'
import products from './products'
import productdetail from './selectedProduct'
export default combineReducers({
  auth,
  cart,
  news,
  newsdetail,
  products,
  productdetail
})
