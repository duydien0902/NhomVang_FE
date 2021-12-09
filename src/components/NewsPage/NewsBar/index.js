import React from 'react'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import './NewsBar.css'

function NewsBar() {
  return (
    <div style={{ width: '90%', margin: '0 auto', paddingBottom: '80px' }}>
      <div className="NewsBar">
        <div className="container-NewsBar">
          <div className="container-NewsBar-img">
            <img src={defaultNewsImage} alt="news" />
          </div>
          <div>
            <span>
              Có nên mua đồng hồ theo dõi sức khỏe không? Những lý do sau đây sẽ khiến bạn phải chốt ngay một 'em' đồng
              hồ đấy! 5 ngày trước
            </span>
          </div>
        </div>
        <div className="container-NewsBar">
          <div className="container-NewsBar-img">
            <img src={defaultNewsImage} alt="news" />
          </div>
          <div>
            <span>
              Có nên mua đồng hồ theo dõi sức khỏe không? Những lý do sau đây sẽ khiến bạn phải chốt ngay một 'em' đồng
              hồ đấy! 5 ngày trước
            </span>
          </div>
        </div>
        <div className="container-NewsBar">
          <div className="container-NewsBar-img">
            <img src={defaultNewsImage} alt="news" />
          </div>
          <div>
            <span>
              Có nên mua đồng hồ theo dõi sức khỏe không? Những lý do sau đây sẽ khiến bạn phải chốt ngay một 'em' đồng
              hồ đấy! 5 ngày trước
            </span>
          </div>
        </div>
        <div className="container-NewsBar">
          <div className="container-NewsBar-img">
            <img src={defaultNewsImage} alt="news" />
          </div>
          <div>
            <span>
              Có nên mua đồng hồ theo dõi sức khỏe không? Những lý do sau đây sẽ khiến bạn phải chốt ngay một 'em' đồng
              hồ đấy! 5 ngày trước
            </span>
          </div>
        </div>
        <div className="container-NewsBar">
          <div className="container-NewsBar-img">
            <img src={defaultNewsImage} alt="news" />
          </div>
          <div>
            <span>
              Có nên mua đồng hồ theo dõi sức khỏe không? Những lý do sau đây sẽ khiến bạn phải chốt ngay một 'em' đồng
              hồ đấy! 5 ngày trước
            </span>
          </div>
        </div>
      </div>
      <span style={{ float: 'right', fontSize: '20px', fontWeight: '700', cursor: 'pointer' }}>Xem thêm...</span>
    </div>
  )
}

export default NewsBar
