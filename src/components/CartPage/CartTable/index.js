import { useDispatch, useSelector } from 'react-redux'
import { Button, Checkbox, Divider, Image, InputNumber, List, Space, Spin, Table, Typography } from 'antd'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import agent from '../../../agent'
import { toLocaleStringCurrency } from '../../../utils'
import {
  ADD_ALL_TO_CHECKOUT,
  ADD_TO_CHECKOUT,
  CART_LOADED,
  CART_LOADING,
  REMOVE_ALL_FROM_CHECKOUT,
  REMOVE_FROM_CHECKOUT,
  REMOVE_ITEM,
  UPDATE_CART,
  UPDATE_QUANTITY
} from '../../../constants/ActionType'
import defaultProductImage from '../../../assets/defaultProductImage.jpg'
import './CartTable.css'

const { Text, Title } = Typography

function renderPrice(item) {
  const { listedPrice, discountPrice, quantity } = item
  const strListedTotal = toLocaleStringCurrency(listedPrice * quantity)
  if (discountPrice) {
    const strDiscountTotal = toLocaleStringCurrency(discountPrice * quantity)
    return (
      <div>
        <Text delete>{strListedTotal}</Text> <br />
        <Text type="success">{strDiscountTotal}</Text>
      </div>
    )
  }
  return strListedTotal
}

export default function CartTable() {
  const { isLoading, items, checkoutItems } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const onRemoveProduct = async item => {
    try {
      dispatch({ type: CART_LOADING })
      const result = await agent.Cart.removeItem(item._id)
      const cart = result.data.cart
      dispatch({ type: UPDATE_CART, subtype: REMOVE_ITEM, cart, item })
    } catch (error) {
      console.log(error)
      dispatch({ type: CART_LOADED })
    }
  }
  const onQuantityChange = async (value, item) => {
    let result, cart
    try {
      dispatch({ type: CART_LOADING })
      if (value === 0) {
        result = await agent.Cart.removeItem(item._id)
        cart = result.data.cart
        dispatch({ type: UPDATE_CART, subtype: REMOVE_ITEM, cart, item })
      } else {
        result = await agent.Cart.updateItem(item._id, value)
        cart = result.data.cart
        dispatch({ type: UPDATE_CART, subtype: UPDATE_QUANTITY, cart, item, value })
      }
    } catch (error) {
      console.log(result)
      dispatch({ type: CART_LOADED })
    }
  }

  const onItemCheck = (e, item) => {
    dispatch({
      type: e.target.checked ? ADD_TO_CHECKOUT : REMOVE_FROM_CHECKOUT,
      item
    })
  }

  const onItemAllCheck = e => {
    dispatch({
      type: e.target.checked ? ADD_ALL_TO_CHECKOUT : REMOVE_ALL_FROM_CHECKOUT
    })
  }

  const columns = [
    {
      title: (
        <Checkbox
          checked={checkoutItems.length === items.length}
          indeterminate={checkoutItems.length && checkoutItems.length < items.length}
          onChange={onItemAllCheck}
        />
      ),
      width: 10,
      render: (text, record) => (
        <Checkbox
          checked={checkoutItems.some(item => item._id === record._id)}
          onChange={e => onItemCheck(e, record)}
        />
      )
    },
    {
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 30,
      responsive: ['lg'],
      render: (text, record) => <Image src={record.thumbnail} fallback={defaultProductImage} />
    },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      width: 50,
      ellipsis: true,
      textWrap: 'word-break'
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
      width: 30,
      ellipsis: true,
      textWrap: 'word-break'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 30,
      align: 'center',
      render: (text, record) => {
        const { listedPrice, discountPrice } = record
        const strListedPrice = toLocaleStringCurrency(listedPrice)
        if (discountPrice) {
          const strDiscountPrice = toLocaleStringCurrency(discountPrice)
          return (
            <Space size="small" direction="vertical">
              <Text delete>{strListedPrice}</Text>
              <Text type="success">{strDiscountPrice}</Text>
            </Space>
          )
        }
        return strListedPrice
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 20,
      align: 'center',
      render: (text, record) => (
        <div className="input-number">
          <Button
            className="input-number-control-btn minus-btn"
            type="primary"
            icon={<MinusOutlined />}
            disabled={isLoading}
            onClick={() => onQuantityChange(record.quantity - 1, record)}
          />
          <InputNumber
            min={0}
            max={record.inStock}
            value={record.quantity}
            disabled={isLoading}
            onChange={value => onQuantityChange(value, record)}
            style={{ width: 70 }}
          />
          <Button
            className="input-number-control-btn plus-btn"
            type="primary"
            icon={<PlusOutlined />}
            disabled={isLoading}
            onClick={() => onQuantityChange(record.quantity + 1, record)}
          />
        </div>
      )
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      width: 30,
      align: 'center',
      render: (text, record) => {
        const { listedPrice, discountPrice, quantity } = record
        const strListedTotal = toLocaleStringCurrency(listedPrice * quantity)
        if (discountPrice) {
          const strDiscountTotal = toLocaleStringCurrency(discountPrice * quantity)
          return <Text>{strDiscountTotal}</Text>
        }
        return strListedTotal
      }
    },
    {
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 10,
      align: 'center',
      render: (text, record) => (
        <Button
          type="primary"
          shape="circle"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemoveProduct(record)}
        />
      )
    }
  ]

  return (
    <div className="cart-shopping">
      <Title level={2}>
        Your Cart
        <Spin style={{ marginLeft: 16 }} spinning={isLoading} />
      </Title>
      <Divider />
      <Table
        className="cart-table"
        columns={columns}
        dataSource={items}
        pagination={false}
        rowKey="name"
        scroll={{ x: 1500 }}
      />
      <List className="cart-list" itemLayout="vertical">
        {items.map(item => {
          return (
            <List.Item key={item._id} className="item">
              <div className="row">
                <Image className="item-thumbnail" src={item.thumbnail} fallback={defaultProductImage} />
              </div>
              <div className="row">
                <div>
                  <Checkbox
                    checked={checkoutItems.some(it => it._id === item._id)}
                    onChange={e => onItemCheck(e, item)}
                  />
                  <span className="item-name">{item.name}</span>
                </div>
                <Button
                  type="primary"
                  shape="circle"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => onRemoveProduct(item)}
                />
              </div>
              <div className="row">
                <div className="input-number">
                  <Button
                    className="input-number-control-btn minus-btn"
                    type="primary"
                    icon={<MinusOutlined />}
                    disabled={isLoading}
                    onClick={() => onQuantityChange(item.quantity - 1, item)}
                  />
                  <InputNumber
                    min={0}
                    max={item.inStock}
                    value={item.quantity}
                    disabled={isLoading}
                    onChange={value => onQuantityChange(value, item)}
                    style={{ width: 70 }}
                  />
                  <Button
                    className="input-number-control-btn plus-btn"
                    type="primary"
                    icon={<PlusOutlined />}
                    disabled={isLoading}
                    onClick={() => onQuantityChange(item.quantity + 1, item)}
                  />
                </div>
                <div>{renderPrice(item)}</div>
              </div>
            </List.Item>
          )
        })}
      </List>
    </div>
  )
}
