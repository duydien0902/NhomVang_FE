import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { ProfileOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const UserInfo = () => {
  const location = useLocation()
  const currentUser = useSelector(state => state.auth.current)
  if (!currentUser) {
    return null
  }
  const { photourl, displayname, username } = currentUser

  return (
    <div className="user-info__container">
      <div className="user-info__header">
        <Avatar src={photourl} size={48} />
        <span>{displayname || username}</span>
      </div>
      <hr />
      <div className="user-info__navigation">
        <MenuItem
          active={location.pathname.includes('/me/profile')}
          link="/me/profile"
          text="Profile"
          icon={<ProfileOutlined />}
          isActive={true}
        />
        <MenuItem
          active={location.pathname.includes('/me/orders')}
          link="/me/orders"
          text="Orders"
          icon={<ShoppingOutlined />}
        />
      </div>
    </div>
  )
}

const MenuItem = props => {
  const { link, text, icon, active } = props
  return (
    <Link to={link} className={`user-info__link ${active ? 'active' : ''}`}>
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  )
}

export default UserInfo
