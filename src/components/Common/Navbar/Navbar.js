import { useState, useEffect } from 'react'
import Avatar from '../../../assets/avatar.jpg'
import './Navbar.css'
import 'antd/dist/antd.css'
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { Input, Dropdown, Menu, Modal } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import Login from '../../Login/Login'
import Register from '../../Register/Register'
import { useSelector } from 'react-redux'
import agent from '../../../agent'
import { store } from '../../../store'
import { CURRENT_USER } from '../../../constants/ActionType'
function Navbar() {
  const [showNavLinks, setShowNavLinks] = useState(false)
  const style = { fontSize: 22 }
  const currenUser = useSelector(state => state.auth.currentUser)
  const history = useHistory()
  const Logout = () => {
    localStorage.removeItem('token')
    history.push('/')
    window.location.reload()
  }
  useEffect(() => {
    var token = localStorage.getItem('token')
    async function fetchCurrentUser() {
      try {
        if (token) {
          const result = await agent.Auth.currentuser(token)
          const user = result.data.user
          store.dispatch({ type: CURRENT_USER, user })
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCurrentUser()
  }, [currenUser])

  const menu = currenUser ? (
    <Menu>
      <Menu.Item style={{ width: '200px' }}>
        <li className="cursor" style={{ fontSize: '16px' }}>
          {currenUser.displayname}
        </li>
      </Menu.Item>
      <Menu.Item>
        <li onClick={Logout} className="cursor" style={{ fontSize: '16px' }}>
          Logout
        </li>
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
                <li className="cursor " style={{ color: 'red', fontWeight: '700' }}>
                  LOGO
                </li>
              </span>
              {
                <span className={showNavLinks ? 'nav-link-mobile' : 'nav-links-reponsive'}>
                  <li className="cursor">Home</li>
                  <li className="cursor">Products</li>
                  <Link className="link" to="/news">
                    <li className="cursor">News</li>
                  </Link>
                  <li className="cursor">About us</li>
                </span>
              }
            </ul>
          </div>

          <div className="nav-links-icon">
            <ul>
              <span className="reponsive-input">
                <li>
                  <Input
                    className="input-search"
                    style={{
                      fontSize: '20px',
                      maxWidth: '400px'
                    }}
                    placeholder="Search Logo..."
                    prefix={<SearchOutlined />}
                  />
                </li>
              </span>
              {!currenUser ? (
                <li className="cursor" type="primary" onClick={showModal}>
                  <UserOutlined style={style} />
                </li>
              ) : (
                <span>
                  <Dropdown overlay={menu} placement="bottomCenter" arrow>
                    <li>
                      <img
                        src={Avatar}
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
                    </li>
                  </Dropdown>
                </span>
              )}
              <li className="cursor">
                <ShoppingCartOutlined style={style} />
              </li>
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
    </div>
  )
}
export default Navbar
