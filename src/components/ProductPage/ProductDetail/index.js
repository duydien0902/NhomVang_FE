import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import agent from '../../../agent'
import { useSelector } from 'react-redux'
import { store } from '../../../store'
import { SELECTED_PRODUCT } from '../../../constants/ActionType'
import { decodeHTMLContent } from '../../../utils'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
// import img from '../../../assets/defaultNewsImage.png'
import './ProductDetail.css'
import { InputNumber, Button, Spin } from 'antd'
function ProductDetail() {
  const { slug } = useParams()
  const productdetail = useSelector(state => state.productdetail.productdetail)
  console.log(productdetail)
  useEffect(() => {
    const fetchdata = async () => {
      const payload = await agent.Products.getBySlug(slug)
      store.dispatch({ type: SELECTED_PRODUCT, payload })
    }
    fetchdata()
  }, [slug])
  function onChange(value) {
    console.log('changed', value)
  }
  return productdetail ? (
    <div style={{ paddingTop: '80px' }}>
      <div className="ProductDetail-container">
        <div className="ProductDetail-wapper">
          <div className="ProductDetail-container-img">
            <img src={productdetail.thumbnail} alt="" />
          </div>
          <div className="ProductDetail-container-title">
            <h1>{productdetail.name}</h1>

            {productdetail.discountPrice ? (
              <p>
                <span style={{ textDecorationLine: 'line-through' }}>{productdetail.listedPrice} VNĐ</span>
                <span style={{ marginLeft: '10px', color: 'red' }}>{productdetail.discountPrice} VNĐ</span>
              </p>
            ) : (
              <p>Giá: {productdetail.listedPrice} VNĐ</p>
            )}
            {/* <div> */}
            <Button className="input-number-control-btn plus-btn" type="primary" icon={<PlusOutlined />} />
            <InputNumber style={{ width: '70px' }} value={0} min={1} max={10} defaultValue={1} onChange={onChange} />
            <Button className="input-number-control-btn minus-btn" type="primary" icon={<MinusOutlined />} />

            <Button style={{ marginLeft: '15px' }} type="primary">
              Thêm Vào Giỏ
            </Button>
            {/* </div> */}
          </div>
        </div>
        <h3 style={{ paddingTop: '15px' }}>Mô tả</h3>
        <p dangerouslySetInnerHTML={{ __html: decodeHTMLContent(productdetail.description) }}></p>
      </div>
    </div>
  ) : (
    <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }} size="large" />
  )
}

export default ProductDetail
