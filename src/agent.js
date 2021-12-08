import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://nhomvang-be.herokuapp.com'
})
const Auth = {
  login: values => instance.post('/auth/login', { user: values }),
  register: values => instance.post('/auth/register', { user: values }),
  currentuser: token => instance.get('/auth/current', { headers: { Authorization: `Bearer ${token}` } })
}
const News = {
  getnews: () => instance.get(`/news?limit=${5}&offset=${2}`),
  newsslug: slug => instance.get(`/news/${slug}`)
}
const agent = {
  Auth,
  News
}
export default agent
