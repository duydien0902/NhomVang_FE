import { Col, Row, Button } from 'antd'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import { Pagination } from 'antd'
import { store } from '../../../store'
import { SET_LIST_PRODUCTS } from '../../../constants/ActionType'
import { Link } from 'react-router-dom'
import './ProductPreview.css'
import { Spin } from 'antd'

function ProductPreview(props) {
  const data = props.productList
  console.log('duydien', data)
  const changePage = async pageNumber => {
    const result = await props.pager(pageNumber - 1, props.filter)
    store.dispatch({
      type: SET_LIST_PRODUCTS,
      page: pageNumber - 1,
      payload: result
    })
  }
  return (
    <div style={{ width: '80%', margin: '60px auto' }} loading={{ indicator: <Spin size="large" /> }}>
      <h1>SẢN PHẨM</h1>
      <Row gutter={[24, 24]}>
        {data ? (
          data.map(item => (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={item.slug}>
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
                      <span style={{ textDecorationLine: 'line-through' }}> {item.listedPrice} VNĐ</span>
                      <span style={{ marginLeft: '10px', color: 'red' }}> {item.discountPrice} VNĐ</span>
                    </p>
                  ) : (
                    <p>Giá: {item.listedPrice} VNĐ</p>
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
          ))
        ) : (
          <Spin style={{ display: 'flex', justifyItems: 'center', paddingTop: '20px', height: '45vh' }} size="large" />
        )}
      </Row>

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
