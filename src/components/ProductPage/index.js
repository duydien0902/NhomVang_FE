import { InputNumber, Input } from 'antd'
import React, { useEffect } from 'react'
import { store } from '../../store'
import {
  LIST_PRODUCTS,
  FILTER_PRODUCTLIST,
  SETSTATE_LIST_PRODUCTS,
  PRODUCT_PAGE_UNLOADED
} from '../../constants/ActionType'
import { useSelector } from 'react-redux'
import agent from '../../agent'
import '../../pages/ProductPage/ProductPage.css'
import ProductPreview from './ProductPreview'
const { Search } = Input
function ProductPage() {
  const onUnload = () => {
    store.dispatch({ type: PRODUCT_PAGE_UNLOADED })
  }

  const { pager, page, total, listproducts, setState, reload } = useSelector(state => state.products)
  const onLoad = async () => {
    const pager = (page, filter) => agent.Products.getAll(page, filter)
    const result = await agent.Products.getAll(0, setState)
    store.dispatch({
      type: LIST_PRODUCTS,
      pager,
      payload: result
    })
  }
  useEffect(() => {
    onLoad()
    return () => {
      onUnload()
    }
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (reload) {
      onLoad()
    }
    // eslint-disable-next-line
  }, [reload])
  const onFilter = async () => {
    const result = await pager(0, setState)
    store.dispatch({
      type: FILTER_PRODUCTLIST,
      payload: result
    })
  }
  const ChangeName = e => {
    const key = 'name'
    const value = e.target.value
    store.dispatch({
      type: SETSTATE_LIST_PRODUCTS,
      key,
      value
    })
  }
  const changeMinPrice = value => {
    console.log({ value })
    const key = 'minPrice'
    store.dispatch({
      type: SETSTATE_LIST_PRODUCTS,
      key,
      value
    })
  }
  const changeMaxPrice = value => {
    const key = 'maxPrice'
    store.dispatch({
      type: SETSTATE_LIST_PRODUCTS,
      key,
      value
    })
  }
  return (
    <div style={{ paddingTop: '80px' }}>
      <div className="ProductPage-container">
        <div className="left-container" style={{ border: '1px solid #DCDCDC' }}>
          <div>
            <div>
              <h3 style={{ fontSize: '20px', paddingLeft: '30px', paddingTop: '20px' }}>Giá</h3>
              <div
                style={{
                  width: '250px',
                  margin: '0 auto',
                  lineHeight: '3'
                }}
              >
                <div style={{ width: '250px', textAlign: 'left' }}>
                  <InputNumber
                    min={0}
                    step={1000}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={changeMinPrice}
                    onPressEnter={onFilter}
                    placeholder="Tối thiểu"
                    addonAfter="$"
                  />
                </div>
                <div style={{ width: '250px' }}>
                  <InputNumber
                    min={0}
                    step={1000}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={changeMaxPrice}
                    onPressEnter={onFilter}
                    placeholder="Tối đa"
                    addonAfter="$"
                  />
                </div>
              </div>
              <div style={{ width: '250px', margin: '20px auto' }}>
                <Search placeholder="Tìm kiếm sản phẩm..." onSearch={onFilter} onChange={ChangeName} enterButton />
              </div>
            </div>
          </div>
        </div>
        <div className="right-container">
          <ProductPreview
            productList={listproducts}
            pageSize={agent.pageSizeProducts}
            total={total}
            currentPage={page + 1}
            pager={pager}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductPage
