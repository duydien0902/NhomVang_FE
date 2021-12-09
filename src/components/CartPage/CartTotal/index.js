import { Button, List, Space, Typography } from 'antd'
import React from 'react'
import { toLocaleStringCurrency } from '../../../utils'
import './CartTotal.css'

const { Text, Title } = Typography

export default function CartTotal(props) {
  const { vat, listedSubtotal, discountSubtotal, total } = props
  const itemList = [
    {
      props: {},
      content: <Title level={2}>Cart totals</Title>
    },
    {
      props: {},
      title: 'Subtotal',
      content: discountSubtotal ? (
        <Space size="small" direction="vertical">
          <Text delete>{toLocaleStringCurrency(listedSubtotal, 'vn', 'VND')}</Text>
          <Text type="success">{toLocaleStringCurrency(discountSubtotal, 'vn', 'VND')}</Text>
        </Space>
      ) : (
        <Text>{toLocaleStringCurrency(listedSubtotal, 'vn', 'VND')}</Text>
      )
    },
    {
      props: {},
      title: 'VAT',
      content: vat ? (
        <Space size="small" direction="vertical" style={{ alignItems: 'end' }}>
          <Text>{vat * 100}%</Text>
          <Text>{toLocaleStringCurrency((discountSubtotal || listedSubtotal) * vat, 'vn', 'VND')}</Text>
        </Space>
      ) : (
        <Text>{0}%</Text>
      )
    },
    {
      props: {},
      title: 'Total',
      content: <Text>{toLocaleStringCurrency(total, 'vn', 'VND')}</Text>
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
