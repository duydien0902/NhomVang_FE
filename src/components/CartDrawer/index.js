import { Button, Drawer, InputNumber, List, Space, Typography } from 'antd'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CLOSE_CART_DRAWER, REMOVE_ITEM, UPDATE_QUANTITY } from '../../constants/ActionType'
import './CartDrawer.css'
import { toLocaleStringCurrency } from '../../utils'
import agent from '../../agent'

const { Text } = Typography

function EmptyCartDrawer() {
  return <div>Your cart is empty. Let's find a voucher!</div>
}

function renderPrice(item) {
  const { listedPrice, discountPrice, quantity } = item
  const strListedTotal = toLocaleStringCurrency(listedPrice * quantity, 'vn', 'VND')
  if (discountPrice) {
    const strDiscountTotal = toLocaleStringCurrency(discountPrice * quantity, 'vn', 'VND')
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
  const dispatch = useDispatch()
  const { cartVisible, items, total, discountTotal } = useSelector(state => state.cart)

  const onCartDrawerClose = () => {
    dispatch({ type: CLOSE_CART_DRAWER })
  }
  const onRemoveProduct = async id => {
    const cart = await agent.Cart.removeItem(id)
    dispatch({ type: REMOVE_ITEM, cart })
  }
  const onQuantityChange = async (value, id) => {
    let cart
    if (value === 0) {
      cart = await agent.Cart.removeItem(id)
      dispatch({ type: REMOVE_ITEM, cart })
    } else {
      cart = await agent.Cart.updateItem(id, value)
      dispatch({ type: UPDATE_QUANTITY, cart })
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
      {items.length === 0 ? (
        <EmptyCartDrawer />
      ) : (
        <Space className="cart-content" direction="vertical">
          <List itemLayout="vertical">
            {items.map(item => {
              return (
                <List.Item key={item.slug} className="item">
                  <div className="row">
                    <span className="item-name">{item.name}</span>
                    <Button
                      type="primary"
                      shape="circle"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => onRemoveProduct(item.slug)}
                    />
                  </div>
                  <div className="row">
                    <div className="input-number">
                      <Button
                        className="input-number-control-btn minus-btn"
                        type="primary"
                        icon={<MinusOutlined />}
                        onClick={() => onQuantityChange(item.quantity - 1, item.slug)}
                      />
                      <InputNumber
                        min={0}
                        max={item.inStock}
                        value={item.quantity}
                        onChange={value => onQuantityChange(value, item.slug)}
                        style={{ width: 70 }}
                      />
                      <Button
                        className="input-number-control-btn plus-btn"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => onQuantityChange(item.quantity + 1, item.slug)}
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
                  <Text delete>{toLocaleStringCurrency(total, 'vn', 'VND')}</Text> <br />
                  <Text type="success">{toLocaleStringCurrency(discountTotal, 'vn', 'VND')}</Text>
                </div>
              ) : (
                <Text>{toLocaleStringCurrency(total, 'vn', 'VND')}</Text>
              )}
            </div>
            <Button style={{ width: '100%', marginTop: 8 }} size="large" type="primary">
              Proceed to checkout
            </Button>
          </div>
        </Space>
      )}
    </Drawer>
  )
}
