import TopSlider from '../../components/HomePage/TopSlider'
import TopProducts from '../../components/HomePage/TopProducts'
import React from 'react'
import BottomContainer from '../../components/HomePage/BottomContainer/index'
import { useEffect } from 'react'
import agent from '../../agent'
import { store } from '../../store'
import { LIST_PRODUCTS_TOPSLIDER, LIST_PRODUCTS_HOT } from '../../constants/ActionType'
function HomePage() {
  useEffect(() => {
    const fetchTopSlider = async () => {
      const payload = await agent.Products.getAll(0, { inSlider: true })
      store.dispatch({ type: LIST_PRODUCTS_TOPSLIDER, payload })
    }
    fetchTopSlider()
  }, [])
  useEffect(() => {
    const fetchHotproduct = async () => {
      const payload = await agent.Products.getAll(0, { hot: true })
      store.dispatch({ type: LIST_PRODUCTS_HOT, payload })
    }
    fetchHotproduct()
  }, [])
  return (
    <>
      <TopSlider />
      <TopProducts />
      <BottomContainer />
    </>
  )
}

export default HomePage
