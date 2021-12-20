import axios from 'axios'
import queryString from 'query-string'

const instance = axios.create({
  baseURL: 'https://nhomvang-be.herokuapp.com',
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
const pageSize = 5
const Auth = {
  login: values => instance.post('/auth/login', { user: values }),
  register: values => instance.post('/auth/register', { user: values }),
  current: () => instance.get('/auth/current')
}
const News = {
  getAll: (page = 0) =>
    instance.get(`/news`, {
      params: {
        limit: pageSize,
        offset: page * pageSize || 0
      }
    }),
  getBySlug: slug => instance.get(`/news/${slug}`)
}
const Products = {
  getAll: (page = 0, filter = {}) =>
    instance.get(`/products`, {
      params: { limit: pageSize, offset: page * pageSize || 0, ...filter }
    }),
  getBySlug: slug => instance.get(`/products/${slug}`)
}
const agent = {
  Auth,
  News,
  Products,
  pageSize
}
export default agent
