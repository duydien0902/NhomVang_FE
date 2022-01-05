import { InputNumber, Input } from 'antd'
import React from 'react'
const { Search } = Input

function ProductPricefilterSearch() {
  const onSearch = value => console.log(value)
  return (
    <div>
      <div>
        <h3 style={{ fontSize: '20px', paddingLeft: '30px', paddingTop: '20px' }}>Giá</h3>
        <div
          style={{
            width: '250px',
            display: 'flex',
            flexDirection: 'row',
            margin: '0 auto',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ width: '120px', textAlign: 'left' }}>
            <InputNumber min={0} step={5} placeholder="max" addonAfter="$" />
          </div>
          <div style={{ width: '120px', marginLeft: '30px' }}>
            <InputNumber min={0} step={5} placeholder="min" addonAfter="$" />
          </div>
        </div>
        <div style={{ width: '250px', margin: '20px auto' }}>
          <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </div>
      </div>
    </div>
  )
}

export default ProductPricefilterSearch
