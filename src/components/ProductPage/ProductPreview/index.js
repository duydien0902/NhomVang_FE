import { Col, Row, Button } from 'antd'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import React from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Pagination } from 'antd'
import { store } from '../../../store'
import { SET_LIST_PRODUCTS } from '../../../constants/ActionType'
import { Link } from 'react-router-dom'
import './ProductPreview.css'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'
import { addCart } from '../../../utils'
import { useState } from 'react'
import { SETSTATE_BLOCK_LIST_PRODUCTS } from '../../../constants/ActionType'
function ProductPreview(props) {
  const data = props.productList
  const { isLoading } = useSelector(state => state.cart)
  const { setState } = useSelector(state => state.products)
  const [loadingItem, setLoadingItem] = useState(undefined)
  const title = setState?.tags
  const price = props.closeFilter
  const maxPrice = price?.maxPrice
  const minPrice = price?.minPrice
  const filter = setState?.open
  const changePage = async pageNumber => {
    const result = await props.pager(pageNumber - 1, props.filter)
    store.dispatch({
      type: SET_LIST_PRODUCTS,
      page: pageNumber - 1,
      payload: result
    })
  }
  const handleClickAddtocart = async itemId => {
    setLoadingItem(itemId)
    await addCart(itemId)
    setLoadingItem('')
  }
  const handleCloseTag = async () => {
    const key = 'close'
    const value = 'close'
    const minPrice = 'minPrice'
    const valueMinPrice = ''
    const maxPrice = 'maxPrice'
    const valueMaxPrice = ''
    const tags = 'tags'
    const valueTags = ''
    const name = 'name'
    const valueName = ''
    store.dispatch({
      type: SETSTATE_BLOCK_LIST_PRODUCTS,
      key,
      value,
      minPrice,
      valueMinPrice,
      maxPrice,
      valueMaxPrice,
      tags,
      valueTags,
      name,
      valueName
    })
  }
  return (
    <div style={{ width: '80%', margin: '60px auto' }} loading={{ indicator: <Spin size="large" /> }}>
      <h1 style={{ fontSize: '40px', paddingBottom: '0px' }}>PRODUCTS</h1>
      {title ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '30px'
          }}
        >
          <span style={{ fontSize: '18px' }}>Results for tag </span>
          <span
            style={{
              padding: '4px 10px 4px 10px',
              backgroundColor: ' greenyellow',
              borderRadius: '15px',
              fontSize: '13px',
              marginLeft: '5px'
            }}
          >
            # {title}
          </span>{' '}
          <span
            style={{
              cursor: 'pointer',
              color: 'red',
              fontSize: '23px',
              marginLeft: '15px',
              left: '210px',
              top: '-2px'
            }}
            onClick={handleCloseTag}
          >
            <CloseCircleOutlined />
          </span>
        </div>
      ) : null}

      {filter ? (
        <span>
          {maxPrice !== '' ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingBottom: '30px'
              }}
            >
              <span style={{ fontSize: '18px' }}>
                Filter results price from{' '}
                {minPrice === '' ? <span className="price">0$</span> : <span className="price">{minPrice}$</span>} to{' '}
                <span className="price">{maxPrice}$</span>{' '}
              </span>
              <span
                style={{
                  cursor: 'pointer',
                  color: 'red',
                  fontSize: '23px',
                  marginLeft: '15px',
                  left: '210px',
                  top: '-2px'
                }}
                onClick={handleCloseTag}
              >
                <CloseCircleOutlined />
              </span>
            </div>
          ) : null}
        </span>
      ) : null}

      {data ? (
        <Row gutter={[24, 24]}>
          {data.length !== 0 ? (
            data.map(item => (
              <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={item.slug}>
                <div
                  className="container-item-topproducts"
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                  }}
                >
                  <Link to={`/product/${item.slug}`}>
                    <div style={{ width: '100%' }}>
                      {
                        <img
                          style={{ width: '100%', height: '180px' }}
                          src={item.thumbnail || defaultNewsImage}
                          alt=""
                        />
                      }
                    </div>
                  </Link>
                  <div style={{ padding: '20px 15px 20px 20px' }}>
                    <Link to={`/product/${item.slug}`}>
                      <h3>{item.name}</h3>
                    </Link>
                    {item.discountPrice ? (
                      <p style={{ fontSize: '16px' }}>
                        Price:{' '}
                        <span style={{ textDecorationLine: 'line-through', fontSize: '16px' }}>
                          {' '}
                          {item.listedPrice} $
                        </span>
                        <span style={{ marginLeft: '10px', color: 'red', fontSize: '16px' }}>
                          {' '}
                          {item.discountPrice} $
                        </span>
                      </p>
                    ) : (
                      <p style={{ fontSize: '16px' }}>Price: {item.listedPrice} $</p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                      <Link to={`/product/${item.slug}`}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{
                            background: '#FFA500',
                            border: 'none'
                          }}
                        >
                          Detail
                        </Button>
                      </Link>
                      <Button
                        loading={isLoading && loadingItem === item._id}
                        onClick={() => handleClickAddtocart(item._id)}
                        type="primary"
                        htmlType="submit"
                        style={{
                          background: '#FFA500',
                          border: 'none'
                        }}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <div style={{ paddingTop: '20px', height: '40vh', marginLeft: '12px' }}>
              <h1>No data...</h1>
            </div>
          )}
        </Row>
      ) : (
        <Spin style={{ display: 'flex', justifyItems: 'center', paddingTop: '20px', height: '45vh' }} size="large" />
      )}

      <Pagination
        style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px', paddingTop: '70px' }}
        defaultCurrent={1}
        current={props.currentPage}
        pageSize={props.pageSize}
        total={props.total}
        onChange={changePage}
      />
    </div>
  )
}

export default ProductPreview
