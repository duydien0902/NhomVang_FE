import { Button, List, Space, Typography } from 'antd'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import agent from '../../../agent'
import { ADD_ALL_TO_CHECKOUT, REMOVE_ALL_FROM_CHECKOUT } from '../../../constants/ActionType'
import { toLocaleStringCurrency } from '../../../utils'
import './CartTotal.css'

const { Text, Title } = Typography

export default function CartTotal() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { items, checkoutItems, total, discountTotal } = useSelector(state => state.cart)

  const onItemAllCheck = e => {
    dispatch({
      type: e.target.checked ? ADD_ALL_TO_CHECKOUT : REMOVE_ALL_FROM_CHECKOUT
    })
  }

  const onCheckout = async () => {
    try {
      const products = checkoutItems.map(item => ({
        _id: item._id,
        name: item.name,
        thumbnail: item.thumbnail,
        listedPrice: item.listedPrice,
        discountPrice: item.discountPrice,
        quantity: item.quantity
      }))
      const res = await agent.Invoice.createInvoice(products)
      const invoiceId = res.data.invoice._id
      history.push(`/checkout/${invoiceId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const itemList = [
    {
      props: {},
      content: <Title level={2}>Payment</Title>
    },
    {
      props: {},
      content: (
        <Checkbox
          checked={checkoutItems.length === items.length}
          indeterminate={checkoutItems.length && checkoutItems.length < items.length}
          onChange={onItemAllCheck}
        >
          Select all
        </Checkbox>
      )
    },
    {
      props: {},
      title: 'Total',
      content: discountTotal ? (
        <Space size="small" direction="vertical">
          <Text delete>{toLocaleStringCurrency(total)}</Text>
          <Text type="success">{toLocaleStringCurrency(discountTotal)}</Text>
        </Space>
      ) : (
        <Text>{toLocaleStringCurrency(total)}</Text>
      )
    },
    {
      props: {},
      content: (
        <Button
          disabled={checkoutItems.length === 0}
          className="checkout-btn"
          type="primary"
          size="large"
          onClick={onCheckout}
        >
          Checkout
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
