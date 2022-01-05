import React from 'react'
import NewsBar from '../NewsBar'
import Img from '../../../assets/imgbg.jpg'
function BottomContainer() {
  return (
    <div>
      <div
        className="container-imgbg "
        style={{
          backgroundImage: `url(${Img})`,
          backgroundSize: 'cover'
        }}
      >
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div style={{ paddingTop: '100px' }}>
            <NewsBar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomContainer
