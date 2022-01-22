import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import agent from '../../../agent'
import { useSelector } from 'react-redux'
import { store } from '../../../store'
import { SELECTED_PRODUCT, CART_LOADING, CART_LOADED } from '../../../constants/ActionType'
import { decodeHTMLContent } from '../../../utils'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { SETSTATE_LIST_PRODUCTS, LIST_PRODUCTS_TAGS } from '../../../constants/ActionType'
import './ProductDetail.css'
import { InputNumber, Button, Spin, message } from 'antd'
import ProductsTagsSlider from '../ProductsTagsSlider'
function ProductDetail() {
  const { slug } = useParams()
  const productdetail = useSelector(state => state.productdetail.productdetail)
  const { listproducts } = useSelector(state => state.products)
  const { isLoading } = useSelector(state => state.cart)
  const [loadingItem, setLoadingItem] = useState('')
  const [quantity, setquantity] = useState(1)
  useEffect(() => {
    const fetchProductTags = async () => {
      try {
        const tags = await productdetail.tags.toString()
        const payload = await agent.Products.getAll(0, { tags })
        payload.data.productList = payload.data.productList.filter(product => product.slug !== slug)
        store.dispatch({ type: LIST_PRODUCTS_TAGS, payload })
      } catch (error) {
        console.log(error)
      }
    }
    fetchProductTags()
  }, [productdetail, slug])

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
        setLoadingItem(values)
        await agent.Cart.addItem(values, quantity)
        store.dispatch({ type: CART_LOADING })
        const result = await agent.Cart.current()
        let cart = result.data.cart
        store.dispatch({ type: CART_LOADED, cart })
        setLoadingItem('')
      } else {
        message.warning('Please login')
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
                      <Link style={{ color: 'black' }} to="/products/slug">
                        # {item}
                      </Link>
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
                <p>Price: {productdetail.listedPrice} $</p>
              )}
              <Button
                onClick={PlusOutlinedd}
                className="input-number-control-btn plus-btn"
                type="primary"
                icon={<PlusOutlined />}
              />
              <InputNumber
                min={1}
                style={{ width: 70, paddingLeft: '18px' }}
                controls={false}
                max={productdetail.inStock}
                value={quantity}
                onChange={onChange}
              />
              <Button
                onClick={MinusOutlinedd}
                className="input-number-control-btn minus-btn"
                type="primary"
                icon={<MinusOutlined />}
              />
              <Button
                loading={isLoading && loadingItem === productdetail._id}
                style={{ marginLeft: '15px' }}
                type="primary"
                onClick={() => addCart(productdetail._id)}
              >
                Add To Cart
              </Button>
            </div>
          </div>
          <h3 style={{ paddingTop: '15px' }}>Description</h3>
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
