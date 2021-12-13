import { Button, Space, Spin } from 'antd'
import { useSelector } from 'react-redux'
import CartEmpty from '../../components/CartPage/CartEmpty'
import CartTable from '../../components/CartPage/CartTable'
import CartTotal from '../../components/CartPage/CartTotal'
import './CartPage.css'

export default function CartPage() {
  const { isLoading, items } = useSelector(state => state.cart)

  return (
    <Space className="cart-page" direction="vertical">
      <Spin size="large" spinning={isLoading && !items.length}>
        {items.length > 0 ? (
          <>
            <CartTable />
            <div className="cart-page-bottom">
              <Button className="continue-btn" type="primary" size="large">
                Continue shopping
              </Button>
              <CartTotal />
            </div>
          </>
        ) : (
          <CartEmpty />
        )}
      </Spin>
    </Space>
  )
}
