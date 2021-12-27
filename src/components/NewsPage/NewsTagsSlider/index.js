import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Spin } from 'antd'
import './NewsTagsSlider.css'
import { Link } from 'react-router-dom'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
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

function NewsTagsSlider(props) {
  const listnewstags = props.listnewstags
  const settings = {
    dots: true,
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 1,
    slidesToScroll: 1,
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

  return (
    <div className="container-NewsSlider">
      <div className="wrapper-NewsSlider">
        <h1>TIN TỨC LIÊN QUAN </h1>
        <Slider {...settings}>
          {listnewstags ? (
            listnewstags.map(item => (
              <div key={item.slug} className="container-Img-NewsSlider">
                <Link to={`/blog/${item.slug}`}>
                  <div className="card-wapper">
                    <div className="card">
                      <div className="card-image">
                        <img src={item.thumbnail || defaultNewsImage} alt="" />
                      </div>
                      <div className="details">
                        <h3> {item.title}</h3>
                        <p className="job-title">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <Spin />
          )}
        </Slider>
      </div>
    </div>
  )
}

export default NewsTagsSlider
