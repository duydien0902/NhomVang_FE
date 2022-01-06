import './TopProducts.css'
import { Button, Row, Col } from 'antd'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import 'antd/dist/antd.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCart } from '../../../utils'
function TopProducts() {
  const listProductHot = useSelector(state => state.products.listProductHot)
  return listProductHot ? (
    <div className="container">
      <h1>HOT PRODUCTS</h1>
      <Row gutter={[50, 50]}>
        {listProductHot.map(item => (
          <Col xs={24} sm={24} md={12} lg={8} xl={8} key={item.slug}>
            <div
              className="container-item-topproducts"
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                paddingBottom: '20px'
              }}
            >
              <div style={{ width: '100%' }}>
                {<img style={{ width: '100%', height: '180px' }} src={item.thumbnail || defaultNewsImage} alt="" />}
              </div>
              <div style={{ padding: '20px 15px 20px 20px' }}>
                <h3>{item.name}</h3>
                {item.discountPrice ? (
                  <p>
                    Giá:
                    <span style={{ textDecorationLine: 'line-through' }}> {item.listedPrice} $</span>
                    <span style={{ marginLeft: '10px', color: 'red' }}> {item.discountPrice} $</span>
                  </p>
                ) : (
                  <p>Giá: {item.listedPrice} $</p>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                  <Link to={`/products/${item.slug}`}>
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
                    Add to card
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
