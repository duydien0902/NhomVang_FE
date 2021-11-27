import './TopProducts.css'
import { Button, Row, Col } from 'antd'
import Img from '../../../assets/imgbg.jpg'
import 'antd/dist/antd.css'

const data = [
  {
    img: 'Image 1',
    title: 'Title 1',
    description: 'sựmtả,ự mô ttả mô tả,ự mô tả, mô tả,ự mô tả,ự  mô tả,ự mô tả, mô tả,ự mô tả,ự ',
    price: '1.000.0000'
  },
  {
    img: 'Image 2',
    title: 'Title 2',
    description: ' mô tả,ự mô tả, mô tả,ự mô tả, mô tả,ự mô tả,ự  mô tả,ự mô tả, mô tả,ự mô tả,ự ',
    price: '2.000.0000'
  },
  {
    img: 'Image 3',
    title: 'Title 3',
    description: 'tả,ự mô tả,ự mô tả, mô tả,ự mô tả,ự mô tả,ự mô tả,ự  mô tả,ự mô tả,ự mô tả,ự mô tả,ự ',
    price: '2.000.0000'
  },
  {
    img: 'Image 4',
    title: 'Title 4',
    description: 'sự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,',
    price: '3.000.0000'
  },
  {
    img: 'Image 5',
    title: 'Title 5',
    description: 'sự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,',
    price: '4.000.0000'
  },
  {
    img: 'Image 6',
    title: 'Title 6',
    description: 'sự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,ự mô tả,',
    price: '5.000.0000'
  }
]

function TopProducts() {
  return (
    <div className="container">
      <h1>SẢN PHẨM NỔI BẬT</h1>
      <Row gutter={[50, 50]}>
        {data.map(item => (
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <div
              className="container-item-topproducts"
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                paddingBottom: '20px'
              }}
            >
              <div className="img-item-topproducts">
                <img src={Img} alt="" />
              </div>
              <div className="container-item-Topproducts-bottom">
                <p
                  style={{
                    fontSize: '20px',
                    fontWeight: '700'
                  }}
                >
                  {item.title}
                </p>
                <p>{item.description}</p>
              </div>
              <div className="button-buynow">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    background: '#FFA500',
                    border: 'none'
                  }}
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default TopProducts
