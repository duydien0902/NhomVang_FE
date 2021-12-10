import { Button, Typography } from 'antd'
import { ShoppingTwoTone } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './CartEmpty.css'

const { Title } = Typography

export default function CartEmpty() {
  return (
    <div className="cart-table cart-empty">
      <ShoppingTwoTone className="cart-icon" />
      <Title className="cart-empty-text" level={2}>
        Your Cart is Empty
      </Title>
      <Button type="primary" size="large">
        <Link to="#">Continue Shopping</Link>
      </Button>
    </div>
  )
}
