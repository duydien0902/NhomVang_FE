import axios from 'axios'
import queryString from 'query-string'

export const LOCAL_API_URL = 'http://localhost:5543'

const instance = axios.create({
  baseURL: 'https://nhomvang-be.herokuapp.com',
  // baseURL: LOCAL_API_URL,
  timeout: 20000,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
})
const tokenPlugin = req => {
  const token = localStorage.getItem('token')
  req.headers['Authorization'] = 'Bearer ' + token
  return req
}
instance.interceptors.request.use(tokenPlugin)
const Auth = {
  login: values => instance.post('/auth/login', { user: values }),
  register: values => instance.post('/auth/register', { user: values }),
  current: () => instance.get('/auth/current')
}
const News = {
  getAll: (limit = 10, page = 0) =>
    instance.get(`/news`, {
      params: { limit, offset: page * limit || 0 }
    }),
  getBySlug: slug => instance.get(`/news/${slug}`)
}
const Cart = {
  current: () => instance.get('/cart'),
  addItem: (_id, quantity) => instance.post('/cart/add', { item: { _id, quantity } }),
  removeItem: _id => instance.post('/cart/remove', { _id }),
  updateItem: (_id, quantity) => instance.post('/cart/update', { item: { _id, quantity } })
}
const Invoice = {
  getAllInvoices: () => instance.get('/invoices'),
  getInvoice: id => instance.get(`/invoices/${id}`),
  createInvoice: products => instance.post('/invoices', { products }),
  cancelInvoice: id => instance.post(`/invoices/cancel/${id}`),
  payInvoice: (invoiceId, paymentMethod) =>
    instance.post(
      `/invoices/pay`,
      {},
      {
        params: {
          invoice: invoiceId,
          method: paymentMethod
        }
      }
    )
}
const agent = {
  Auth,
  News,
  Cart,
  Invoice
}
export default agent
