import React, { useEffect, useState } from 'react'
import './Footer.css'
import { Row, Col } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import logoPaypal from '../../../assets/logoPaypal.png'
import logoStripe from '../../../assets/stripe.png'

function Footer() {
  const [hightlightTab, setHightlightTab] = useState()
  const location = useLocation()
  const pathname = ['products', 'product', 'blogs', 'blog', '', 'aboutus', 'cart', 'profile']
  useEffect(() => {
    const path = location.pathname
    const splitPath = path.split('/')
    for (let i = 0; i < pathname.length; i++) {
      const result = splitPath[1] === pathname[i]
      if (result === true) {
        setHightlightTab(pathname[i])
        break
      } else {
        setHightlightTab(null)
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  return (
    <div className="container-Footer" style={{ background: '#a3a1a1' }}>
      <div className="container-Footer-Menu">
        <div className="Footer-Menu">
          <ul>
            <li className="cursor">
              <Link className={hightlightTab === '' ? 'colormenu-active' : 'link colormenu'} to="/">
                Home
              </Link>
            </li>

            <li className="cursor">
              <Link
                className={
                  hightlightTab === 'products' || hightlightTab === 'product' ? 'colormenu-active' : 'link colormenu'
                }
                to="/products"
              >
                Products
              </Link>
            </li>

            <li className="cursor">
              <Link
                className={
                  hightlightTab === 'blogs' || hightlightTab === 'blog' ? 'colormenu-active' : 'link colormenu'
                }
                to="/blogs"
              >
                News
              </Link>
            </li>

            <li className="cursor">
              <Link className={hightlightTab === 'aboutus' ? 'colormenu-active' : 'link colormenu'} to="/aboutus">
                About us
              </Link>
            </li>
          </ul>
        </div>
        <hr />
      </div>
      <div className="container-Footer-item">
        <Row gutter={[50, 50]}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <div className="Footer-item">
              <Link className="link" to="/">
                <h4>Voucher hunter</h4>
              </Link>
              <span>Phí Hoàng Long</span>
              <br />
              <span>Đào Duy Điền</span>
              <br />
              <span>(+84)0865 308 850</span>
              <br />
              <span>info@fildigicom.vn,</span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <div className="Footer-item">
              <h4>Các đối tác liên kết</h4>
              <span>Công ty cổ phần Fditour</span>
              <br />
              <span> BestPrice Travel</span>
              <br />
              <span> Công ty dịch vụ du lịch BenThanh </span>
              <br />
              <span> Công Ty Cổ Phần Dịch Vụ Du Lịch</span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <div className="Footer-item">
              <h4>Phương thức thanh toán</h4>
              <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ width: '100px', height: '50px' }}>
                  <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={logoPaypal} alt="" />
                </div>
                <div style={{ width: '100px', height: '50px' }}>
                  <img
                    style={{ width: '100%', height: '100%', objectFit: 'contain', marginLeft: '20px' }}
                    src={logoStripe}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Footer
