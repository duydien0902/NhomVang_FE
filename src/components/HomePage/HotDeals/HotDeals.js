import React from 'react'
import Img from '../../../assets/imgbg.jpg'
import { Button, Row, Col } from 'antd'
import NewsSlider from '../NewsSlider/NewsSlider'
import Newletter from '../Newsletter/Newsletter'
import './HotDeals.css'

const data = [
  {
    img: 'Image 1',
    title: 'Title 1',
    description: 'sự mô tảsự mô tảôsự mô tảsự mô tảsự mô tảsự mô t tả tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô',
    cost: '5.000.0000',
    newPrice: '4.000.000'
  },
  {
    img: 'Image 2',
    title: 'Title 2',
    description: 'sự mổ tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảự mô tảsự mô tảsự môự mô tảsự mô tảsự mô',
    cost: '2.500.0000',
    newPrice: '2.000.000'
  },
  {
    img: 'Image 3',
    title: 'Title 3',
    description: 'sự mô tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảự mô tảsự mô tảsự mô tảs',
    cost: '3.000.0000',
    newPrice: '2.500.000'
  },
  {
    img: 'Image 4',
    title: 'Title 4',
    description:
      'sự mô tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảsự mô tảự mô tảsự mô tảsự mô tảs',
    cost: '3.000.0000',
    newPrice: '2.000.000'
  }
]
function HotDeals() {
  return (
    <div className="HotDeals-container">
      <div
        className="container-imgbg "
        style={{
          backgroundImage: `url(${Img})`,
          backgroundSize: 'cover'
        }}
      >
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="Container">
            <h1 style={{ color: 'white' }}>SẢN PHẨM ƯU ĐÃI</h1>
            <Row gutter={[50, 50]}>
              {data.length > 0
                ? data.map(item => (
                    <Col
                      // xs={24} sm={12}
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      xl={12}
                      key={item.title}
                    >
                      <div
                        style={{
                          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                          backgroundColor: 'white',
                          paddingBottom: '20px'
                        }}
                      >
                        <div className="img-item-hotdeals">
                          <img src={Img} alt="" />
                        </div>
                        <div className="container-item-hotdealsBottom">
                          <p
                            style={{
                              fontSize: '20px',
                              fontWeight: '700'
                            }}
                          >
                            {item.title}
                          </p>
                          <p>{item.description}</p>
                          <span style={{ textDecorationLine: 'line-through' }}>{item.cost}VNĐ</span>
                          <span style={{ marginLeft: '10px', color: 'red' }}>{item.newPrice}VNĐ</span>
                        </div>
                        <div className="button-buynow">
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              width: '150px',
                              background: '#FFA500',
                              border: 'none'
                            }}
                          >
                            Mua ngay
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ))
                : null}
            </Row>
          </div>

          <div>
            <NewsSlider />
            <Newletter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotDeals
