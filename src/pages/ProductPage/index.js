import React from 'react'
import './ProductPage.css'

import ProductPricefilterSearch from '../../components/ProductPage/LeftContainer'
import ProductPreview from '../../components/ProductPage/ProductPreview'
import ListPagination from '../../components/ProductPage/ListPagination'

function ProductPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <div className="ProductPage-container">
        <div className="left-container" style={{ border: '1px solid #DCDCDC' }}>
          <ProductPricefilterSearch />
        </div>
        <div className="right-container">
          <ProductPreview />
          <ListPagination />
        </div>
      </div>
    </div>
  )
}
export default ProductPage
