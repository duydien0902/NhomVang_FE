import React from 'react'
import { Spin, Row, Button, Col } from 'antd'
import '../../NewsPage/NewsTagsSlider/NewsTagsSlider.css'
import { Link } from 'react-router-dom'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import { addCart } from '../../../utils'

function ProductsTagsSlider(props) {
  const listproductstags = props.listproducts

  return (
    <div className="container-NewsSlider" x>
      <div className="wrapper-NewsSlider" style={{ width: '90%', margin: '0 auto', paddingBottom: '60px' }}>
        <h1>RELATED PRODUCTS </h1>
        <div style={{ width: '100%' }}>
          <Row gutter={[24, 24]}>
            {listproductstags ? (
              listproductstags.map(item => (
                <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={item.slug}>
                  <div
                    className="container-item-topproducts"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                      paddingBottom: '20px'
                    }}
                  >
                    <div style={{ width: '100%' }}>
                      {
                        <img
                          style={{ width: '100%', height: '180px' }}
                          src={item.thumbnail || defaultNewsImage}
                          alt=""
                        />
                      }
                    </div>
                    <div style={{ padding: '20px 15px 20px 20px' }}>
                      <h3>{item.name}</h3>
                      {item.discountPrice ? (
                        <p>
                          Price:
                          <span style={{ textDecorationLine: 'line-through' }}> {item.listedPrice} $</span>
                          <span style={{ marginLeft: '10px', color: 'red' }}> {item.discountPrice} $</span>
                        </p>
                      ) : (
                        <p>Price: {item.listedPrice} $</p>
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
                          onClick={() => addCart(item._id)}
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
              <Spin style={{ margin: '0 auto', paddingBottom: '30px' }} size="large" />
            )}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default ProductsTagsSlider
