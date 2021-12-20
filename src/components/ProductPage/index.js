import { InputNumber, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { store } from '../../store'
import { LIST_PRODUCTS, FILTER_PRODUCTLIST } from '../../constants/ActionType'
import { useSelector } from 'react-redux'
import agent from '../../agent'
import '../../pages/ProductPage/ProductPage.css'
import ProductPreview from './ProductPreview'
const { Search } = Input
function ProductPage() {
  const [filter, setFilter] = useState({
    name: '',
    supplier: '',
    minPrice: undefined,
    maxPrice: undefined,
    hot: false,
    inSlider: false
  })
  const { pager, page, total, listproducts } = useSelector(state => state.products)
  useEffect(() => {
    const Load = async () => {
      const pager = (page, filter) => agent.Products.getAll(page, filter)
      const result = await agent.Products.getAll()
      store.dispatch({
        type: LIST_PRODUCTS,
        pager,
        payload: result
      })
    }
    Load()
  }, [])
  const onFilter = async () => {
    const result = await pager(0, filter)
    store.dispatch({
      type: FILTER_PRODUCTLIST,
      payload: result
    })
  }

  const ChangeName = e => setFilter({ ...filter, name: e.target.value })
  const changeMinPrice = value => setFilter({ ...filter, minPrice: value })
  const changeMaxPrice = value => setFilter({ ...filter, maxPrice: value })
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
                    addonAfter="VND"
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
                    addonAfter="VND"
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
            pageSize={agent.pageSize}
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
