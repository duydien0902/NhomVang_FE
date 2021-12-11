import { Button, Drawer, InputNumber, List, Space, Typography } from 'antd'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CLOSE_CART_DRAWER, REMOVE_ITEM, UPDATE_QUANTITY } from '../../constants/ActionType'
import './CartDrawer.css'
import { toLocaleStringCurrency } from '../../utils'

const { Text } = Typography

function EmptyCartDrawer() {
  return
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
  const { cartVisible, itemList, listedSubtotal, discountSubtotal, vat, total } = useSelector(state => state.cart)

  const onCartDrawerClose = () => {
    dispatch({ type: CLOSE_CART_DRAWER })
  }
  const onRemoveProduct = slug => {
    dispatch({ type: REMOVE_ITEM, slug })
  }
  const onQuantityChange = (value, slug) => {
    dispatch(value === 0 ? { type: REMOVE_ITEM, slug } : { type: UPDATE_QUANTITY, slug, value })
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
      {itemList.length === 0 ? (
        <EmptyCartDrawer />
      ) : (
        <Space className="cart-content" direction="vertical">
          <List itemLayout="vertical">
            {itemList.map(item => {
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
              <span className="title">Subtotal</span>
              {discountSubtotal ? (
                <div>
                  <Text delete>{toLocaleStringCurrency(listedSubtotal, 'vn', 'VND')}</Text> <br />
                  <Text type="success">{toLocaleStringCurrency(discountSubtotal, 'vn', 'VND')}</Text>
                </div>
              ) : (
                <Text>{toLocaleStringCurrency(listedSubtotal, 'vn', 'VND')}</Text>
              )}
            </div>
            <div className="row">
              <span className="title">VAT</span>
              {vat ? (
                <Space size="small" direction="vertical" style={{ alignItems: 'end' }}>
                  <Text>{vat * 100}%</Text>
                  <Text>{toLocaleStringCurrency((discountSubtotal || listedSubtotal) * vat, 'vn', 'VND')}</Text>
                </Space>
              ) : (
                <Text>{0}%</Text>
              )}
            </div>
            <div className="row">
              <span className="title">Total</span>
              <Text>{toLocaleStringCurrency(total, 'vn', 'VND')}</Text>
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
