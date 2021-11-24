import React from 'react'
import Img from '../Imgbackgroud/imgbg.jpg'
import { List, Card, Button } from 'antd'
import NewsSlider from '../Home/NewsSlider'
import '../../Style/HotDeals.css'
const data = [
  {
    img: 'Image 1',
    title: 'Title 1',
    description: 'sự mô tả',
    cost: '5.000.0000',
    newPrice: '4.000.000'
  },
  { img: 'Image 2', title: 'Title 2', description: 'sự mổ tả', cost: '2.500.0000', newPrice: '2.000.000' },
  {
    img: 'Image 3',
    title: 'Title 3',
    description: 'sự mô tả',
    cost: '3.000.0000',
    newPrice: '2.500.000'
  },
  {
    img: 'Image 4',
    title: 'Title 4',
    description: 'sự mô tả',
    cost: '3.000.0000',
    newPrice: '2.000.000'
  }
]
function HotDeals() {
  return (
    <div className="HotDeals-container">
      <div className="container-imgbg">
        <img src={Img} />

        <div className="absolute">
          <div className="Container">
            <h1 style={{ color: 'white' }}>SẢN PHẨM ƯU ĐÃI</h1>
            <List
              grid={{ gutter: [50, 30], column: 2 }}
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Card
                    title={item.img}
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                      rowGap: '50'
                    }}
                  >
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    <span style={{ textDecorationLine: 'line-through' }}>{item.cost}VNĐ</span>
                    <span style={{ marginLeft: '10px', color: 'red' }}>{item.newPrice}VNĐ</span>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: '80px',
                        background: '#FFA500',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        float: 'right'
                      }}
                    >
                      Mua ngay
                    </Button>
                  </Card>
                </List.Item>
              )}
            ></List>
          </div>
          <div>
            <NewsSlider />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotDeals
