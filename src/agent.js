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
const pageSizeNews = 5
const pageSizeProducts = 10
const pageSizeInvoices = 10
const Auth = {
  login: values => instance.post('/auth/login', { user: values }),
  register: values => instance.post('/auth/register', { user: values }),
  current: () => instance.get('/auth/current'),
  updateUser: values => instance.put('/auth/update', { user: values })
}
const Image = {
  upload: image => instance.post('image/upload', { image })
}
const News = {
  getAll: (page = 0, filter = {}) =>
    instance.get(`/news`, {
      params: {
        limit: pageSizeNews,
        offset: page * pageSizeNews || 0,
        ...filter
      }
    }),
  getBySlug: slug => instance.get(`/news/${slug}`)
}
const Products = {
  getAll: (page = 0, filter = {}) =>
    instance.get(`/products`, {
      params: { limit: pageSizeProducts, offset: page * pageSizeProducts || 0, ...filter }
    }),
  getBySlug: slug => instance.get(`/products/${slug}`)
}
const Cart = {
  current: () => instance.get('/cart'),
  addItem: (_id, quantity) => instance.post('/cart/add', { item: { _id, quantity } }),
  removeItem: _id => instance.post('/cart/remove', { _id }),
  updateItem: (_id, quantity) => instance.post('/cart/update', { item: { _id, quantity } })
}
const Invoice = {
  getAllInvoices: (page = 0, filter = {}) => {
    return instance.get('/invoices', {
      params: {
        limit: pageSizeInvoices,
        offset: page * pageSizeInvoices,
        ...filter
      }
    })
  },
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
  Products,
  pageSizeNews,
  pageSizeProducts,
  Image,
  Cart,
  Invoice
}
export default agent
