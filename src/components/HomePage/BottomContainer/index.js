import React from 'react'
import HotDeals from '../HotDeals'
import NewsSlider from '../NewsSlider'
import NewsLetter from '../NewsLetter'
import Img from '../../../assets/imgbg.jpg'
function BottomContainer() {
  return (
    <div>
      <div
        className="container-imgbg "
        style={{
          backgroundImage: `url(${Img})`,
          backgroundSize: 'cover',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <HotDeals />
          <div>
            <NewsSlider />
            <NewsLetter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomContainer
