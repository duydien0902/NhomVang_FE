import agent from './agent'
import { message } from 'antd'
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
    } else {
      message.error('xin hãy đăng nhập')
    }
  } catch (error) {
    console.log(error)
  }
}
