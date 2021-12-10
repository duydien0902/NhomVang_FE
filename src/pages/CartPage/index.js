import { Space } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CartEmpty from '../../components/CartPage/CartEmpty'
import CartTable from '../../components/CartPage/CartTable'
import CartTotal from '../../components/CartPage/CartTotal'
import { CART_PAGE_LOADED, CART_PAGE_UNLOADED } from '../../constants/ActionType'
import { store } from '../../store'
import './CartPage.css'

export default function CartPage() {
  const { itemList } = useSelector(state => state.cart)

  const onLoad = () => {
    store.dispatch({ type: CART_PAGE_LOADED })
  }
  const onUnload = () => {
    store.dispatch({ type: CART_PAGE_UNLOADED })
  }

  useEffect(() => {
    onLoad()
    return () => {
      onUnload()
    }
  }, [])

  return (
    <Space className="cart-page" direction="vertical">
      {itemList.length > 0 ? (
        <>
          <CartTable cart={itemList} />
          <CartTotal />
        </>
      ) : (
        <CartEmpty />
      )}
    </Space>
  )
}
