import React from 'react'
import { Card, Col, Row, Button } from 'antd'
const { Meta } = Card

const data = [
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    title: 'Title 1',
    price: '1.000.0000'
  },
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    title: 'Title 2',
    price: '2.000.0000'
  },
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    title: 'Title 3',
    price: '2.000.0000'
  },
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    title: 'Title 4',

    price: '3.000.0000'
  },
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    title: 'Title 5',

    price: '4.000.0000'
  },
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    title: 'Title 6',
    price: '5.000.0000'
  }
]
function ProductPreview() {
  return (
    <div style={{ width: '80%', margin: '60px auto' }}>
      <h1>SẢN PHẨM</h1>
      <Row gutter={[24, 24]}>
        {data.map(item => (
          <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
            <div
              className="container-item-topproducts"
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                paddingBottom: '20px'
              }}
            >
              <div style={{ width: '100%' }}>
                <img style={{ width: '100%' }} src={item.img} alt="" />
              </div>
              <div style={{ padding: '20px 20px 20px 20px' }}>
                <Meta title={item.title} description={item.price} />
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      background: '#FFA500',
                      border: 'none'
                    }}
                  >
                    Add to card
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductPreview
