import { Button, List, Space, Typography } from 'antd'
import React from 'react'
import { toLocaleStringCurrency } from '../../../utils'
import './CartTotal.css'

const { Text, Title } = Typography

export default function CartTotal(props) {
  const { total, discountTotal } = props
  const itemList = [
    {
      props: {},
      content: <Title level={2}>Cart totals</Title>
    },
    {
      props: {},
      title: 'Total',
      content: discountTotal ? (
        <Space size="small" direction="vertical">
          <Text delete>{toLocaleStringCurrency(total, 'vn', 'VND')}</Text>
          <Text type="success">{toLocaleStringCurrency(discountTotal, 'vn', 'VND')}</Text>
        </Space>
      ) : (
        <Text>{toLocaleStringCurrency(total, 'vn', 'VND')}</Text>
      )
    },
    {
      props: {},
      content: (
        <Button className="checkout-btn" type="primary" size="large">
          Proceed to checkout
        </Button>
      )
    }
  ]

  return (
    <List className="cart-total" itemLayout="vertical">
      {itemList.map((item, index) => {
        return (
          <List.Item key={index} {...item.props}>
            {item.title ? (
              <div className="cart-detail">
                <Title className="title" level={5}>
                  {item.title}
                </Title>
                {item.content}
              </div>
            ) : (
              item.content
            )}
          </List.Item>
        )
      })}
    </List>
  )
}
