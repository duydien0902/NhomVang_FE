import { useState } from 'react'
import '../../Style/Navbar.css'
import 'antd/dist/antd.css'
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { Input } from 'antd'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
function Navbar() {
  const [showNavLinks, setShowNavLinks] = useState(false)
  const style = { fontSize: 22 }

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
                  <li className="cursor">News</li>
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
                      fontSize: '20px'
                    }}
                    placeholder="Search Logo..."
                    prefix={<SearchOutlined />}
                  />
                </li>
              </span>
              <Link className="link" to="/login">
                <li className="cursor">
                  <UserOutlined style={style} />
                </li>
              </Link>
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
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  )
}

export default Navbar
