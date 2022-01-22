import './TopProducts.css'
import { Button, Row, Col } from 'antd'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import 'antd/dist/antd.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCart } from '../../../utils'
import { useState } from 'react'
function TopProducts() {
  const listProductHot = useSelector(state => state.products.listProductHot)

  const { isLoading } = useSelector(state => state.cart)
  const [loadingItem, setLoadingItem] = useState('')
  const handleClickAddtocart = async itemId => {
    setLoadingItem(itemId)
    await addCart(itemId)
    setLoadingItem('')
  }
  return listProductHot ? (
    <div className="topproduct-container">
      <h1>HOT PRODUCTS</h1>
      <Row gutter={[35, 35]}>
        {listProductHot.slice(0, 6).map(item => (
          <Col xs={24} sm={24} md={12} lg={8} xl={8} key={item.slug}>
            <div
              className="container-item-topproducts"
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
              }}
            >
              <Link to={`/product/${item.slug}`}>
                <div style={{ width: '100%' }}>
                  {<img style={{ width: '100%', height: '220px' }} src={item.thumbnail || defaultNewsImage} alt="" />}
                </div>
              </Link>
              <div style={{ padding: '20px 15px 20px 20px' }}>
                <Link to={`/product/${item.slug}`}>
                  <h3 style={{ fontWeight: '700' }}>{item.name}</h3>
                </Link>
                {item.discountPrice ? (
                  <p style={{ fontSize: '16px' }}>
                    Price:{' '}
                    <span style={{ textDecorationLine: 'line-through', fontSize: '16px' }}> {item.listedPrice} $</span>
                    <span style={{ marginLeft: '10px', color: 'red', fontSize: '16px' }}> {item.discountPrice} $</span>
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
        ))}
      </Row>
    </div>
  ) : null
}

export default TopProducts
