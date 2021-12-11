import { Button, Space } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartEmpty from '../../components/CartPage/CartEmpty'
import CartTable from '../../components/CartPage/CartTable'
import CartTotal from '../../components/CartPage/CartTotal'
import { CART_PAGE_LOADED, CART_PAGE_UNLOADED } from '../../constants/ActionType'
import './CartPage.css'

export default function CartPage() {
  const dispatch = useDispatch()
  const { itemList, vat, listedSubtotal, discountSubtotal, total } = useSelector(state => state.cart)

  const onLoad = () => {
    dispatch({ type: CART_PAGE_LOADED })
  }
  const onUnload = () => {
    dispatch({ type: CART_PAGE_UNLOADED })
  }

  useEffect(() => {
    onLoad()
    return () => {
      onUnload()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Space className="cart-page" direction="vertical">
      {itemList.length > 0 ? (
        <>
          <CartTable cart={itemList} />
          <div className="cart-page-bottom">
            <Button className="continue-btn" type="primary" size="large">
              Continue shopping
            </Button>
            <CartTotal vat={vat} listedSubtotal={listedSubtotal} discountSubtotal={discountSubtotal} total={total} />
          </div>
        </>
      ) : (
        <CartEmpty />
      )}
    </Space>
  )
}
