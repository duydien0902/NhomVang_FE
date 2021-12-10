import React, { useEffect } from 'react'
import './NewsSlider.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import agent from '../../../agent'
import { store } from '../../../store'
import { LIST_NEWS } from '../../../constants/ActionType'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
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
  const newsList = useSelector(state => state.news.listnews)
  useEffect(() => {
    async function fetchNewsList() {
      const result = await agent.News.getAll(5)
      const payload = result.data.newsList
      store.dispatch({ type: LIST_NEWS, payload })
    }
    fetchNewsList()
  }, [])
  return (
    <div className="container-NewsSlider">
      <div className="wrapper-NewsSlider">
        <h1>TIN TỨC </h1>
        <Slider {...settings}>
          {newsList ? (
            newsList.map(item => (
              <div key={item.slug} className="container-Img-NewsSlider">
                <Link to={`/blog/${item.slug}`}>
                  <div className="card-wapper">
                    <div className="card">
                      <div className="card-image">
                        <img src={item.thumbnail} alt="" />
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

export default NewsSlider
