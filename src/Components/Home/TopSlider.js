import React from 'react'
import { Row, Col, Carousel } from 'antd'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'

const contentStyle = {
  marginTop: '80px',
  height: '70vh',
  color: 'white',
  lineHeight: '200px',
  textAlign: 'center',
  background: '#364d79',
  width: '100%'
}
const data = [
  {
    title: 'Image 1'
  },
  {
    title: 'Image 2'
  },
  {
    title: 'Image 3'
  },
  {
    title: 'Image 4'
  },
  {
    title: 'Image 5'
  }
]
const SampleNextArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        right: '30px',
        zIndex: '2',
        fontSize: '30px'
      }}
      onClick={onClick}
    >
      <h4
        style={{
          color: 'white'
        }}
      >
        <RightCircleOutlined />
      </h4>
    </div>
  )
}

const SamplePrevArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        left: '20px',
        zIndex: '2',
        fontSize: '30px'
      }}
      onClick={onClick}
    >
      <h4
        style={{
          color: 'white'
        }}
      >
        <LeftCircleOutlined />
      </h4>
    </div>
  )
}
const settings = {
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
}
function TopSlider() {
  return (
    <>
      <Row justify="center">
        <Col>
          <Carousel arrows {...settings} autoplay autoplaySpeed={5000}>
            {data.length > 0
              ? data.map(item => (
                  <div>
                    <h3 style={contentStyle}>{item.title}</h3>
                  </div>
                ))
              : null}
          </Carousel>
        </Col>
      </Row>
    </>
  )
}

export default TopSlider
