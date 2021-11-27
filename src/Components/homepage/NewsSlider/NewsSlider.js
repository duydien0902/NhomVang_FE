// import React from 'react'
import './NewsSlider.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Img from '../../assets/Imgbackgroud/imgbg.jpg'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
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
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '60px',
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: 'linear',
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 10,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}
function NewsSlider() {
  return (
    <div className="container-NewsSlider">
      <div className="wrapper-NewsSlider">
        <h1>TIN TỨC </h1>
        <Slider {...settings}>
          <div className="container-Img-NewsSlider">
            <img src={Img} alt="" />
          </div>
          <div className="container-Img-NewsSlider">
            <img src={Img} alt="" />
          </div>
          <div className="container-Img-NewsSlider">
            <img src={Img} alt="" />
          </div>
          <div className="container-Img-NewsSlider">
            <img src={Img} alt="" />
          </div>
          <div className="container-Img-NewsSlider">
            <img src={Img} alt="" />
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default NewsSlider
