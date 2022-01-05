import { Image, List, Typography } from 'antd'
import defaultProductImage from '../../../assets/defaultProductImage.jpg'
import { toLocaleStringCurrency } from '../../../utils'
import './CheckoutItems.css'

const { Title } = Typography

function renderPrice(price, quantity = 1) {
  return toLocaleStringCurrency(price * quantity)
}

export default function CheckoutItems({ items }) {
  return (
    <div className="checkout-items-container">
      <List className="checkout-list" itemLayout="vertical">
        <List.Item className="item item-header">
          <div className="item-thumbnail">
            <Title level={4}>Products</Title>
          </div>
          <div className="item-name"></div>
          <div className="item-price">
            <Title level={4}>Price</Title>
          </div>
          <div className="item-quantity">
            <Title level={4}>Quantity</Title>
          </div>
          <div className="item-subtotal">
            <Title level={4}>Subtotal</Title>
          </div>
        </List.Item>
        {items.map(item => {
          return (
            <List.Item key={item._id} className="item">
              <div className="item-thumbnail">
                <Image src={item.thumbnail} preview={false} fallback={defaultProductImage} />
              </div>
              <div className="item-name">{item.name}</div>
              <div className="item-price">{renderPrice(item.discountPrice || item.listedPrice)}</div>
              <div className="item-quantity">x {item.quantity}</div>
              <div className="item-subtotal">{renderPrice(item.discountPrice || item.listedPrice, item.quantity)}</div>
            </List.Item>
          )
        })}
      </List>
      <List className="checkout-list-mini" itemLayout="vertical">
        <List.Item className="item item-header">
          <Title level={4}>Products</Title>
        </List.Item>
        {items.map(item => {
          return (
            <List.Item key={item._id} className="item">
              <div className="item-thumbnail">
                <Image src={item.thumbnail} preview={false} fallback={defaultProductImage} />
              </div>
              <div className="item-info">
                <div className="item-name">
                  <span>{item.name}</span>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ flexGrow: 1 }}></div>
                  <div className="item-price">
                    <div>{renderPrice(item.discountPrice || item.listedPrice)}</div>
                    <div>x {item.quantity}</div>
                    <div>
                      <span>Subtotal:</span> {renderPrice(item.discountPrice || item.listedPrice, item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          )
        })}
      </List>
    </div>
  )
}
