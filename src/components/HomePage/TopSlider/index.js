import React from 'react'
import Slider from 'react-slick'
import { Spin } from 'antd'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import Img from '../../../assets/imgbg.jpg'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './TopSlider.css'
function SampleNextArrow(props) {
  const { onClick } = props
  return (
    <div className="nextArrow" onClick={onClick}>
      <RightCircleOutlined />
    </div>
  )
}

function SamplePrevArrow(props) {
  const { onClick } = props
  return (
    <div className="prevArrow" onClick={onClick}>
      <LeftCircleOutlined />
    </div>
  )
}
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 3000,
  cssEase: 'linear',
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
}

function TopSlider() {
  const listProductSlider = useSelector(state => state.products.listProductsTopSlider)

  return (
    <div className="container-TopSlider">
      {listProductSlider ? (
        <Slider {...settings}>
          {listProductSlider.map(item => (
            <Link to={`/products/${item.slug}`}>
              <div className="container-bg" key={item.slug}>
                <img src={item.thumbnail} alt="" />
              </div>
            </Link>
          ))}
        </Slider>
      ) : (
        <Spin
          style={{ display: 'flex', justifyContent: 'center', height: '70vh', alignItems: 'center' }}
          size="large"
        />
      )}
    </div>
  )
}

export default TopSlider
