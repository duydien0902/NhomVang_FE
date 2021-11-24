import { useState } from 'react'
import '../../Style/Navbar.css'
import 'antd/dist/antd.css'
import { SearchOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Input, Modal } from 'antd'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
function Navbar() {
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const style = { fontSize: 22 }
  const showSearch = () => {
    setIsOpenSearch(true)
  }
  const handleOk = () => {
    setIsOpenSearch(false)
  }
  const handleCancel = () => {
    setIsOpenSearch(false)
  }

  return (
    <div>
      <header>
        <div className="header">
          <h3 className="logo cursor">LOGO</h3>
          <nav className="nav-links">
            <ul>
              <li className="cursor">Home</li>
              <li className="cursor">Products</li>
              <li className="cursor">News</li>
              <li className="cursor">About us</li>
            </ul>
          </nav>

          <nav className="nav-links-icon">
            <ul>
              <li className="cursor">
                <SearchOutlined style={style} type="primary" onClick={showSearch} />
              </li>
              <Link className="link" to="/login">
                <li className="cursor">
                  <UserOutlined style={style} />
                </li>
              </Link>
              <li className="cursor">
                <ShoppingCartOutlined style={style} />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Modal visible={isOpenSearch} footer={null} onOk={handleOk} onCancel={handleCancel} centered width={'1000'}>
        <Input
          className="input-search"
          style={{ padding: '8px', fontSize: '20px' }}
          placeholder="Search Logo..."
          prefix={<SearchOutlined />}
        ></Input>
      </Modal>

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
