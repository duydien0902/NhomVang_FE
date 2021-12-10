import React from 'react'
import './Footer.css'
import { Row, Col } from 'antd'

function Footer() {
  return (
    <div className="container-Footer" style={{ background: '#21BF73' }}>
      <div className="container-Footer-Menu">
        <div className="Footer-Menu">
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>News</li>
            <li>About us</li>
          </ul>
        </div>
        <hr />
      </div>
      <div className="container-Footer-item">
        <Row gutter={[50, 50]}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <div className="Footer-item">
              <h4>LOGO</h4>
              <span>Tang 28,toà nhà Bamboo Airways, số 265 Đường Cầu Giấy Dịch Vọng, Cầu Giấy, Hà Nội</span>
              <br />
              <span>(+84)0865 308 850</span>
              <br />
              <span>info@fildigicom.vn</span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <div className="Footer-item">
              <h4>Các đối tác liên kết</h4>
              <span>Tang 28,toà nhà Bamboo Airways, số 265 Đường Cầu Giấy Dịch Vọng, Cầu Giấy, Hà Nội</span>
              <br />
              <span>(+84)0865 308 850</span>
              <br />
              <span>info@fildigicom.vn</span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <div className="Footer-item">
              <h4>Phương thức thanh toán</h4>
              <span>Tang 28,toà nhà Bamboo Airways, số 265 Đường Cầu Giấy Dịch Vọng, Cầu Giấy, Hà Nội</span>
              <br />
              <span>(+84)0865 308 850</span>
              <br />
              <span>info@fildigicom.vn</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Footer
