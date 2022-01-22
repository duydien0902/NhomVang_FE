import { useState, useEffect } from 'react'
import './Navbar.css'
import 'antd/dist/antd.css'
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  CloseOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import { Input, Dropdown, Menu, Modal, Spin } from 'antd'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Login from '../../Login/Login'
import defaultavatarImage from '../../../assets/avatar.jpg'
import Register from '../../Register/Register'
import { useSelector } from 'react-redux'
import agent from '../../../agent'
import { store } from '../../../store'
import { CART_LOADED, CART_LOADING, CURRENT_USER, TOGGLE_CART_DRAWER } from '../../../constants/ActionType'
import CartDrawer from '../../CartDrawer'
const antIcon = <LoadingOutlined style={{ fontSize: 10 }} spin />
function Navbar() {
  const [showNavLinks, setShowNavLinks] = useState(false)
  const [dataProductSearch, setdataProductSearch] = useState('')
  const [dataNewsSearch, setdataNewsSearch] = useState('')
  const [inputSearch, setInputSearch] = useState('')
  const [dataProduct, setdataProduct] = useState([])
  const [dataNews, setdataNews] = useState([])
  const [hightlightTab, setHightlightTab] = useState()
  const style = { fontSize: 22 }
  const currentUser = useSelector(state => state.auth.current)
  const photourl = currentUser?.photourl
  const history = useHistory()
  const location = useLocation()
  const pathname = ['products', 'product', '', 'blogs', 'blog', 'home', 'aboutus', 'cart', 'me']
  const { items, isLoading } = useSelector(state => state.cart)
  const cartQuantity = items.length

  useEffect(() => {
    const path = location.pathname
    const splitPath = path.split('/')
    for (let i = 0; i < pathname.length; i++) {
      const result = splitPath[1] === pathname[i]
      if (result === true) {
        setHightlightTab(pathname[i])
        break
      } else {
        setHightlightTab(null)
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  const Logout = () => {
    localStorage.removeItem('token')
    history.push('/')
    window.location.reload()
  }
  const toggleCartDrawer = () => {
    store.dispatch({ type: TOGGLE_CART_DRAWER })
  }
  useEffect(() => {
    async function fetchdataProductNews() {
      try {
        const ProductsList = await agent.Products.getAll()
        const NewsList = await agent.News.getAll()
        const dataproduct = ProductsList.data.productList
        const datanews = NewsList.data.newsList
        const arrNewsProducts = []
        const arrNewsNews = []
        for (let i = 0; i < dataproduct.length; i++) {
          const result = dataproduct[i]['name'].toLowerCase()
          const payload = { ...dataproduct[i], search: result }
          arrNewsProducts.push(payload)
        }
        for (let i = 0; i < datanews.length; i++) {
          const result = datanews[i]['title'].toLowerCase()
          const payload = { ...datanews[i], search: result }
          arrNewsNews.push(payload)
        }
        setdataProduct(arrNewsProducts.slice(0, 5))
        setdataNews(arrNewsNews.slice(0, 5))
      } catch (error) {
        console.log(error)
      }
    }
    fetchdataProductNews()
  }, [])
  const onChange = async e => {
    const searchWord = e.target.value
    setInputSearch(searchWord)
    const newFilterProduct = dataProduct.filter(value => {
      return value.search.includes(searchWord.toLowerCase())
    })
    const newFilterNews = dataNews.filter(value => {
      return value.search.includes(searchWord.toLowerCase())
    })
    if (searchWord === ' ') {
      setdataProductSearch('')
      setdataNewsSearch('')
    } else {
      setdataProductSearch(newFilterProduct)
      setdataNewsSearch(newFilterNews)
    }
  }
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const result = await agent.Auth.current()
        const user = result.data.user
        store.dispatch({ type: CURRENT_USER, user })
      } catch (error) {
        console.log(error)
      }
    }
    fetchCurrentUser()
  }, [])
  useEffect(() => {
    async function fetchCurrentCart() {
      let cart
      try {
        store.dispatch({ type: CART_LOADING })
        const result = await agent.Cart.current()
        cart = result.data.cart
      } catch (error) {
        console.log(error)
      } finally {
        store.dispatch({ type: CART_LOADED, cart })
      }
    }
    if (currentUser) {
      fetchCurrentCart()
    }
  }, [currentUser])

  useEffect(() => {
    async function fetchCurrentCart() {
      let cart
      try {
        store.dispatch({ type: CART_LOADING })
        const result = await agent.Cart.current()
        cart = result.data.cart
      } catch (error) {
        console.log(error)
      } finally {
        store.dispatch({ type: CART_LOADED, cart })
      }
    }
    if (currentUser) {
      fetchCurrentCart()
    }
  }, [currentUser])

  const menu = currentUser ? (
    <Menu>
      <Menu.Item style={{ width: '200px' }}>
        <Link to={`/me/profile/${currentUser.displayname}`}>
          <li className={hightlightTab === 'me' ? 'cursor' : 'cursor'} style={{ fontSize: '16px' }}>
            {currentUser.displayname}
          </li>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={Logout}>
        Logout
      </Menu.Item>
    </Menu>
  ) : null
  const [isModalLogin, setIsModalLogin] = useState(false)
  const [isModalRegister, setIsModalRegister] = useState(false)
  const showModal = () => {
    setIsModalLogin(true)
  }
  const handleOk = () => {
    setIsModalLogin(false)
  }
  const handleCancel = () => {
    setIsModalLogin(false)
  }
  const handleOkRegister = () => {
    setIsModalRegister(false)
  }
  const handleCancelRegister = () => {
    setIsModalRegister(false)
  }

  return (
    <div>
      <header>
        <div className="header" style={{ position: 'relative' }}>
          <div className="nav-links">
            <ul>
              <span className=" reponsive-logo ">
                <li className="cursor ">
                  <Link className="link" to="/" style={{ color: 'white' }}>
                    Voucher hunter
                  </Link>
                </li>
              </span>
              {
                <span className={showNavLinks ? 'nav-link-mobile' : 'nav-links-reponsive'}>
                  <li className="cursor">
                    <Link className={hightlightTab === '' ? 'colormenu-active' : 'link colormenu'} to="/">
                      Home
                    </Link>
                  </li>

                  <li className="cursor">
                    <Link
                      className={
                        hightlightTab === 'products' || hightlightTab === 'product'
                          ? 'colormenu-active'
                          : 'link colormenu'
                      }
                      to="/products"
                    >
                      Products
                    </Link>
                  </li>

                  <li className="cursor">
                    <Link
                      className={
                        hightlightTab === 'blogs' || hightlightTab === 'blog' ? 'colormenu-active' : 'link colormenu'
                      }
                      to="/blogs"
                    >
                      News
                    </Link>
                  </li>

                  <li className="cursor">
                    <Link className={hightlightTab === 'aboutus' ? 'colormenu-active' : 'link colormenu'} to="/aboutus">
                      About us
                    </Link>
                  </li>
                </span>
              }
            </ul>
          </div>

          <div className="nav-links-icon">
            <ul>
              <div className="input-search">
                <Input
                  style={{
                    fontSize: '20px',
                    maxWidth: '400px',
                    marginRight: '15px',
                    position: 'relative'
                  }}
                  allowClear
                  onChange={onChange}
                  placeholder="Search Voucher..."
                  prefix={<SearchOutlined />}
                />
                {inputSearch !== '' && (
                  <div
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                      marginTop: '10px',
                      position: 'absolute'
                    }}
                  >
                    <div
                      className={
                        dataNewsSearch.length + dataProductSearch.length !== 10
                          ? 'containerResultSearch'
                          : 'containerResultSearchScroll'
                      }
                    >
                      <div className="containerResultProducts">
                        <div className="containerResultTitle">
                          <h3>Product</h3>
                        </div>
                        <div className="containerResultProducts">
                          {dataProductSearch.length !== 0 ? (
                            dataProductSearch.map(item => (
                              <Link
                                style={{ color: 'black' }}
                                to={`/product/${item.slug}`}
                                key={item.slug}
                                onClick={() => setInputSearch('')}
                              >
                                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                                  <div className="containerResultImg">
                                    <img src={item.thumbnail} alt="" />
                                  </div>
                                  <div style={{ marginLeft: '10px' }}>
                                    <span style={{ fontSize: '13px' }}>{item.name}</span>
                                  </div>
                                </div>
                              </Link>
                            ))
                          ) : (
                            <span>no data </span>
                          )}
                        </div>
                      </div>
                      <div className="containerResultNews">
                        <div className="containerResultTitle">
                          <h3>News</h3>
                        </div>
                        <div className="containerResultNews">
                          {dataNewsSearch.length !== 0 ? (
                            dataNewsSearch.map(item => (
                              <Link
                                style={{ color: 'black' }}
                                to={`/blog/${item.slug}`}
                                key={item.slug}
                                onClick={() => setInputSearch('')}
                              >
                                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                                  <div className="containerResultImg">
                                    <img src={item.thumbnail} alt="" />
                                  </div>
                                  <div style={{ marginLeft: '10px' }}>
                                    <span style={{ fontSize: '13px' }}>{item.title}</span>
                                  </div>
                                </div>
                              </Link>
                            ))
                          ) : (
                            <span>no data </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {!currentUser ? (
                <li className="cursor" type="primary" onClick={showModal}>
                  <UserOutlined style={(style, { color: 'white' })} />
                </li>
              ) : (
                <span>
                  <li>
                    <Dropdown overlay={menu} placement="bottomCenter" arrow>
                      <img
                        src={photourl || defaultavatarImage}
                        alt=""
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '30px',
                          cursor: 'pointer',
                          marginTop: '-4px',
                          right: '65px'
                        }}
                      />
                    </Dropdown>
                  </li>
                  <li className={hightlightTab === 'cart' ? 'cursor' : 'cursor'} onClick={toggleCartDrawer}>
                    <ShoppingCartOutlined style={(style, { color: 'white' })} />
                    <span className="cartQuantity">
                      {isLoading ? (
                        <span style={{ padding: '0px 5px 5px 5px', backgroundColor: 'white', borderRadius: '10px' }}>
                          <Spin indicator={antIcon} />
                        </span>
                      ) : (
                        <span style={{ padding: '2px 5px 2px 5px', backgroundColor: 'white', borderRadius: '10px' }}>
                          <span style={{ color: ' #aa0000' }}>{cartQuantity}</span>
                        </span>
                      )}
                    </span>
                  </li>
                </span>
              )}
              {showNavLinks ? (
                <span className=" show-nav-links" onClick={() => setShowNavLinks(false)}>
                  <li className="cursor ">
                    <CloseOutlined />
                  </li>
                </span>
              ) : (
                <span className=" show-nav-links " onClick={() => setShowNavLinks(!showNavLinks)}>
                  <li className="cursor ">
                    <UnorderedListOutlined />
                  </li>
                </span>
              )}
            </ul>
          </div>
        </div>
      </header>
      <Modal visible={isModalLogin} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Login visibleLogin={setIsModalLogin} visibleRegister={setIsModalRegister} />
      </Modal>
      <Modal visible={isModalRegister} onOk={handleOkRegister} onCancel={handleCancelRegister} footer={null}>
        <Register visibleRegister={setIsModalRegister} visibleLogin={setIsModalLogin} />
      </Modal>
      <CartDrawer />
    </div>
  )
}
export default Navbar
