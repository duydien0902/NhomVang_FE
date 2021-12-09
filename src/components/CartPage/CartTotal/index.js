import { List, Typography } from 'antd'
import React from 'react'
import './CartTotal.css'

const { Title } = Typography

export default function CartTotal() {
  return (
    <List className="cart-total">
      <Title level={2}>Cart totals</Title>
      <List.Item></List.Item>
    </List>
  )
}
