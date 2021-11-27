import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Img from '../../../assets/imgbg.jpg'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
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
  return (
    <div className="container-TopSlider">
      <Slider {...settings}>
        <div className="container-bg">
          <img src={Img} alt="" />
        </div>
        <div className="container-bg">
          <img src={Img} alt="" />
        </div>
        <div className="container-bg">
          <img src={Img} alt="" />
        </div>
        <div className="container-bg">
          <img src={Img} alt="" />
        </div>
        <div className="container-bg">
          <img src={Img} alt="" />
        </div>
        <div className="container-bg">
          <img src={Img} alt="" />
        </div>
      </Slider>
    </div>
  )
}

export default TopSlider
