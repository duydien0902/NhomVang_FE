import { Button, Checkbox, Drawer, InputNumber, List, Space, Spin, Typography } from 'antd'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  ADD_ALL_TO_CHECKOUT,
  ADD_TO_CHECKOUT,
  CART_LOADED,
  CART_LOADING,
  CLOSE_CART_DRAWER,
  REMOVE_ALL_FROM_CHECKOUT,
  REMOVE_FROM_CHECKOUT,
  REMOVE_ITEM,
  UPDATE_CART,
  UPDATE_QUANTITY
} from '../../constants/ActionType'
import './CartDrawer.css'
import { toLocaleStringCurrency } from '../../utils'
import agent from '../../agent'
import { useHistory } from 'react-router-dom'

const { Text } = Typography

function EmptyCartDrawer() {
  return <div>Your cart is empty. Let's find a voucher!</div>
}

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

export default function CartDrawer() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { isLoading, cartVisible, items, checkoutItems, total, discountTotal } = useSelector(state => state.cart)

  const onCartDrawerClose = () => {
    dispatch({ type: CLOSE_CART_DRAWER })
  }
  const onRemoveProduct = async item => {
    try {
      dispatch({ type: CART_LOADING })
      const result = await agent.Cart.removeItem(item._id)
      const cart = result.data.cart
      dispatch({ type: UPDATE_CART, subtype: REMOVE_ITEM, cart, item })
    } catch (error) {
      console.log(error)
    } finally {
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
      console.log(error)
    } finally {
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

  const fetchCurrentCart = async () => {
    let cart
    try {
      dispatch({ type: CART_LOADING })
      const result = await agent.Cart.current()
      cart = result.data.cart
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: CART_LOADED, cart })
    }
  }

  const onCheckout = async () => {
    try {
      dispatch({ type: CART_LOADING })
      const products = checkoutItems.map(item => ({
        _id: item._id,
        name: item.name,
        slug: item.slug,
        thumbnail: item.thumbnail,
        listedPrice: item.listedPrice,
        discountPrice: item?.discountPrice,
        quantity: item.quantity
      }))
      const res = await agent.Invoice.createInvoice(products)
      const invoiceId = res.data.invoice._id
      history.push(`/checkout/${invoiceId}`)
    } catch (error) {
      console.log(error)
    } finally {
      await fetchCurrentCart()
      onCartDrawerClose()
    }
  }

  return (
    <Drawer
      className="cart-drawer"
      visible={cartVisible}
      title="Your Cart"
      onClose={onCartDrawerClose}
      extra={
        <Space>
          <Button type="primary" onClick={onCartDrawerClose}>
            <Link to="/cart">More Details</Link>
          </Button>
        </Space>
      }
    >
      <Spin size="large" spinning={isLoading && !items.length}>
        {items.length === 0 ? (
          <EmptyCartDrawer />
        ) : (
          <Space className="cart-content" direction="vertical">
            <List itemLayout="vertical">
              {items.map(item => {
                return (
                  <List.Item key={item._id} className="item">
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
            <div style={{ marginBottom: 16 }}>
              <div className="row">
                <span className="title">Total</span>
                {discountTotal ? (
                  <div>
                    <Text delete>{toLocaleStringCurrency(total)}</Text> <br />
                    <Text type="success">{toLocaleStringCurrency(discountTotal)}</Text>
                  </div>
                ) : (
                  <Text>{toLocaleStringCurrency(total)}</Text>
                )}
              </div>
              <div className="row">
                <Checkbox
                  checked={checkoutItems.length === items.length}
                  indeterminate={checkoutItems.length && checkoutItems.length < items.length}
                  onChange={onItemAllCheck}
                >
                  Select all
                </Checkbox>
              </div>
              <Button
                disabled={checkoutItems.length === 0}
                loading={isLoading}
                style={{ width: '100%', marginTop: 8 }}
                size="large"
                type="primary"
                onClick={onCheckout}
              >
                Checkout
              </Button>
            </div>
          </Space>
        )}
      </Spin>
    </Drawer>
  )
}
