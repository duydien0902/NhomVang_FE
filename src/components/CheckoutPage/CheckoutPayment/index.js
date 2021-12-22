import { Button, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { CHANGE_PAYMENT_METHOD } from '../../../constants/ActionType'
import { toLocaleStringCurrency } from '../../../utils'
import './CheckoutPayment.css'

const { Title } = Typography

const methods = {
  paypal: {
    title: 'PayPal'
  },
  stripe: {
    title: 'Stripe'
  }
}

function renderPrice(price, quantity = 1) {
  return toLocaleStringCurrency(price * quantity)
}

export default function CheckoutPayment({ paymentMethod, total, discountTotal }) {
  const dispatch = useDispatch()
  const onPaymentBtnClick = method => {
    dispatch({
      type: CHANGE_PAYMENT_METHOD,
      method
    })
  }

  const onOrderBtnClick = () => {
    console.log('Order')
  }

  return (
    <div className="checkout-payment-container">
      <Title level={4}>Payment methods</Title>
      <div className="payment-btns">
        {Object.keys(methods).map(key => (
          <Button
            className={`payment-btn ${paymentMethod === key ? 'active' : ''}`}
            key={key}
            onClick={() => onPaymentBtnClick(key)}
          >
            {methods[key].title}
          </Button>
        ))}
      </div>
      <div className="payment-total">
        <div className="payment-total-price">
          <span>Total:</span>
          <span className="price">{renderPrice(discountTotal || total)}</span>
        </div>
        <Button type="primary" size="large" className="order-btn" onClick={onOrderBtnClick}>
          Order
        </Button>
      </div>
    </div>
  )
}
