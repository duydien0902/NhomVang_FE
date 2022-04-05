import agent from './agent'
import { CART_LOADED, CART_LOADING } from './constants/ActionType'
import { message } from 'antd'
import { store } from './store'

export const decodeHTMLContent = input => {
  if (!input) return ''
  const doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

/**
 * Convert a number to currency string
 * @param {Number} input
 * @param {String} locale
 * @param {String} currency
 * @returns {String}
 */
export const toLocaleStringCurrency = (input, locale = 'en-US', currency = 'USD') => {
  if (!input) return ''
  return input.toLocaleString(locale, {
    style: 'currency',
    currency
  })
}
export const beforeUploadImage = (file, callback, statusCallback) => {
  statusCallback(true)
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = async () => {
    try {
      const base64Image = reader.result
      const result = await agent.Image.upload(base64Image)
      const data = result.data.url
      callback(data)
      statusCallback(false)
    } catch (error) {
      callback('')
    }
  }
  return false
}

export const addCart = async values => {
  const token = localStorage.getItem('token')
  try {
    if (token) {
      await agent.Cart.addItem(values, 1)
      store.dispatch({ type: CART_LOADING })
      const result = await agent.Cart.current()
      let cart = result.data.cart
      store.dispatch({ type: CART_LOADED, cart })
    } else {
      message.error('Please login')
    }
  } catch (error) {
    console.log(error)
  }
}
export const removeMark = str => {
  if (!str) return ''
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+\?|\/|,|\.|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ')
  return str
}
