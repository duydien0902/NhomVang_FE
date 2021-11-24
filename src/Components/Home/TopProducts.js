import { Fragment, useState } from 'react'
import '../../Style/TopProducts.css'
import { List, Card, Button } from 'antd'
import Img from '../Imgbackgroud/imgbg.jpg'

const data = [
  {
    img: 'Image 1',
    title: 'Title 1',
    description: 'sự mô tả',
    price: '1.000.0000'
  },
  { img: 'Image 2', title: 'Title 2', description: 'sự mổ tả', price: '2.000.0000' },
  {
    img: 'Image 3',
    title: 'Title 3',
    description: 'sự mô tả',
    price: '2.000.0000'
  },
  {
    img: 'Image 4',
    title: 'Title 4',
    description: 'sự mô tả',
    price: '3.000.0000'
  },
  {
    img: 'Image 5',
    title: 'Title 5',
    description: 'sự mô tả',
    price: '4.000.0000'
  },
  {
    img: 'Image 6',
    title: 'Title 6',
    description: 'sự mô tả',
    price: '5.000.0000'
  }
]

function TopProducts() {
  return (
    <div className="container">
      <h1>SẢN PHẨM NỔI BẬT</h1>
      <List
        grid={{ gutter: [50, 30], column: 3 }}
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
              <span>{item.price}VNĐ</span>
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
  )
}

export default TopProducts
