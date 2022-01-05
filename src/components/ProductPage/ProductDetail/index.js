import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import agent from '../../../agent'
import { useSelector } from 'react-redux'
import { store } from '../../../store'
import { SELECTED_PRODUCT } from '../../../constants/ActionType'
import { decodeHTMLContent } from '../../../utils'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { SETSTATE_LIST_PRODUCTS, LIST_PRODUCTS_TAGS } from '../../../constants/ActionType'
// import img from '../../../assets/defaultNewsImage.png'
import './ProductDetail.css'
import { InputNumber, Button, Spin, message } from 'antd'
import ProductsTagsSlider from '../ProductsTagsSlider'
function ProductDetail() {
  const { slug } = useParams()
  const productdetail = useSelector(state => state.productdetail.productdetail)
  const { listproducts } = useSelector(state => state.products)
  const [quantity, setquantity] = useState(1)
  useEffect(() => {
    const fetchProductTas = async () => {
      try {
        const tags = await productdetail.tags.toString()
        const payload = await agent.Products.getAll(0, { tags })
        store.dispatch({ type: LIST_PRODUCTS_TAGS, payload })
      } catch (error) {
        console.log(error)
      }
    }
    fetchProductTas()
  }, [productdetail])

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
  const addCart = async values => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        await agent.Cart.addItem(values, quantity)
      } else {
        message.info('xin hãy đăng nhập')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const Tag = tag => {
    const value = tag
    let arrkey = ['tags', 'title']
    for (let i = 0; i < arrkey.length; i++) {
      const key = arrkey[i]
      store.dispatch({
        type: SETSTATE_LIST_PRODUCTS,
        key,
        value
      })
    }
  }
  const PlusOutlinedd = () => {
    if (quantity > productdetail.inStock) {
      setquantity(1)
    } else {
      setquantity(quantity + 1)
    }
  }
  console.log(quantity)
  const MinusOutlinedd = () => {
    if (quantity <= 1) {
      setquantity(1)
    } else {
      setquantity(quantity - 1)
    }
  }
  return (
    <div style={{ paddingTop: '80px' }}>
      {productdetail ? (
        <div className="ProductDetail-container">
          <div className="ProductDetail-wapper">
            <div className="ProductDetail-container-img">
              <img src={productdetail.thumbnail} alt="" />
            </div>
            <div className="ProductDetail-container-title">
              <h1>{productdetail.name}</h1>
              <div className="product-tags">
                <ul>
                  {productdetail.tags.map(item => (
                    <li key={item} onClick={() => Tag(item)}>
                      <Link to="/products/slug"># {item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              {productdetail.discountPrice ? (
                <p>
                  <span style={{ textDecorationLine: 'line-through' }}>{productdetail.listedPrice} $</span>
                  <span style={{ marginLeft: '10px', color: 'red' }}>{productdetail.discountPrice} $</span>
                </p>
              ) : (
                <p>Giá: {productdetail.listedPrice} $</p>
              )}
              <Button
                onClick={PlusOutlinedd}
                className="input-number-control-btn plus-btn"
                type="primary"
                icon={<PlusOutlined />}
              />
              <InputNumber
                style={{ width: '70px' }}
                min={1}
                max={productdetail.inStock}
                // defaultValue={1}
                value={quantity}
                onChange={onChange}
              />
              <Button
                onClick={MinusOutlinedd}
                className="input-number-control-btn minus-btn"
                type="primary"
                icon={<MinusOutlined />}
              />

              <Button style={{ marginLeft: '15px' }} type="primary" onClick={() => addCart(productdetail._id)}>
                Thêm Vào Giỏ
              </Button>
            </div>
          </div>
          <h3 style={{ paddingTop: '15px' }}>Mô tả</h3>
          <p dangerouslySetInnerHTML={{ __html: decodeHTMLContent(productdetail.description) }}></p>
        </div>
      ) : (
        <Spin
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}
          size="large"
        />
      )}
      <div>
        <ProductsTagsSlider listproducts={listproducts} />
      </div>
    </div>
  )
}

export default ProductDetail
